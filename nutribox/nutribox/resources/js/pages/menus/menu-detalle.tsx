import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { ProductoTipo, columnsProductos } from './columnsProductos';
import { DataTable } from './data-table';

type ComidaConTotales = {
    id: number;
    grupo: string;
    info_extra: string;
    kcal: number;
    gr: number;
    ch: number;
    pr: number;
    productos: ProductoTipo[]; // Asegúrate de que ProductoTipo esté definido correctamente
};

type Menu = {
    id: number;
    fecha: string;
    nombre: string;
    info_extra?: string;
    comidas: ComidaConTotales[];
};

type Props = {
    menuSeleccionado: Menu;
    totalesComidas: ComidaConTotales[]; // Definir el tipo como un array de ComidaConTotales
};

export default function VerDetalles({ menuSeleccionado, totalesComidas }: Props) {
    const calcularTotalesMenu = () => {
        return totalesComidas.reduce(
            (totales, comida) => {
                totales.kcal += comida.kcal;
                totales.gr += comida.gr;
                totales.ch += comida.ch;
                totales.pr += comida.pr;
                return totales;
            },
            { kcal: 0, gr: 0, ch: 0, pr: 0 },
        );
    };

    const totalesMenu = calcularTotalesMenu();

    // Revisar para que aparezca el toast ok?
    const handleEliminar = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este menú?')) {
            router.delete(`/menus/${id}`, {
                onSuccess: () => {
                    toast.success('Menú eliminado correctamente');
                    setTimeout(() => {
                        router.visit('/menuslistar');
                    }, 1500);
                },
                onError: () => {
                    toast.error('El menú no se pudo eliminar');
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head /*title={`Menú del ${menuSeleccionado.fecha}`}*/ />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl">
                        <small>Menú:</small> <span className="uppercase">{menuSeleccionado.nombre}</span>
                    </h1>
                    <Button className="cursor-pointer" variant="destructive" onClick={() => handleEliminar(menuSeleccionado.id)}>
                        Eliminar
                    </Button>
                </div>

                <p className="-mt-6 mb-0 pl-0">
                    Energía {totalesMenu.kcal}kcal &nbsp;&nbsp;|&nbsp;&nbsp; Grasas {totalesMenu.gr}g &nbsp;&nbsp;|&nbsp;&nbsp; Hidratos de Carbono{' '}
                    {totalesMenu.ch}g &nbsp;&nbsp;|&nbsp;&nbsp; Proteínas {totalesMenu.pr}g
                </p>
                <p className="-mt-6 text-gray-600">Fecha: {menuSeleccionado.fecha}</p>
                {menuSeleccionado.info_extra && <p className="-mt-6 italic">{menuSeleccionado.info_extra}</p>}

                {totalesComidas.map((comida) => (
                    <div
                        key={comida.id}
                        className="hover:shadow-primary hover:ring-primary/60 mb-8 rounded rounded-xl border p-4 px-4 py-2 transition-all duration-600 hover:shadow-[0_0_20px_4px] hover:ring-2"
                    >
                        <h2>
                            <span className="bg-secondary rounded-xl pr-4 pl-4 text-2xl font-bold capitalize uppercase">{comida.grupo}</span>{' '}
                            <p className="mt-2 mb-1 pl-4">
                                Energía {comida.kcal}kcal &nbsp;&nbsp;|&nbsp;&nbsp; Grasas {comida.gr}g &nbsp;&nbsp;|&nbsp;&nbsp; Hidratos de Carbono{' '}
                                {comida.ch}g &nbsp;&nbsp;|&nbsp;&nbsp; Proteínas {comida.pr}g
                            </p>
                        </h2>
                        <p className="mb-4 pl-4 text-gray-600 italic">
                            {/*Información adicional: */}
                            {comida.info_extra}
                        </p>
                        {/* Mostrar los totales calculados */}

                        <DataTable columns={columnsProductos} data={comida.productos} />
                    </div>
                ))}
            </div>
            <div className="gap-8 p-8">
                <Button className="cursor-pointer" variant="secondary" onClick={() => router.visit('/menuslistar')}>
                    ← Volver
                </Button>
            </div>
        </AppLayout>
    );
}
