import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Header } from '@/components/Header'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
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
    <html lang="en" className={`${playfair.variable} ${poppins.variable} antialiased`}>
      <head>
        {/* GoatCounter */}
        <Script
          src="//gc.zgo.at/count.js"
          data-goatcounter="https://portobestcity-stats.goatcounter.com/count"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-serif">
        <Header />
        {children}
      </body>
    </html>
  )
}
