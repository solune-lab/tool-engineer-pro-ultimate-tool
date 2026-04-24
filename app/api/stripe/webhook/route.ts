import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export const runtime = 'edge'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

// Initialize Stripe with fetch-compatible HTTP client
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
})

export async function POST(request: NextRequest) {
  const supabaseServiceRole = createServerClient()
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  console.log(`Received Stripe event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session
        const customerId = checkoutSession.customer as string
        const userId = checkoutSession.metadata?.userId // Assuming you pass userId in metadata
        const priceId = checkoutSession.line_items?.data[0]?.price?.id

        if (!userId) {
          console.error('User ID not found in checkout session metadata.', checkoutSession)
          return NextResponse.json({ error: 'User ID missing' }, { status: 400 })
        }

        // Handle subscription or one-time payment
        if (checkoutSession.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription as string)
          await supabaseServiceRole.from('subscriptions').upsert({
            id: subscription.id,
            user_id: userId,
            status: subscription.status,
            price_id: subscription.items.data[0].price.id,
            customer_id: customerId,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            metadata: subscription.metadata,
          }, { onConflict: 'id' })

          // Update credits for pro subscription
          if (priceId === 'price_1TPoeDRoWZXxrh8fRqb6Ss7I') { // Pro subscription price ID
            await supabaseServiceRole.from('tool_credits').upsert({
              user_id: userId,
              tool_slug: 'engineer-pro-ultimate-tool', // Apply to this specific tool
              credits_limit: -1, // -1 can mean unlimited
              credits_used: 0,
              reset_at: null, // No reset for unlimited
            }, { onConflict: 'user_id,tool_slug' })
            console.log(`User ${userId} subscribed to Pro. Credits updated to unlimited for tool.`) // Unlimited credits
          }

        } else if (checkoutSession.mode === 'payment' && priceId === 'price_1TPoeERoWZXxrh8fUxy6EUZN') {
          // One-time 'Remove Ads' purchase
          await supabaseServiceRole.from('one_time_purchases').upsert({
            id: checkoutSession.payment_intent as string,
            user_id: userId,
            price_id: priceId,
            customer_id: customerId,
            created_at: new Date(checkoutSession.created * 1000).toISOString(),
            metadata: checkoutSession.metadata,
          }, { onConflict: 'id' })
          console.log(`User ${userId} purchased 'Remove Ads'.`)
        }

        break

      case 'customer.subscription.deleted':
        const subscriptionDeleted = event.data.object as Stripe.Subscription
        const deletedSubscriptionId = subscriptionDeleted.id
        const deletedUserId = subscriptionDeleted.metadata?.userId

        if (!deletedUserId) {
          console.error('User ID not found in deleted subscription metadata.', subscriptionDeleted)
          break;
        }

        await supabaseServiceRole.from('subscriptions')
          .update({ status: subscriptionDeleted.status, cancel_at_period_end: true })
          .eq('id', deletedSubscriptionId)

        // Revoke unlimited credits, restore default or based on new plan
        await supabaseServiceRole.from('tool_credits').upsert({
          user_id: deletedUserId,
          tool_slug: 'engineer-pro-ultimate-tool',
          credits_limit: 0, // Set to 0 or default free limit upon cancellation
          credits_used: 0,
          reset_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Restore monthly free credits
        }, { onConflict: 'user_id,tool_slug' })
        console.log(`Subscription ${deletedSubscriptionId} deleted for user ${deletedUserId}. Credits reset.`) 

        break

      // Potentially handle other events like 'invoice.payment_succeeded', 'customer.subscription.updated', etc.

      default:
        console.warn(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error: any) {
    console.error('Error processing Stripe webhook event:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
