import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Base de datos de alimentos',
        href: '/inicio',
    }, 

];

export default function Dashboard() {
    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Base de datos de alimentos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">2 / 2. <br />RESULTADOS DE LA BUSQUEDA</p>
            </div>
          
        </AppLayout>
    );
}
