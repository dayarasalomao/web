import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

interface SubpageShellProps {
  children: ReactNode
}

export function SubpageShell({ children }: SubpageShellProps) {
  return (
    <>
      <Header mode="subpage" />
      {children}
      <Footer />
    </>
  )
}
