import type { Metadata } from 'next'
import './globals.css'
import { Playfair_Display } from 'next/font/google'

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
      <body className={`${playfair.className} antialiased`}>{children}</body>
    </html>
  )
}
