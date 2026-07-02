import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Noto_Sans_Thai, Noto_Serif_Thai } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const notoSansThai = Noto_Sans_Thai({
  variable: '--font-body',
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const notoSerifThai = Noto_Serif_Thai({
  variable: '--font-th-serif',
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'NOAH — Thai Fruit Wines & Sweets',
  description:
    'NOAH — คัดสรรขนมไทย ไวน์ผลไม้ไทย และสินค้าเกษตรสดใหม่ ส่งตรงถึงบ้าน',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#232A3B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      className={`${fraunces.variable} ${notoSansThai.variable} ${notoSerifThai.variable} bg-cream`}
    >
      <body className="font-body antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
