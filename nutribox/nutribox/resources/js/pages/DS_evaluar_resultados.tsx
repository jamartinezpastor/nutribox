import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evaluar alimentos',
        href: '/inicio',
    },
];

interface PageProps {
    error?: string;
    producto?: string;
    cantidad?: string;
    patologia?: string;
    analisis?: string; // Ajusta el tipo según la estructura de los datos
    [key: string]: any; // Para inertia
}

export default function DS_evaluar_resultados() {
    const { props } = usePage<PageProps>();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resultados de la búsqueda" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-4xl mb-4">2 / 2. RESULTADOS DE LA BÚSQUEDA</h1>

                {props.error && <p className="text-red-500">{props.error}</p>}

                {!props.error && props.analisis ? (
                    <div>
                        <h2 className="text-2xl font-semibold">Análisis</h2>
                        <p><strong>Producto:</strong> {props.producto}</p>
                        <p><strong>Cantidad:</strong> {props.cantidad}</p>
                        <p><strong>Patología:</strong> {props.patologia}</p>

                        <h3 className="text-xl font-semibold mt-4">Detalles:</h3>
                        <p>{JSON.stringify(props.analisis, null, 2)}</p>
                        <pre className="bg-gray-100 p-4 rounded"></pre>
                    </div>
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
            </div>
        </AppLayout>
    );
}
