import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Base de datos de alimentos',
        href: '/inicio',
    },

];

export default function OFF_buscar() {
    const [termino, setTermino] = useState("");

    const handleSearch = () => {
        if (termino.trim()) {
            router.get("/off_buscar_a_controller", { termino });
        }
    };

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Base de datos de alimentos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Buscar un producto en nuestra Base de datos</p>
                <p className="text-sm text-muted-foreground">
                    Introduzca un alimento o producto, y realice una búsqueda en nuestra base de datos <br />para obtener los resultados encontrados junto con su información nutricional.    </p>
                <Separator className="my-4" />
                {/* Flex, columna de arriba a abajo, 4 unidades de separación,
                 max-w-sm limita el ancho, mx-auto margen automatico a ambos lados.. centra horizontal */}
                <div className="flex flex-col space-y-4 max-w-md mx-auto">
                    <div>
                        <Label htmlFor="termino">Alimento o producto:</Label>
                        <Input
                            id="termino"
                            type="text"
                            placeholder="Alimento / Producto"
                            value={termino}
                            onChange={(e) => setTermino(e.target.value)}
                        />
                    </div>
                    <Button className='cursor-pointer' type="button" onClick={handleSearch}>
                        Buscar
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
