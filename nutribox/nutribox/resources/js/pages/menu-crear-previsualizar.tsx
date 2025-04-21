import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ProductoTipo, columnsProductos } from './menus/columnsProductos';
import { DataTable } from './menus/data-table';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evaluar alimentos',
        href: '/inicio',
    },
];
interface PageProps {
    nombre: string;
    infoExtra: string;
    menu: Menu;
    error?: string;
    [key: string]: any; // Para inertia
}

type Comida = {
    // id: number
    grupo: string;
    info_extra: string;
    productos: ProductoTipo[];
};

type Menu = {
    //  id: number
    error?: string;
    nombre: string;
    info_extra?: string;
    fecha: string;
    comidas: Comida[];
};


export default function DS_MenuCrear_Previsualizar() {
    const { props } = usePage<PageProps>();
    console.log(props);

    const handleGuardarMenu = () => {
        // Mostramos el toast inmediatamente
        toast.success('Guardando el menú...');
    
        router.post(
            '/menus/guardar',
            { menu: props.menu },
            {
                onSuccess: () => {
                    toast.success('Menú guardado correctamente');
                    setTimeout(() => {
                        router.visit('/menuslistar');
                    }, 3000);
                },
                onError: () => {
                    toast.error('Hubo un error al guardar el menú');
                },
            }
        );
    };
    

    // Mensaje de error
    if (!props.menu || props.menu.error) {
        return (
            <AppLayout>
                <div className="p-4">
                    <h1 className="text-xl font-bold">No se pudo generar el menú</h1>
                    <p className="text-red-500">{props.error ?? 'Error desconocido'}</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head /*title={`Menú del ${props.menu.fecha}`} */ />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-4xl">
                    <small>Menú:</small> {props.menu.nombre}{' '}
                    <Button className="cursor-pointer" type="button" onClick={handleGuardarMenu}>
                        Guardar Menú
                    </Button>
                    <Button onClick={() => toast.success('Funciona el toast')}>Probar Toast</Button>

                </h1>
                <Separator className="my-4" />
                <p className="text-gray-600">Fecha: {props.menu.fecha}</p>
                {props.menu.info_extra && <p className="italic">{props.menu.info_extra}</p>}

                {props.menu.comidas.map((comida: Comida, indiceManual: number) => (
                    <div
                        key={indiceManual}
                        className="hover:shadow-primary-foreground hover:ring-primary-foreground/60 rounded rounded-xl border p-4 px-4 py-2 transition-all duration-600 hover:shadow-[0_0_20px_8px] hover:ring-4"
                    >
                        <h2 className="bg-secondary dark:bg-card text-foreground mb-4 rounded-md px-4 py-2 text-2xl tracking-wide capitalize">
                            {comida.grupo}
                        </h2>
                        <DataTable columns={columnsProductos} data={comida.productos} />
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
