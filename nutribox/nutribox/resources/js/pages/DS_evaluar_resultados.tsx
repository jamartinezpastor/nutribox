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
    analisis?: string;
    imageUrl?: string;
    [key: string]: any; // Para inertia
}

export default function DS_evaluar_resultados() {
    const { props } = usePage<PageProps>();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resultados de la búsqueda" />

               <div className="relative flex min-h-screen flex-col gap-4 rounded-xl p-4">

                {/* Imagen de fondo con opacidad */}
                {props.imageUrl && (
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 -z1"
                        style={{
                            backgroundImage: `url(${props.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                )}

                <h1 className="text-4xl mb-4">Resultados evaluador nutricional</h1>

                {props.error && <p className="text-red-500">{props.error}</p>}

                {!props.error && props.analisis ? (
                    <div className="relative z-10">
                        <h2 className="text-2xl font-semibold uppercase">{props.producto}</h2>
                        <p>Cantidad: <strong>{props.cantidad}</strong> <small><i>(g / ml / pieza / vaso / etc...)</i></small></p>
                        <p>Patología: <strong>{props.patologia}</strong></p>

                        <h3 className="text-xl font-semibold mt-4">Detalles:</h3>
                        <pre className="whitespace-pre-line">{props.analisis}</pre>
                    </div>
                ) : (
                    <p>No se encontraron resultados.</p>
                )}

            </div>
        </AppLayout>
    );
}
