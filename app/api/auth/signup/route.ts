import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { isDisposableEmail } from '@/lib/disposable-emails'

export const runtime = 'edge'

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY!
const DEFAULT_FREE_CREDITS = 5; // Example default, adjust as needed
const TOOL_SLUG = 'engineer-pro-ultimate-tool'; // Ensure this matches the tool slug

export async function POST(request: NextRequest) {
  try {
    const { email, password, device_fingerprint, turnstile_token } = await request.json()

    if (!email || !password || !device_fingerprint || !turnstile_token) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Verify Cloudflare Turnstile
    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${TURNSTILE_SECRET_KEY}&response=${turnstile_token}`,
    })
    const turnstileData = await turnstileResponse.json()
    if (!turnstileData.success) {
      console.error('Turnstile verification failed:', turnstileData['error-codes'])
      return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 403 })
    }

    // 2. Check for disposable email
    if (isDisposableEmail(email)) {
      return NextResponse.json({ error: 'Please use a real email address' }, { status: 400 })
    }

    const supabaseServiceRole = createServerClient()

    // 3. Check device fingerprint for abuse
    let initialCredits = DEFAULT_FREE_CREDITS;
    const { data: existingProfiles, error: fingerprintError } = await supabaseServiceRole
      .from('profiles')
      .select('user_id')
      .eq('device_fingerprint', device_fingerprint)

    if (fingerprintError) {
        console.error('Error checking device fingerprint:', fingerprintError);
        // Continue with default credits, but log the error
    } else if (existingProfiles && existingProfiles.length > 0) {
        console.warn(`Duplicate fingerprint detected for ${email}. Setting initial credits to 0.`);
        initialCredits = 0; // Set initial credits to 0 for repeat offenders
    }

    // 4. Create Supabase user
    const { data, error: signUpError } = await supabaseServiceRole.auth.signUp({
      email,
      password,
      options: {
        data: { device_fingerprint }, // Store fingerprint in user metadata if desired, also in profiles table
      },
    })

    if (signUpError) {
      console.error('Supabase signup error:', signUpError)
      return NextResponse.json({ error: signUpError.message }, { status: 400 })
    }

    const user = data.user
    if (!user) {
      return NextResponse.json({ error: 'User creation failed.' }, { status: 500 })
    }

    // 5. Insert into profiles table and set initial credits in tool_credits
    const { error: profileError } = await supabaseServiceRole
      .from('profiles')
      .insert({
        user_id: user.id,
        email: user.email,
        device_fingerprint: device_fingerprint,
      })

    if (profileError) {
      console.error('Error inserting profile:', profileError)
      // Optionally delete the user if profile creation fails, or handle it as a soft error
      // For production, consider robust rollback or retry mechanisms.
    }

    const { error: creditsError } = await supabaseServiceRole
      .from('tool_credits')
      .insert({
        user_id: user.id,
        tool_slug: TOOL_SLUG,
        credits_limit: initialCredits,
        credits_used: 0,
        reset_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      })
    
    if (creditsError) {
        console.error('Error setting initial credits:', creditsError);
    }

    return NextResponse.json({ message: 'User registered successfully. Check your email for verification.' }, { status: 200 })

  } catch (error: any) {
    console.error('Signup API Error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
