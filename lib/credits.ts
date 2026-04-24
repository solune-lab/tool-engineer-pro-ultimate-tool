import { createServiceRoleClient } from './supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

// Use createServiceRoleClient for this, as it interacts with sensitive credit data
export async function checkAndDeductCredit(
  serviceClient: SupabaseClient, // Use serviceClient passed from API route
  userId: string,
  toolSlug: string
): Promise<{ allowed: boolean; remaining: number } | { allowed: boolean; remaining: null }>
{
  if (!userId) {
    return { allowed: false, remaining: 0 }; // Not logged in
  }

  // First, check if the user is a Pro subscriber (unlimited access)
  const { data: subscription, error: subError } = await serviceClient
    .from('subscriptions')
    .select('status, current_period_end')
    .eq('user_id', userId)
    .filter('status', 'in', ['trialing', 'active'])
    .lte('current_period_end', new Date().toISOString())
    .maybeSingle()

  if (subError && subError.code !== 'PGRST116') { // PGRST116 means no rows found, which is fine
    console.error('Error checking subscription status:', subError);
    // For safety, disallow if there's a serious error retrieving subscription info
    return { allowed: false, remaining: 0 };
  }

  if (subscription) {
    // Pro subscriber has unlimited access
    return { allowed: true, remaining: -1 }; // -1 indicates unlimited
  }

  // Not a Pro subscriber, check and deduct specific tool credits
  const { data: creditsData, error: fetchCreditsError } = await serviceClient
    .from('tool_credits')
    .select('credits_limit, credits_used, reset_at')
    .eq('user_id', userId)
    .eq('tool_slug', toolSlug)
    .maybeSingle()

  if (fetchCreditsError && fetchCreditsError.code === 'PGRST116') {
    // No credit record found, possibly first time using tool. Initialize with default free credits.
    const DEFAULT_FREE_CREDITS_PER_MONTH = 5;
    const now = new Date();
    const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // First day of next month

    const { error: insertError } = await serviceClient
      .from('tool_credits')
      .insert({
        user_id: userId,
        tool_slug: toolSlug,
        credits_limit: DEFAULT_FREE_CREDITS_PER_MONTH,
        credits_used: 1, // Deduct first credit immediately
        reset_at: resetDate.toISOString(),
      });

    if (insertError) {
      console.error('Error initializing tool credits:', insertError);
      return { allowed: false, remaining: 0 };
    }
    return { allowed: true, remaining: DEFAULT_FREE_CREDITS_PER_MONTH - 1 };

  } else if (fetchCreditsError) {
    console.error('Error fetching tool credits:', fetchCreditsError);
    return { allowed: false, remaining: 0 };
  }

  if (!creditsData) {
    // Should ideally be caught by PGRST116 above, but for type safety
    return { allowed: false, remaining: 0 };
  }

  let { credits_limit, credits_used, reset_at } = creditsData;

  // Handle reset logic if `reset_at` is in the past
  if (reset_at && new Date(reset_at) < new Date()) {
    credits_used = 0; // Reset used credits
    credits_limit = 5; // Re-apply default free limit (or whatever the free tier limit is)
    const now = new Date();
    reset_at = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(); // Set next reset to first day of next month

    // Update the database with reset values
    const { error: updateResetError } = await serviceClient
      .from('tool_credits')
      .update({ credits_used: 0, credits_limit: credits_limit, reset_at: reset_at })
      .eq('user_id', userId)
      .eq('tool_slug', toolSlug);

    if (updateResetError) {
      console.error('Error resetting tool credits:', updateResetError);
      // Continue, but log the error
    }
  }

  if (credits_limit === -1) {
      // This case should be caught by the subscription check above, but as a fallback
      return { allowed: true, remaining: -1 };
  }

  if (credits_used < credits_limit) {
    // Deduct credit
    const { error: deductError } = await serviceClient
      .from('tool_credits')
      .update({ credits_used: credits_used + 1 })
      .eq('user_id', userId)
      .eq('tool_slug', toolSlug);

    if (deductError) {
      console.error('Error deducting tool credit:', deductError);
      return { allowed: false, remaining: credits_limit - credits_used }; // Return current state before failed deduction
    }
    return { allowed: true, remaining: credits_limit - (credits_used + 1) };
  } else {
    return { allowed: false, remaining: 0 };
  }
}
