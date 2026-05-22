import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RenderLoop — Creative Coding Gallery',
  description: 'A collection of generative art and interactive canvas experiments.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} bg-[#080808] text-[#e8e8e8] min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
