import type { ReactNode } from 'react'

interface CallToActionCardProps {
  title: string
  body: ReactNode
  actions: ReactNode
  className?: string
}

export function CallToActionCard({
  title,
  body,
  actions,
  className = '',
}: CallToActionCardProps) {
  return (
    <div
      className={`rounded-[2rem] border border-beige bg-white/95 p-8 shadow-sm lg:p-10 ${className}`}
    >
      <h2 className="mb-4 text-2xl font-semibold text-teal lg:text-3xl">{title}</h2>
      <div className="mb-6 text-base leading-relaxed text-gray-700 lg:text-lg">{body}</div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">{actions}</div>
    </div>
  )
}
