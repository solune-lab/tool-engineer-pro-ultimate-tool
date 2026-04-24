import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EngineerPro Ultimate | Solune LLC',
  description: 'Professional engineering tools for calculations, FE prep, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
