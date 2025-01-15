import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ASTRAEUS - The Future Of Blockchain',
  description: 'Advanced blockchain operations with AI-powered analysis',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" type="image/png" href="https://www.seda.xyz/png-sequence/031.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
