import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Menús guardados',
        href: '/inicio',
    }, 

];


// Prerequisitos: interfaz  + instancias del objeto (pruebas con TABLAS, A MEDIO !!!!)
type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }
  
  export const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ]
  


export default function Dashboard() {
    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menús guardados" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">MENÚS GUARDADOS </p>
                <p className="text-xl">Incluir opción de modificar</p>
                <p className="text-xl">Incluir opción de eliminar</p>
            </div>
          
        </AppLayout>
    );
}
