import type { ReactNode } from 'react'
import { SubpageShell } from '@/components/SubpageShell'

interface AboutLayoutProps {
  children: ReactNode
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <SubpageShell>{children}</SubpageShell>
}
