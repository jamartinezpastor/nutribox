import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { ProductoTipo, columnsProductos } from './menus/columnsProductos';
import { DataTable } from './menus/data-table';
import { ArrowUpToLine, BicepsFlexed, ChevronsUp, CookingPot, PersonStanding, UserCheck, UserMinus } from 'lucide-react';

const iconosPorTipo = {
    UserMinus: <UserMinus />,
    UserCheck: <UserCheck />,
    BicepsFlexed: <BicepsFlexed />,
    ArrowUpToLine: <ArrowUpToLine />,
    ChevronsUp: <ChevronsUp />,
    PersonStanding: <PersonStanding />,
    CookingPot: <CookingPot />,
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evaluar alimentos',
        href: '/inicio',
    },
];
interface PageProps {
    tipo: string;
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
    tipo?: string;
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
            },
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
                <div className="flex items-center justify-between">
                    <h1 className="flex items-center gap-2 text-4xl">
                        <small>Menú:</small>
                        <span className="uppercase">{props.menu.nombre}</span>
                        <span>{iconosPorTipo[props.menu.tipo as keyof typeof iconosPorTipo] ?? <CookingPot />}</span>
                    </h1>

                    <Button className="cursor-pointer" type="button" onClick={handleGuardarMenu}>
                        Guardar Menú
                    </Button>
                </div>

                <Separator className="my-4" />
                <p className="text-gray-600">Fecha: {props.menu.fecha}</p>
                {props.menu.info_extra && <p className="italic">{props.menu.info_extra}</p>}

                {props.menu.comidas.map((comida: Comida, indiceManual: number) => (
                    <div
                        key={indiceManual}
                        className="hover:shadow-primary-foreground hover:ring-primary-foreground/60 mb-8 rounded rounded-xl border p-4 px-4 py-2 transition-all duration-600 hover:shadow-[0_0_20px_8px] hover:ring-4"
                    >
                        <h2>
                            <span className="bg-secondary rounded-xl pr-4 pl-4 text-2xl font-bold capitalize uppercase">{comida.grupo}</span>
                        </h2>
                        <p className="mb-4 pl-4 text-gray-600 italic">
                            {/*Información adicional: */}
                            {comida.info_extra}
                        </p>
                        <DataTable columns={columnsProductos} data={comida.productos} />
                    </div>
                ))}
                <div className="gap-8 pt-8">
                    <Button className="cursor-pointer" variant="secondary" onClick={() => router.visit('menucrear')}>
                        ← Volver
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
