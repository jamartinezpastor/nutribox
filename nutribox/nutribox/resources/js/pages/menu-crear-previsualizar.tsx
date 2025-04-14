import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ProductoTipo, columnsProductos } from './menus/columnsProductos';
import { DataTable } from './menus/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evaluar alimentos',
        href: '/inicio',
    },
];
interface PageProps {
    error?: string;
    menu: Menu;
    // aqui el resto
    [key: string]: any; // Para inertia
}

type Comida = {
    // id: number
    grupo: string;
    // info_extra: string
    productos: ProductoTipo[];
};

type Menu = {
    //  id: number
    fecha: string;
    nombre: string;
    info_extra?: string;
    comidas: Comida[];
};
const handleGuardarMenu = () => {
    /* router.post('/menucrearacontroller', {
        objetivo,
        numComidas,
  
    }); 
    */
};

export default function DS_MenuCrear_Previsualizar() {
    const { props } = usePage<PageProps>();
    console.log(props);
    return (
        <AppLayout>
            <Head /*title={`Menú del ${props.menu.fecha}`} */ />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-4xl">
                    <small>Menú:</small> {props.menu.nombre}{' '}
                    <Button className="cursor-pointer" type="button" onClick={handleGuardarMenu}>
                        Guardar Menú
                    </Button>
                </h1>
                <p className="text-gray-600">Fecha: {props.menu.fecha}</p>
                {props.menu.info_extra && <p className="italic">{props.menu.info_extra}</p>}

                {props.menu.comidas.map((comida, indiceManual) => (
                    <div key={indiceManual} className="rounded-xl border p-4">
                        <h2 className="mb-4 text-2xl capitalize">{comida.grupo}</h2>
                        <DataTable columns={columnsProductos} data={comida.productos} />
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
