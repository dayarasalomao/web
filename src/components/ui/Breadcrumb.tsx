import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-600 ${className}`}
    >
      {items.map((item, index) => {
        const isCurrentPage = index === items.length - 1

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-copper">
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isCurrentPage ? 'page' : undefined}
                className={isCurrentPage ? 'font-medium text-teal' : 'text-gray-600'}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? (
              <span aria-hidden="true" className="text-beige">
                /
              </span>
            ) : null}
          </span>
        )
      })}
    </nav>
  )
}
