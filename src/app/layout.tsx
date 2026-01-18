import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import { metadataDefaults } from './utils'

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
  metadataBase: new URL('https://portobest.city'),
  title: {
    default: metadataDefaults.title,
    template: '%s | PortoBestCity',
  },
  description: metadataDefaults.description,
  keywords: [
    'Porto news',
    'Porto guide',
    'Porto culture',
    'Porto events',
    'Porto sports',
    'Porto tourism',
    'Porto interviews',
    'Porto in English',
    'Portugal news',
    'Porto lifestyle',
  ],
  authors: [{ name: 'PortoBestCity' }],
  creator: 'PortoBestCity',
  publisher: 'PortoBestCity',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    locale: 'en_GB',
    type: 'website',
    siteName: 'PortoBestCity',
  },
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
      <body className="flex min-h-screen flex-col font-serif">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
