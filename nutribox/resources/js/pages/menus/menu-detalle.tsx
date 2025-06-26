import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { toast } from 'sonner';
import { ProductoTipo, columnsProductos } from './columnsProductos';
import { DataTable } from './data-table';
import { getIconoPorTipo } from './iconosMenu';
import { getIconoPorTipo2 } from './iconosMenu2';

ChartJS.register(ArcElement, Tooltip, Legend);

type ComidaConTotales = {
    id: number;
    grupo: string;
    info_extra: string;
    kcal: number;
    gr: number;
    ch: number;
    pr: number;
    productos: ProductoTipo[]; 
};

type Menu = {
    id: number;
    fecha: string;
    tipo: string;
    nombre: string;
    info_extra?: string;
    comidas: ComidaConTotales[];
};

type Props = {
    menuSeleccionado: Menu;
    totalesComidas: ComidaConTotales[]; // Array de ComidaConTotales
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

    // useState para nombre e info_extra
    const [nombre, setNombre] = useState(menuSeleccionado.nombre);
    const [editando, setEditando] = useState(false);
    const [infoExtra, setInfoExtra] = useState(menuSeleccionado.info_extra || '');
    const [editandoInfoExtra, setEditandoInfoExtra] = useState(false);

    const handleActualizarNombre = () => {
        if (nombre.trim() === '') {
            toast.error('El nombre no puede estar vacío');
            return;
        }

        router.put(
            `/menus/${menuSeleccionado.id}`,
            { nombre },
            {
                onSuccess: () => {
                    toast.success('Nombre actualizado correctamente');
                    setEditando(false); // Salir del modo edición
                },
                onError: () => {
                    toast.error('No se pudo actualizar el nombre');
                },
            },
        );
    };

    const handleActualizarInfoExtra = () => {
        router.put(
            `/menus/${menuSeleccionado.id}`,
            { info_extra: infoExtra },
            {
                onSuccess: () => {
                    toast.success('Información adicional actualizada correctamente');
                    setEditandoInfoExtra(false);
                },
                onError: () => {
                    toast.error('No se pudo actualizar la información adicional');
                },
            },
        );
    };

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

    const graficaTotales = {
        labels: ['Grasas', 'Hidratos de Carbono', 'Proteína'],
        datasets: [
            {
                label: ' Gramos',
                data: [Math.round(totalesMenu.gr), Math.round(totalesMenu.ch), Math.round(totalesMenu.pr)],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 3,
                hoverOffset: 19,
                offset: 13,
            },
        ],
    };
    const graficaOpciones = {
        plugins: {
            legend: {
                display: false,
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    };

    return (
        <AppLayout>
            <Head /*title={`Menú del ${menuSeleccionado.fecha}`}*/ />

            <div className="relative flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                {/* Fondo */}
                <div className="pointer-events-none absolute top-0 right-0 z-[0] h-[100vh] w-[100vw] opacity-100">
                    {getIconoPorTipo2(menuSeleccionado.tipo)}
                </div>
                {/* Modificacion nombre + Botón Eliminar menú */}
                {/* Disparador de la función al salir del input con onBlur o la tecla Enter */}

                {editando ? (
                    <input
                        className="w-full rounded border px-2 py-1 text-3xl uppercase"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        autoFocus
                        onBlur={handleActualizarNombre}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleActualizarNombre();
                        }}
                    />
                ) : (
                    <div className="group relative">
                        <h1 className="cursor-pointer text-4xl hover:underline" onClick={() => setEditando(true)}>
                            <div className="flex items-center gap-2">
                                {getIconoPorTipo(menuSeleccionado.tipo)} <small>Menú:</small>
                            </div>{' '}
                            <span className="uppercase">{nombre}</span>
                        </h1>
                        {/* Tooltip */}
                        <span className="bg-muted-foreground absolute top-full left-0 mt-2 hidden w-max rounded px-2 py-1 text-xs text-white group-hover:block">
                            Haz click aquí para renombrar el menú
                        </span>
                    </div>
                )}

                    <div className="-mt-6 mb-0 pl-0  h-[150px] w-[150px]">
                        <Pie data={graficaTotales} options={graficaOpciones} />
                    </div>
                <p className="-mt-6 mb-0 pl-0">
                    Energía {Math.round(totalesMenu.kcal)} kcal {/*  &nbsp;&nbsp;|&nbsp;&nbsp; Grasas {Math.round(totalesMenu.gr)} g
                    &nbsp;&nbsp;|&nbsp;&nbsp; Hidratos de Carbono {Math.round(totalesMenu.ch)} g &nbsp;&nbsp;|&nbsp;&nbsp; Proteínas{' '}
                    {Math.round(totalesMenu.pr)} g */}
                </p>

                <p className="-mt-6 text-gray-600">Fecha: {menuSeleccionado.fecha}</p>
              
            
                {/* Modificación info_extra */}
                <div className="-mt-6">
                    {editandoInfoExtra ? (
                        <textarea
                            className="mt-2 w-full rounded border px-2 py-1 italic"
                            value={infoExtra}
                            onChange={(e) => setInfoExtra(e.target.value)}
                            autoFocus
                            onBlur={handleActualizarInfoExtra}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault(); // evitar salto de línea
                                    handleActualizarInfoExtra();
                                }
                            }}
                        />
                    ) : menuSeleccionado.info_extra ? (
                        <div className="group relative mt-2">
                            <p className="cursor-pointer pl-0 text-gray-600 italic hover:underline" onClick={() => setEditandoInfoExtra(true)}>
                                {infoExtra}
                            </p>
                            {/* Tooltip */}
                            <span className="bg-muted-foreground absolute top-full left-0 mt-2 hidden w-max rounded px-2 py-1 text-xs text-white group-hover:block">
                                Haz click aquí para editar la información adicional
                            </span>
                        </div>
                    ) : (
                        <div className="group relative mt-2">
                            <p className="cursor-pointer pl-0 text-gray-600 italic hover:underline" onClick={() => setEditandoInfoExtra(true)}>
                                Sin información adicional
                            </p>
                            {/* Tooltip */}
                            <span className="bg-muted-foreground absolute top-full left-0 mt-2 hidden w-max rounded px-2 py-1 text-xs text-white group-hover:block">
                                Haz click aquí para añadir información adicional
                            </span>
                        </div>
                    )}
                </div>

                {/* Mostrar los totales calculados del menu */}
                {totalesComidas.map((comida) => (
                    <div
                        key={comida.id}
                        className="hover:shadow-primary hover:ring-primary/60 mb-8 rounded rounded-xl border p-4 px-4 py-2 transition-all duration-600 hover:shadow-[0_0_20px_4px] hover:ring-2"
                    >
                        <h2>
                            <span className="bg-secondary rounded-xl pr-4 pl-4 text-2xl font-bold capitalize uppercase">{comida.grupo}</span>{' '}
                            <p className="mt-2 mb-1 pl-4">
                                Energía {Math.round(comida.kcal)} kcal &nbsp;&nbsp;|&nbsp;&nbsp; Grasas {Math.round(comida.gr)} g
                                &nbsp;&nbsp;|&nbsp;&nbsp; Hidratos de Carbono {Math.round(comida.ch)} g &nbsp;&nbsp;|&nbsp;&nbsp; Proteínas{' '}
                                {Math.round(comida.pr)} g
                            </p>
                        </h2>
                        <p className="mb-4 pl-4 text-gray-600 italic">
                            {/*Información adicional: */}
                            {comida.info_extra}
                        </p>

                        <DataTable columns={columnsProductos} data={comida.productos} />
                    </div>
                ))}
            </div>

            <div className="flex justify-between gap-8 p-8">
                <Button className="cursor-pointer" variant="secondary" onClick={() => router.visit('/menuslistar')}>
                    ← Volver
                </Button>
                <Button className="cursor-pointer" variant="destructive" onClick={() => handleEliminar(menuSeleccionado.id)}>
                    Eliminar
                </Button>
            </div>
        </AppLayout>
    );
}
