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
        <link rel="png" href="https://i.postimg.cc/Y011M8sZ/icon.png" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}
