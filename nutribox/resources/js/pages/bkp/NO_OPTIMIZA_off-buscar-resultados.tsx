// pages/OFFBuscarResultados.tsx
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Base de datos de alimentos', href: '/inicio' }];

interface Producto {
    code?: string;
    product_name?: string;
    image_url?: string;
    brands?: string;
    nutriments?: { [key: string]: number | undefined };
}

interface PageProps {
    error?: string;
    termino?: string;
    resultados?: { products: Producto[] };
    [key: string]: any;
}

const OFFBuscarResultados: React.FC = () => {
    const { props } = usePage<PageProps>();
    const productos = props.resultados?.products || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resultados búsqueda" />
            <div className="flex flex-col gap-4 p-4">
                <p className="text-4xl">
                    Resultados de: <b>{props.termino}</b>
                </p>
                <Button variant="secondary" onClick={() => router.visit('offbuscar')}>
                    ← Volver
                </Button>
                {props.error ? (
                    <p className="text-red-500">{props.error}</p>
                ) : productos.length === 0 ? (
                    <p>No se encontraron productos.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {productos.map((product) => (
                            <ProductCard key={product.code ?? product.product_name ?? Math.random()} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default OFFBuscarResultados;
