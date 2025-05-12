'use client';

import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpToLine, BicepsFlexed, ChevronsUp, CookingPot, PersonStanding, UserCheck, UserMinus } from 'lucide-react';

const iconosPorTipo = {
    UserMinus: <UserMinus />,
    UserCheck: <UserCheck />,
    BicepsFlexed: <BicepsFlexed />,
    ArrowUpToLine: <ArrowUpToLine />,
    ChevronsUp: <ChevronsUp />,
    PersonStanding: <PersonStanding />,
    CookingPot: <CookingPot />,
};

export type MenusTipo = {
    id: number;
    fecha: Date;
    tipo: string;
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
        accessorKey: 'tipo',
        header: 'Tipo',
        cell: ({ row }) => {
            const tipo = row.getValue('tipo');  // Accedemos al valor del tipo desde la fila
            return (
                <div className="flex items-center gap-2">
                   <span >{iconosPorTipo[tipo as keyof typeof iconosPorTipo] ?? <CookingPot className='text-primary'/>}</span>                
                </div>
            );
        },
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
        cell: ({ row }) => {
        const text: string = row.getValue('info_extra') || '';
        const truncated = text.split(' ').slice(0, 10).join(' ') + (text.split(' ').length > 10 ? '...' : '');
        return <span title={text}>{truncated}</span>; // Tooltip para ver el contenido completo
    },
    },
];
