import type { ReactNode } from 'react'
import { SubpageShell } from '@/components/SubpageShell'

interface FaqLayoutProps {
  children: ReactNode
}

export default function FaqLayout({ children }: FaqLayoutProps) {
  return <SubpageShell>{children}</SubpageShell>
}
