import type { Metadata } from 'next'
import './globals.css'
import { Playfair_Display } from 'next/font/google'
import Script from 'next/script'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Porto Best City',
  description: 'The latest local news and events',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* GoatCounter */}
        <Script
          src="//gc.zgo.at/count.js"
          data-goatcounter="https://portobestcity-stats.goatcounter.com/count"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${playfair.className} antialiased`}>{children}</body>
    </html>
  )
}
