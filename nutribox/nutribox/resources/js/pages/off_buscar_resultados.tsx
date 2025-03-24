import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { usePage } from "@inertiajs/react";


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
    [key: string]: any; // Para que Inertia acepte la interfaz
}
export default function OFF_buscar_resultados() {

    const { props } = usePage<PageProps>();
    const productos = props.resultados?.products || [];

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resultados búsqueda" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-4xl mb-4">2 / 2. RESULTADOS DE LA BÚSQUEDA</h1>

                {props.error ? (
                    <p className="text-red-500">{props.error}</p>
                ) : productos.length === 0 ? (
                    <p>No se encontraron productos.</p>
                ) : (
                    <ul className="space-y-4">
                        {productos.map((p, index) => (
                            <li key={index} className="border p-4 rounded-lg shadow">
                                <strong>{p.product_name || "Nombre desconocido"}</strong>
                                <br />
                                {p.image_url && <img src={p.image_url} alt={p.product_name} width="100" />}
                                <br />
                                <small>{p.brands || "Marca desconocida"}</small>

                                {p.nutriments ? (
                                    <table className="mt-2 border-collapse border border-gray-300">
                                        <thead>
                                            <tr>
                                                <th className="border border-gray-300 px-2 py-1">Nutriente</th>
                                                <th className="border border-gray-300 px-2 py-1">Cantidad por 100g</th>
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
                                ) : (
                                    <p>No se encontraron datos nutricionales.</p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AppLayout>
    );
}
