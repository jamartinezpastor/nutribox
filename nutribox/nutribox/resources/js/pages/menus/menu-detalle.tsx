import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ProductoTipo, columnsProductos } from './columnsProductos';
import { DataTable } from './data-table';

type Comida = {
    id: number
    grupo: string
    info_extra: string
    productos: ProductoTipo[]
};

type Menu = {
    id: number    
    fecha: string
    nombre: string
    info_extra?: string
    comidas: Comida[]
};

type Props = {
    menuSeleccionado: Menu;
};

export default function VerDetalles({ menuSeleccionado }: Props) {
    return (
        <AppLayout>
            <Head /*title={`Menú del ${menuSeleccionado.fecha}`} */ />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-4xl"><small>Menú:</small>  {menuSeleccionado.nombre}</h1>
                <p className="text-gray-600">Fecha: {menuSeleccionado.fecha}</p>
                {menuSeleccionado.info_extra && <p className="italic">{menuSeleccionado.info_extra}</p>}

                {menuSeleccionado.comidas.map((comida) => (
                    <div key={comida.id} className="rounded-xl border p-4">
                        <h2 className="mb-4 text-2xl capitalize">{comida.grupo}</h2>
                        <DataTable columns={columnsProductos} data={comida.productos} />
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
