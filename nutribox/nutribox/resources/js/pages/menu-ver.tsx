
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { Payment, columns } from "./menus/columns"
import { DataTable } from "./menus/data-table"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Menús guardados',
    href: '/inicio',
  },
];

type Props = {
  menus: Payment[];
};

export default function VerMenus({ menus }: Props) {
  return (

    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Menús guardados" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <p className="text-4xl">Menús guardados</p>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={menus} />
        </div>
      </div>
    </AppLayout>
  );
}


