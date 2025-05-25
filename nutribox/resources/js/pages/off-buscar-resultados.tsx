import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Base de datos de alimentos',
        href: '/inicio',
    },
];

interface Producto {
    product_name?: string;
    image_url?: string;
    brands?: string;
    nutriments?: {
        'energy-kcal_100g'?: number;
        fat_100g?: number;
        'saturated-fat_100g'?: number;
        carbohydrates_100g?: number;
        sugars_100g?: number;
        fiber_100g?: number;
        proteins_100g?: number;
        salt_100g?: number;
    };
}

interface PageProps {
    error?: string;
    termino?: string;
    resultados?: { products: Producto[] };
    [key: string]: any; // Para inertia
}

export default function OFF_buscar_resultados() {
    const { props } = usePage<PageProps>();
    const productos = props.resultados?.products || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buscador (Resultados)" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">
                    Resultados de: <b>{props.termino}</b>
                </p>
                <div className="gap-8 pt-8">
                    <Button className="cursor-pointer" variant="secondary" onClick={() => router.visit('offbuscar')}>
                        ← Volver
                    </Button>
                </div>

                {props.error ? (
                    <p className="text-red-500">{props.error}</p>
                ) : productos.length === 0 ? (
                    <p>No se encontraron productos.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {productos.map((p, index) => (
                            <div
                                key={index}
                                className="hover:shadow-primary hover:ring-primary/60 transform-gpu rounded-xl border p-4 shadow-lg transition-all duration-500 [perspective:600px] hover:[transform:scale(1.05)] hover:shadow-[0_0_30px_8px] hover:ring-2 cursor-pointer active:ring active:ring-offset-2 active:ring-primary/60 active:shadow-primary"
                            >
                                <div className="text-center">
                                    {p.image_url ? (
                                        <img
                                            src={p.image_url}
                                            alt={p.product_name}
                                            className="h-40 w-full transform rounded-xl object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                                        />
                                    ) : (
                                        <img src={'/img/no-image-600x600.jpg'} alt={p.product_name} className="h-40 w-full rounded-xl object-cover" />
                                    )}
                                </div>
                                <div className="mt-2 text-center transition-transform duration-700 ease-in-out hover:scale-105">
                                    <strong className="block text-lg font-semibold text-gray-800 hover:text-blue-600 dark:text-white">
                                        {p.product_name || 'Nombre desconocido'}
                                    </strong>
                                    <small className="text-gray-500 dark:text-gray-400">{p.brands || 'Marca desconocida'}</small>
                                </div>

                                {p.nutriments && (
                                    <table className="mt-2 w-full overflow-hidden rounded-xl border border-gray-300 text-sm transition-transform duration-700 ease-in-out hover:scale-105">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border border-gray-200 bg-gray-100 px-2 py-1 text-left dark:text-gray-800">
                                                    Nutriente
                                                </th>
                                                <th className="border border-gray-300 px-2 py-1 dark:text-gray-800">Por 100g</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries({
                                                'energy-kcal_100g': 'Energía (kcal)',
                                                fat_100g: 'Grasas (g)',
                                                'saturated-fat_100g': 'Grasas Saturadas (g)',
                                                carbohydrates_100g: 'Carbohidratos (g)',
                                                sugars_100g: 'Azúcares (g)',
                                                fiber_100g: 'Fibra (g)',
                                                proteins_100g: 'Proteínas (g)',
                                                salt_100g: 'Sal (g)',
                                            }).map(([key, label]) =>
                                                p.nutriments?.[key as keyof Producto['nutriments']] !== undefined ? (
                                                    <tr key={key}>
                                                        <td className="border border-gray-200 px-2 py-1">{label}</td>
                                                        <td className="border border-gray-300 px-2 py-1">
                                                            {p.nutriments[key as keyof Producto['nutriments']]}
                                                        </td>
                                                    </tr>
                                                ) : null,
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
