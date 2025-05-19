// components/ProductCard.tsx
import { router } from '@inertiajs/react';
import React from 'react';
import { NutrimentTable } from './NutrimentTable';

interface Producto {
    code?: string;
    product_name?: string;
    image_url?: string;
    brands?: string;
    nutriments?: {
        [key: string]: number | undefined;
    };
}

export const ProductCard: React.FC<{ product: Producto }> = React.memo(({ product }) => {
    const { code, product_name, image_url, brands, nutriments } = product;

    return (
        <div
            className="group hover:ring-primary/60 transform-gpu cursor-pointer rounded-xl border p-4 shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl hover:ring-2"
            onClick={() => code && router.visit(`/productos/${code}`)}
        >
            <div className="text-center">
                <img
                    src={image_url ?? '/img/no-image-600x600.jpg'}
                    alt={product_name ?? 'Producto sin nombre'}
                    className="h-40 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="mt-2 text-center transition-transform duration-300 group-hover:scale-105">
                <strong className="block text-lg font-semibold text-gray-800 group-hover:text-blue-600 dark:text-white">
                    {product_name ?? 'Nombre desconocido'}
                </strong>
                <small className="text-gray-500 dark:text-gray-400">{brands ?? 'Marca desconocida'}</small>
            </div>
            {nutriments && <NutrimentTable nutriments={nutriments} />}
        </div>
    );
});
