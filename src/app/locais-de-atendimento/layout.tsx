import type { ReactNode } from 'react'
import { SubpageShell } from '@/components/SubpageShell'

export default function LocationsLayout({ children }: { children: ReactNode }) {
  return <SubpageShell>{children}</SubpageShell>
}
