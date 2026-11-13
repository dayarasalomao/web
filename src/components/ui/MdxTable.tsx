type MdxTableProps = React.ComponentPropsWithoutRef<'table'>

export function MdxTable({ children, ...props }: MdxTableProps) {
  return (
    <div className="my-8">
      <div className="mb-2 text-sm text-gray-600 md:hidden" aria-hidden="true">
        Deslize a tabela para ver todas as colunas.
      </div>
      <div
        role="region"
        aria-label="Tabela comparativa com rolagem horizontal"
        tabIndex={0}
        className="overflow-x-auto rounded-[1.25rem] border border-beige bg-white/95 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        <table {...props} className="min-w-[36rem]">
          {children}
        </table>
      </div>
    </div>
  )
}
