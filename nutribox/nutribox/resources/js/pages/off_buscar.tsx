import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
                <p className="text-4xl">1 / 2 <br />PETICIÓN A LA API OFF</p>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Alimento / Producto"
                        value={termino}
                        onChange={(e) => setTermino(e.target.value)}
                    />
                    <Button type="button" onClick={handleSearch}>
                        Buscar
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
