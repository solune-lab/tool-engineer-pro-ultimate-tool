"use client"

import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'

const toolSlug = 'engineer-pro-ultimate-tool'
const NEXT_PUBLIC_ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-xxxxxxxxxxxxxxx'
const NEXT_PUBLIC_ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT || 'xxxxxxxxxx'
const NEXT_PUBLIC_TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x000000000000000000AA'

interface EPUSimulationResult {
  analysisType: string
  metric: string
  value: string
  unit: string
  status: string
  notes?: string
}

export function EPU_ToolInterface() {
  const supabase = createBrowserClient()
  const router = useRouter()

  const [currentToolUser, setCurrentToolUser] = useState<User | null>(null)
  const [isPaidSubscriber, setIsPaidSubscriber] = useState<boolean>(false)
  const [engineeringProblem, setEngineeringProblem] = useState<string>('')
  const [engineeringParametersFile, setEngineeringParametersFile] = useState<File | null>(null)
  const [parameterDirectInput, setParameterDirectInput] = useState<string>('')
  const [processingState, setProcessingState] = useState<'idle' | 'executing' | 'completed' | 'error'>('idle')
  const [analyticalResults, setAnalyticalResults] = useState<EPUSimulationResult[]>([])
  const [errorMessages, setErrorMessages] = useState<string | null>(null)
  const [availableCredits, setAvailableCredits] = useState<number | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = React.useRef<TurnstileInstance>(null)
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false)

  const fetchUserAndSubscriptionStatus = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setCurrentToolUser(user)

    if (user) {
      // Check for active subscription or remove_ads purchase
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('status, current_period_end')
        .eq('user_id', user.id)
        .filter('status', 'in', ['trialing', 'active'])
        .lte('current_period_end', new Date().toISOString())
        .single()

      const { data: purchaseData, error: purchaseError } = await supabase
        .from('one_time_purchases')
        .select('price_id')
        .eq('user_id', user.id)
        .eq('price_id', 'price_1TPoeERoWZXxrh8fUxy6EUZN') // Remove Ads price ID
        .maybeSingle()
      
      if (subscriptionData || purchaseData) {
        setIsPaidSubscriber(true)
      } else {
        setIsPaidSubscriber(false)
      }

      // Fetch credits
      const { data: creditData, error: creditError } = await supabase
        .from('tool_credits')
        .select('credits_limit, credits_used')
        .eq('user_id', user.id)
        .eq('tool_slug', toolSlug)
        .maybeSingle()

      if (creditData) {
        setAvailableCredits(creditData.credits_limit - creditData.credits_used)
      } else if (creditError && creditError.code === 'PGRST116') { // No rows found
        // User has no record in tool_credits, implies default free credits or needs initialization
        // For now, assume default is handled by API route on first use, or show CTA
        setAvailableCredits(0); // Prompt for login/signup if not already
      } else if (creditError) {
        console.error('Error fetching credits:', creditError)
        setErrorMessages('Failed to load credit information.')
      }
    } else {
      setIsPaidSubscriber(false)
      setAvailableCredits(0)
    }
  }, [supabase])

  useEffect(() => {
    fetchUserAndSubscriptionStatus()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentToolUser(session.user)
        fetchUserAndSubscriptionStatus()
      } else {
        setCurrentToolUser(null)
        setIsPaidSubscriber(false)
        setAvailableCredits(0)
      }
    })

    // Check for mobile device for app CTA
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      if (/android/i.test(userAgent) || /ipad|iphone|ipod/.test(userAgent) && !(window as any).MSStream) {
        setIsMobileDevice(true);
      }
    }

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase, fetchUserAndSubscriptionStatus])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setEngineeringParametersFile(event.target.files[0])
    }
  }

  const handleFormSubmission = async (event: FormEvent) => {
    event.preventDefault()
    setErrorMessages(null)
    setAnalyticalResults([])

    if (!currentToolUser) {
      setErrorMessages('Please log in or sign up to use the tool.')
      router.push('/login') // Redirect to login page
      return
    }
    
    if (availableCredits !== null && availableCredits <= 0) {
      setErrorMessages('You have exhausted your credits. Please upgrade or wait for your credits to reset.')
      return
    }

    if (!turnstileToken) {
      setErrorMessages('Please complete the security check.')
      return
    }

    setProcessingState('executing')

    let parametersContent = parameterDirectInput
    if (engineeringParametersFile) {
      try {
        parametersContent = await engineeringParametersFile.text()
      } catch (fileError) {
        setErrorMessages('Failed to read input parameters file.')
        setProcessingState('error')
        return
      }
    }

    try {
      const response = await fetch('/api/tools/engineer-pro-ultimate-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          problem_statement: engineeringProblem,
          input_parameters: parametersContent,
          turnstile_token: turnstileToken,
        }),
      })

      if (response.status === 401) {
        setErrorMessages('Authentication failed. Please log in again.')
        router.push('/login')
        return
      }

      if (response.status === 402) {
        const data = await response.json()
        if (data.error === 'quota_exceeded') {
          setErrorMessages('You have exhausted your credits. Please upgrade to continue.')
          setProcessingState('error')
          return
        }
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'An unexpected error occurred during processing.')
      }

      // Deduct credit immediately on the client-side for responsive UI
      if (availableCredits !== null) {
        setAvailableCredits(prev => (prev !== null ? prev - 1 : null))
      }

      const data = await response.json()
      setAnalyticalResults(data.simulation_output)
      setProcessingState('completed')
      turnstileRef.current?.reset()
      setTurnstileToken(null)

    } catch (apiError: any) {
      console.error('Tool API error:', apiError)
      setErrorMessages(apiError.message || 'Failed to process the engineering solution.')
      setProcessingState('error')
    }
  }

  const handleUpgradeClick = async (priceId: string) => {
    if (!currentToolUser) {
      router.push('/login') // Redirect to login if not logged in
      return
    }

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          priceId,
          returnUrl: window.location.href, // Current page for redirect
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to initiate checkout.')
      }

      const { url } = await response.json()
      if (url) {
        router.push(url) // Redirect to Stripe Checkout
      } else {
        setErrorMessages('Could not get Stripe Checkout URL.')
      }
    } catch (err: any) {
      console.error('Stripe Checkout Error:', err)
      setErrorMessages(err.message || 'Failed to initiate payment. Please try again.')
    }
  }

  return (
    <div className="bg-EPU-bg p-8 rounded-lg shadow-2xl border border-EPU-primary/30">
      <h2 className="text-3xl font-bold text-EPU-primary mb-6">Engineering Solution Interface</h2>

      {errorMessages && (
        <div className="bg-red-900/40 border border-red-600 text-red-300 p-4 rounded-md mb-6 animate-fade-in-down">
          <p className="font-bold">Error:</p>
          <p>{errorMessages}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <form onSubmit={handleFormSubmission} className="space-y-6">
            <div>
              <label htmlFor="engineering-problem" className="block text-EPU-primary text-lg font-semibold mb-2">Engineering Problem or Query</label>
              <textarea
                id="engineering-problem"
                className="w-full p-3 bg-EPU-primary/10 border border-EPU-primary/40 rounded-md focus:outline-none focus:ring-2 focus:ring-EPU-secondary text-EPU-secondary-light placeholder-EPU-secondary-light/70"
                rows={6}
                value={engineeringProblem}
                onChange={(e) => setEngineeringProblem(e.target.value)}
                placeholder="Describe the engineering challenge, analysis goal, or specific query..."
                required
              />
            </div>

            <div>
              <label htmlFor="input-parameters" className="block text-EPU-primary text-lg font-semibold mb-2">Parameters (CSV, JSON, or direct input)</label>
              <input
                type="file"
                id="input-parameters-file"
                className="block w-full text-EPU-secondary-light text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-EPU-secondary file:text-EPU-bg hover:file:bg-EPU-secondary/80 focus:outline-none focus:ring-2 focus:ring-EPU-secondary focus:ring-offset-2 focus:ring-offset-EPU-bg"
                accept=".csv,.json,.txt"
                onChange={handleFileChange}
              />
              <p className="text-sm text-EPU-secondary-light/80 mt-2">Or paste directly:</p>
              <textarea
                id="input-parameters-direct"
                className="w-full p-3 bg-EPU-primary/10 border border-EPU-primary/40 rounded-md focus:outline-none focus:ring-2 focus:ring-EPU-secondary text-EPU-secondary-light placeholder-EPU-secondary-light/70 mt-2"
                rows={4}
                value={parameterDirectInput}
                onChange={(e) => setParameterDirectInput(e.target.value)}
                placeholder="Enter parameters in CSV or JSON format, e.g., 'Modulus,200e9\nYield,300e6' or '{'modulus': 200e9}'"
              />
            </div>

            {currentToolUser && (
              <div className="mt-4">
                <p className="text-sm text-EPU-secondary-light">
                  Credits remaining: <span className="font-bold text-EPU-primary">{availableCredits !== null ? availableCredits : 'Loading...'}</span>
                </p>
              </div>
            )}

            <div className="mt-6">
              <Turnstile
                ref={turnstileRef}
                siteKey={NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                options={{ theme: 'dark' }}
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setTurnstileToken(null)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-EPU-primary text-EPU-bg font-bold rounded-md text-lg transition-all duration-300 hover:bg-EPU-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={processingState === 'executing' || !engineeringProblem || (!engineeringParametersFile && !parameterDirectInput) || !turnstileToken}
            >
              {processingState === 'executing' ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-EPU-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Initiate Engineering Solution'
              )}
            </button>
            {!currentToolUser && (
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="w-full py-3 px-6 bg-EPU-secondary text-EPU-bg font-bold rounded-md text-lg transition-all duration-300 hover:bg-EPU-primary mt-4"
              >
                Login / Sign Up to Use Tool
              </button>
            )}
          </form>

          {availableCredits !== null && availableCredits <= 0 && currentToolUser && (
            <div className="mt-8 p-6 bg-EPU-primary/15 border border-EPU-primary/40 rounded-lg text-center animate-fade-in">
              <h3 className="text-2xl font-bold text-EPU-primary mb-4">Credits Exhausted!</h3>
              <p className="text-EPU-secondary-light mb-4">You've used all your free credits. Upgrade to continue building amazing things.</p>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => handleUpgradeClick('price_1TPoeERoWZXxrh8fUxy6EUZN')}
                  className="w-full py-3 px-6 bg-EPU-secondary text-EPU-bg font-bold rounded-md text-lg transition-all duration-300 hover:bg-EPU-primary"
                >
                  Remove Ads (One-time $4.99)
                </button>
                <button
                  onClick={() => handleUpgradeClick('price_1TPoeDRoWZXxrh8fRqb6Ss7I')}
                  className="w-full py-3 px-6 bg-EPU-primary text-EPU-bg font-bold rounded-md text-lg transition-all duration-300 hover:bg-EPU-secondary"
                >
                  Go Pro (Monthly $9.99) - Unlimited Access
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold text-EPU-primary mb-4">Analytical Results</h3>
          {processingState === 'idle' && analyticalResults.length === 0 && (
            <p className="text-EPU-secondary-light">Submit your engineering problem to see the results here.</p>
          )}
          {processingState === 'executing' && (
            <div className="flex items-center justify-center h-48">
              <svg className="animate-spin h-10 w-10 text-EPU-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="ml-3 text-EPU-secondary-light text-lg">Performing complex calculations...</p>
            </div>
          )}
          {processingState === 'completed' && analyticalResults.length > 0 && (
            <div className="bg-EPU-primary/10 p-4 rounded-md animate-fade-in-up overflow-x-auto">
              <table className="w-full text-EPU-secondary-light border-collapse">
                <thead>
                  <tr className="border-b border-EPU-primary/40">
                    <th className="text-left p-2 text-EPU-primary font-semibold">Analysis</th>
                    <th className="text-left p-2 text-EPU-primary font-semibold">Metric</th>
                    <th className="text-left p-2 text-EPU-primary font-semibold">Value</th>
                    <th className="text-left p-2 text-EPU-primary font-semibold">Unit</th>
                    <th className="text-left p-2 text-EPU-primary font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticalResults.map((result, index) => (
                    <tr key={index} className={`border-b border-EPU-primary/20 ${index % 2 === 0 ? 'bg-EPU-primary/5' : ''}`}>
                      <td className="p-2">{result.analysisType}</td>
                      <td className="p-2">{result.metric}</td>
                      <td className="p-2 font-bold text-EPU-primary">{result.value}</td>
                      <td className="p-2">{result.unit}</td>
                      <td className="p-2"><span className={`px-2 py-1 rounded-full text-xs font-medium ${result.status === 'OK' ? 'bg-green-600/30 text-green-300' : 'bg-red-600/30 text-red-300'}`}>{result.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm italic text-EPU-secondary-light/80">Results are based on current inputs and engineered for reliability. For advanced simulations, consider upgrading.</p>
            </div>
          )}
          {processingState === 'error' && (
            <p className="text-red-400 mt-4">Failed to get analytical results. Please check your inputs and try again.</p>
          )}
        </div>
      </div>

      {/* AdSense Slot for free users */}
      {!isPaidSubscriber && currentToolUser && availableCredits !== null && availableCredits > 0 && (
        <div className="mt-12 w-full max-w-2xl bg-EPU-primary/10 p-4 rounded-lg text-center border border-EPU-primary/40 animate-fade-in">
          <p className="text-EPU-secondary-light text-sm mb-2">Advertisement</p>
          <div
            className="adsense-slot bg-EPU-bg w-full h-32 flex items-center justify-center text-EPU-secondary-light border border-dashed border-EPU-secondary/50 rounded-md"
            data-ad-client={NEXT_PUBLIC_ADSENSE_CLIENT}
            data-ad-slot={NEXT_PUBLIC_ADSENSE_SLOT}
          >
            {/* Google AdSense will inject content here */}
            <p>Your ad here</p>
          </div>
          <p className="text-sm text-EPU-secondary-light/80 mt-2">Enjoy an ad-free experience by subscribing to Pro!</p>
        </div>
      )}

      {isMobileDevice && (
        <a href="#app-coming-soon" className="fixed bottom-8 right-8 bg-EPU-secondary text-EPU-bg py-3 px-6 rounded-full shadow-lg font-bold text-lg hover:bg-EPU-primary transition-colors animate-bounce-subtle">
          Download Our App
        </a>
      )}
    </div>
  )
}
