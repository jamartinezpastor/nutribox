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

export default function Dashboard() {
    const [termino, setTermino] = useState("");

    const handleSubmit = () => {
      if (termino.trim()) {
        router.visit(`/next-page`, { method: "get", data: { termino } });
      }
    };
    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Base de datos de alimentos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">1 / 2 <br />BASE DE DATOS DE ALIMENTOS. <br />OPEN FACT FOODS</p>
                <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Producto"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
      />
      <Button type="button" onClick={handleSubmit}>
        Buscar
      </Button>
    </div>




            </div>

        </AppLayout>
    );
}
