import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Vision App',
  description: 'Ask AI with images and chat; ask about book pages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}

