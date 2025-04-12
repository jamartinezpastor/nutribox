
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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
        "energy-kcal_100g"?: number;
        "fat_100g"?: number;
        "saturated-fat_100g"?: number;
        "carbohydrates_100g"?: number;
        "sugars_100g"?: number;
        "fiber_100g"?: number;
        "proteins_100g"?: number;
        "salt_100g"?: number;
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
            <Head title="Resultados búsqueda" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Resultados de la búsqueda de: <b>{props.termino}</b></p>

                {props.error ? (
                    <p className="text-red-500">{props.error}</p>
                ) : productos.length === 0 ? (
                    <p>No se encontraron productos.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productos.map((p, index) => (
                            <div
                                key={index}
                                className="border p-4 rounded-lg shadow-lg transition-transform duration-700 ease-in-out transform hover:scale-103 hover:shadow-xl"
                            >
                                <div className="text-center">
                                    {p.image_url ? (
                                        <img
                                            src={p.image_url}
                                            alt={p.product_name}
                                            className="w-full h-40 object-cover  transition-transform duration-700 ease-in-out transform hover:scale-110"
                                        />
                                    ) : (
                                        <img
                                            src={'\\img\\no-image-600x600.jpg'}
                                            alt={p.product_name}
                                            className="w-full h-40 object-cover"
                                        />

                                    )}
                                </div>
                                <div className="mt-2 text-center">
                                    <strong className="block text-lg font-semibold text-gray-800 hover:text-blue-600 dark:text-white">
                                        {p.product_name || "Nombre desconocido"}
                                    </strong>
                                    <small className="text-gray-500 dark:text-gray-400">
                                        {p.brands || "Marca desconocida"}
                                    </small>
                                </div>


                                {p.nutriments && (
                                    <table className="mt-2 w-full border-collapse border border-gray-300 text-sm">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border border-gray-300 px-2 py-1 dark:text-gray-800">Nutriente</th>
                                                <th className="border border-gray-300 px-2 py-1 dark:text-gray-800">Por 100g</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries({
                                                "energy-kcal_100g": "Energía (kcal)",
                                                "fat_100g": "Grasas (g)",
                                                "saturated-fat_100g": "Grasas Saturadas (g)",
                                                "carbohydrates_100g": "Carbohidratos (g)",
                                                "sugars_100g": "Azúcares (g)",
                                                "fiber_100g": "Fibra (g)",
                                                "proteins_100g": "Proteínas (g)",
                                                "salt_100g": "Sal (g)",
                                            }).map(([key, label]) =>
                                                p.nutriments?.[key as keyof Producto["nutriments"]] !== undefined ? (
                                                    <tr key={key}>
                                                        <td className="border border-gray-300 px-2 py-1">{label}</td>
                                                        <td className="border border-gray-300 px-2 py-1">
                                                            {p.nutriments[key as keyof Producto["nutriments"]]}
                                                        </td>
                                                    </tr>
                                                ) : null
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
