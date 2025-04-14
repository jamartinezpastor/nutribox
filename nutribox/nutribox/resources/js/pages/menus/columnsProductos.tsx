'use client';

import { ColumnDef } from '@tanstack/react-table';

export type ProductoTipo = {
    id?: number;
    nombre: string;
    cantidad: number;
    unidad: string;
    kcal: number;
    gr: number;
    ch: number;
    pr: number;
};

export const columnsProductos: ColumnDef<ProductoTipo>[] = [
    {
        accessorKey: 'nombre',
        header: 'Producto',
    },
    {
        accessorFn: (row) => `${row.cantidad} ${row.unidad}`,
        id: 'cantidad_unidad', // Un identificador único para la columna combinada
        header: 'Cantidad',
    },
    {
        accessorKey: 'kcal',
        header: 'Calorías (kcal)',
    },
    {
        accessorKey: 'pr',
        header: 'Proteínas (g)',
    },
    {
        accessorKey: 'ch',
        header: 'Hidratos de Carbono (g)',
    },
    {
        accessorKey: 'gr',
        header: 'Grasas (g)',
    },
];
