type MdxTableProps = React.ComponentPropsWithoutRef<'table'>

// Comparison tables in posts are wider than the prose column on small screens.
// Keep the scroll inside the table wrapper so the page body never scrolls sideways.
export function MdxTable({ children, ...props }: MdxTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-[1.25rem] border border-beige bg-white/95 shadow-sm">
      <table {...props} className="min-w-[36rem]">
        {children}
      </table>
    </div>
  )
}
