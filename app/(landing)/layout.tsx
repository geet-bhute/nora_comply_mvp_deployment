import { Spectral, Hanken_Grotesk } from 'next/font/google'
import './landing.css'

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-hanken',
})

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`landing-root ${spectral.variable} ${hanken.variable}`}>
      {children}
    </div>
  )
}
