import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage,router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
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
    unidad?: string;
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

            <div className="bg-linear-to-tr from-white/100 to-white/00 relative flex min-h-screen flex-col gap-4 rounded-xl p-4 dark:from-black/100 dark:to-black/00">
                {/* Imagen de fondo con opacidad */}
                {props.imageUrl && (
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 -z1 dark:opacity-10"
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
                        <h2 className="text-3xl font-bold uppercase">{props.producto}</h2><br/>
                        <h2 className="text-xl font-semibold uppercase">Cantidad:</h2>
                        <p> <strong>{props.cantidad}</strong><i> {props.unidad}</i></p> <br/>
                        <h2 className="text-xl font-semibold uppercase">Patología:</h2>
                        <p> <strong>{props.patologia}</strong></p> <br/>
                        <h2 className="text-xl font-semibold uppercase">Análisis:</h2>
                                            <p className="whitespace-pre-line">{props.analisis}</p>
                    </div>
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
   <div className="gap-8 pt-8">
                    <Button className="cursor-pointer" variant="secondary" onClick={() => router.visit('dsevaluar')}>
                        ← Volver
                    </Button>
                </div>
            </div>
         
        </AppLayout>
    );
}
