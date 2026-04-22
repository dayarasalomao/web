import type { ReactNode } from 'react'
import { SubpageShell } from '@/components/SubpageShell'

interface TreatmentsLayoutProps {
  children: ReactNode
}

export default function TreatmentsLayout({ children }: TreatmentsLayoutProps) {
  return <SubpageShell>{children}</SubpageShell>
}
