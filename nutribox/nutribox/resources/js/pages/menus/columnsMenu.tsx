"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Link } from '@inertiajs/react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MenusTipo = {
  id: number
  fecha: Date // o Date si lo parseas
  nombre: string
  info_extra?: string
}

export const columns: ColumnDef<MenusTipo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "nombre",
    header: "Título",
    cell: ({ row }) => {
      const id = row.original.id
      const nombre = row.getValue("nombre")
      return (
        <Link
          href={`/menus/${id}`}
          className="text-blue-600 hover:underline"
        >
          {nombre}
        </Link>
      )
    }
  },
  {
    accessorKey: "info_extra",
    header: "Información adicional",
  },
]
