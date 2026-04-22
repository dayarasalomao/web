import type { ReactNode } from 'react'
import { SubpageShell } from '@/components/SubpageShell'

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <SubpageShell>{children}</SubpageShell>
}
