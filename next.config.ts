import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://gadpvswejvqwcyaxzxub.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZHB2c3dlanZxd2N5YXh6eHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMDU5MjgsImV4cCI6MjA5MjU4MTkyOH0.lVZawlcnS0rtwM2AB5F2DqPdT10cQoxce-o9ORByqok',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_live_51SYT2bRoWZXxrh8fj6DVR4OEqS3QdmlQduDBAvJdtF95D4wVHXiI2TH5pgsFnDMB5LAazF5T1M7VcBhwBlEWP3Oe00MAUMbl2l',
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: '0x4AAAAAAC_pcCYJA_S73ns-',
    NEXT_PUBLIC_ADSENSE_CLIENT: '',
    NEXT_PUBLIC_ADSENSE_SLOT: '',
  },
}

export default nextConfig
