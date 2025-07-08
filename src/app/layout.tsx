import type { Metadata } from 'next'
import { Montserrat, Cinzel } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dra. Dayara Salomão | Coloproctologista',
  description:
    'Médica especialista em coloproctologia. Tratamento minimamente invasivo com laser e outras tecnologias para doenças da região anal. Agende sua consulta.',
  keywords:
    'coloproctologista, proctologista, hemorroidas, fissura anal, tratamento laser, cirurgia minimamente invasiva, Dayara Salomão',
  authors: [{ name: 'Dra. Dayara Salomão' }],
  openGraph: {
    title: 'Dra. Dayara Salomão | Coloproctologista',
    description:
      'Especialista em coloproctologia com tratamentos minimamente invasivos',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${cinzel.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
