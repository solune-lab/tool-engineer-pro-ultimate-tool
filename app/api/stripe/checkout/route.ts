import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export const runtime = 'edge'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!
const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    const { priceId, returnUrl } = await request.json()

    if (!priceId || !returnUrl) {
      return NextResponse.json({ error: 'Missing priceId or returnUrl' }, { status: 400 })
    }

    let checkoutSession: Stripe.Checkout.Session;

    // Retrieve the price to check if it's a subscription or one-time payment
    const price = await stripe.prices.retrieve(priceId);

    if (price.type === 'recurring') {
      // Create a subscription checkout session
      checkoutSession = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: returnUrl,
        metadata: { userId: user.id },
      })
    } else if (price.type === 'one_time') {
      // Create a one-time payment checkout session
      checkoutSession = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: returnUrl,
        metadata: { userId: user.id },
      })
    } else {
        return NextResponse.json({ error: 'Unsupported price type' }, { status: 400 });
    }

    return NextResponse.json({ url: checkoutSession.url }, { status: 200 })

  } catch (error: any) {
    console.error('Stripe Checkout API Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create checkout session' }, { status: 500 })
  }
}
