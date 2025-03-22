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
