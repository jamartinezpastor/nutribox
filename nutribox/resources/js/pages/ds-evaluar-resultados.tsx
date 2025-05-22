import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

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

            <div className="to-white/00 dark:to-black/00 relative flex min-h-screen flex-col gap-4 rounded-xl bg-linear-to-tr from-white/100 p-4 dark:from-black/100">
                {/* Imagen de fondo con poca opacidad */}
                {props.imageUrl && (
                    <div
                        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
                        style={{
                            backgroundImage: `url(${props.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                )}

                <h1 className="mb-4 text-4xl">Resultados Evaluador Alimento-Patología (IA)</h1>

                {props.error && <p className="text-red-500">{props.error}</p>}

                {!props.error && props.analisis ? (
                    <div className="to-white/00 dark:to-black/00 relative z-10 flex min-h-screen flex-col gap-1 rounded-xl bg-linear-to-tr from-white/100 p-2 opacity-100 dark:from-black/100">
                        <div className="flex items-center gap-1">
                            <h2 className="bg-secondary inline-block rounded-xl px-4 py-1 text-2xl text-3xl font-bold capitalize uppercase">
                                {props.producto}
                            </h2>
                        </div>

                        <br />
                        <h2 className="text-xl font-semibold uppercase">Cantidad:</h2>
                        <span>
                            <strong>{props.cantidad}</strong>
                            <i> {props.unidad}</i>
                        </span>
                        <br />
                        <h2 className="text-xl font-semibold uppercase">Patología:</h2>
                        <span>
                            <strong>{props.patologia}</strong>
                        </span>
                        <br />
                        <h2 className="text-xl font-semibold uppercase">Análisis:</h2>
                        <span className="hover:shadow-primary hover:ring-primary/60 active:ring-primary/60 active:shadow-primary transform-gpu cursor-pointer rounded-xl border p-4 whitespace-pre-line shadow-lg transition-all duration-500 hover:[transform:scale(1.05)] hover:shadow-[0_0_30px_8px] hover:ring-2 active:ring active:ring-offset-2">
                            {props.analisis}
                        </span>
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
