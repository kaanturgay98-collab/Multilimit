import { ReactNode } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type AdminTableColumn<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
  width?: string
}

type AdminTableProps<T> = {
  columns: AdminTableColumn<T>[]
  rows: T[]
  emptyMessage?: string
}

export function AdminTable<T>({ columns, rows, emptyMessage = "Kayit bulunamadi." }: AdminTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((c) => (
            <TableHead key={c.header} style={c.width ? { width: c.width } : undefined}>
              {c.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground text-sm">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((c) => (
                <TableCell key={c.header} className="align-middle">
                  {c.render ? c.render(row) : String((row as any)[c.key as string] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

