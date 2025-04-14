'use client';

import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MenusTipo = {
    id: number;
    fecha: Date; // o Date si lo parseas
    nombre: string;
    info_extra?: string;
};

export const columns: ColumnDef<MenusTipo>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'fecha',
        header: 'Fecha',
    },
    {
        accessorKey: 'nombre',
        header: 'Título',
        cell: ({ row }) => {
            const id = row.original.id;
            const nombre = row.getValue('nombre');
            return (
                <Link href={`/menus/${id}`} className="relative inline-block rounded-xl">
                    <span className="before:bg-primary before:dark:bg-primary before:absolute before:-inset-1 before:duration-600 hover:before:-inset-2  before:rounded-xl hover:before:rounded-xl ">
                        <span className="relative font-bold text-white dark:text-white rounded-md">{nombre}</span>
                    </span>
                </Link>
            );
        },
    },
    {
        accessorKey: 'info_extra',
        header: 'Información adicional',
    },
];
