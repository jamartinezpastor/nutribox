import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Base de datos de alimentos',
        href: '/inicio',
    },
];

export default function OFF_buscar() {
    const [termino, setTermino] = useState('');

    const handleSearch = () => {
        if (termino.trim()) {
            router.get('/offbuscaracontroller', { termino });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buscador Información Nutricional" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Buscador Información Nutricional</p>
                <p className="text-muted-foreground text-sm">
                    Introduzca un alimento o producto, y realice una búsqueda en nuestra base de datos para obtener los resultados encontrados junto
                    con su información nutricional.
                </p>
                <Separator className="my-4" />
                {/* Flex, columna de arriba a abajo, 4 unidades de separación,
                 max-w-sm limita el ancho, mx-auto margen automatico a ambos lados.. centra horizontal */}
                <div className="mx-auto flex max-w-xl flex-col space-y-4">
                    <div>
                        <Label htmlFor="termino">Alimento o producto:</Label>
                        <Input
                            autoFocus
                            id="termino"
                            type="text"
                            placeholder="Yogurt, kiwi, etc..."
                            value={termino}
                            onChange={(e) => setTermino(e.target.value)}
                        />
                    </div>
                    <div className="gap-8 pt-2">
                        <Button className="cursor-pointer" type="button" onClick={handleSearch}>
                            Buscar
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
