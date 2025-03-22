import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evaluar Alimento',
        href: '/inicio',
    }, 

];

export default function Dashboard() {
    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Evaluar Alimento" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">EVALUAR ALIMENTO Y PATOLOGÍAS (IA) </p>
              
            </div>
          
        </AppLayout>
    );
}