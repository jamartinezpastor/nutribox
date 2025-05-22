import AlimentoInteractivo from '@/components/AlimentoInteractivo';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import React, { useCallback, useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Base de datos de alimentos',
        href: '/inicio',
    },
];

const carouselImages = [
    {
        imagen: '/img/loading/1lombarda.gif',
        consejo: 'La lombarda hervida conserva antocianinas que mejoran tu flora intestinal y reducen la inflamación.',
    },
    {
        imagen: '/img/loading/1cebolla.gif',
        consejo: 'La cebolla cruda libera quercetina al reaccionar con sus enzimas, actuando como un potente antiinflamatorio natural.',
    },
    {
        imagen: '/img/loading/1queso.gif',
        consejo: 'El queso madurado aporta péptidos bioactivos que favorecen la digestión y estimulan tu sistema inmunitario.',
    },
];

export default function OFF_buscar() {
    const [termino, setTermino] = useState('');
    const isValido = termino.trim().length > 0;
    const [isTrabajando, setIsTrabajando] = useState(false);
    const autoplay = useRef(Autoplay({ delay: 7000, stopOnInteraction: false }));
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputRect, setInputRect] = useState<DOMRect | null>(null);

    // Refresca el rectágunlo del input al renderizar
    const updateInputRect = useCallback(() => {
        if (inputRef.current) {
            setInputRect(inputRef.current.getBoundingClientRect());
        }
    }, []);
    // Cuando se suelta el alimento sobre el input (Parecida a handleBuscar, pero aqui actualiza el termino con el nombre del alimento)
    const handleDropAlimento = (nombre: string) => {
        setTermino(nombre);
        setTimeout(() => {
            setIsTrabajando(true);
            router.get('/offbuscaracontroller', { termino: nombre });
        }, 0);
    };

    // Al montar/actualizar, actualiza el rect del input
    React.useEffect(() => {
        updateInputRect();
        window.addEventListener('resize', updateInputRect);
        return () => window.removeEventListener('resize', updateInputRect);
    }, [updateInputRect]);

    const handleBuscar = () => {
        if (!isValido) return;
        setIsTrabajando(true);
        router.get('/offbuscaracontroller', { termino });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buscador Información Nutricional" />
            <div className="relative flex h-full flex-1 flex-col gap-4 rounded-xl p-4" id="contenedor">
                <p className="text-4xl">Buscador Información Nutricional</p>
                <p className="text-muted-foreground text-sm">
                    Introduzca un alimento o producto, y realice una búsqueda en nuestra base de datos para obtener los resultados encontrados junto
                    con su información nutricional.
                </p>
                <Separator className="my-4" />

                {isTrabajando && (
                    <div className="mx-auto w-full max-w-xl">
                        <Carousel plugins={[autoplay.current]} className="w-full">
                            <CarouselContent className="h-[30vh] w-full">
                                {carouselImages.map(({ imagen, consejo }, idx) => (
                                    <CarouselItem key={idx} className="basis-full">
                                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                                            <img src={imagen} alt="Cargando..." className="h-full w-full object-cover" />
                                            <div className="bg-background/60 absolute right-4 bottom-4 left-4 rounded-xl px-4 py-2">
                                                <span className="text-foreground">{consejo}</span>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )}

                <div className="relative z-10 mx-auto flex max-w-xl flex-col space-y-4">
                    {isTrabajando || (
                        <div>
                            <Label htmlFor="termino">Alimento o producto:</Label>
                            <Input
                                id="termino"
                                type="text"
                                placeholder="Garbanzos, kiwi, etc..."
                                value={termino}
                                onChange={(e) => setTermino(e.target.value)}
                                ref={inputRef}
                                required
                                autoComplete="off"
                                onFocus={updateInputRect}
                                onMouseMove={updateInputRect}
                            />
                            <AlimentoInteractivo
                                nombre="zanahoria"
                                imgUrl="https://cdn-icons-png.flaticon.com/512/10847/10847795.png"
                                inputRect={inputRect}
                                onDropInInput={handleDropAlimento}
                                initialPosition={{ top: 460, left: 300 }}
                            />
                            <AlimentoInteractivo
                                nombre="manzana"
                                imgUrl="https://cdn-icons-png.flaticon.com/512/415/415733.png"
                                inputRect={inputRect}
                                onDropInInput={handleDropAlimento}
                                initialPosition={{ top: 525, left: 600 }}
                            />
                            <AlimentoInteractivo
                                nombre="salmon"
                                imgUrl="https://cdn-icons-png.flaticon.com/512/1915/1915297.png"
                                inputRect={inputRect}
                                onDropInInput={handleDropAlimento}
                                initialPosition={{ top: 422, left: 900 }}
                            />
                            <AlimentoInteractivo
                                nombre="yogurt"
                                imgUrl="https://cdn-icons-png.flaticon.com/512/2592/2592664.png"
                                inputRect={inputRect}
                                onDropInInput={handleDropAlimento}
                                initialPosition={{ top: 480, left: 1200 }}
                            />
                        </div>
                    )}

                    <div className="gap-8 pt-2">
                        <Button
                            type="button"
                            onClick={handleBuscar}
                            disabled={!isValido || isTrabajando}
                            className={`w-full cursor-pointer ${!isValido || isTrabajando ? 'cursor-not-allowed font-bold tracking-wide uppercase opacity-50' : ''}`}
                        >
                            {isTrabajando ? 'Buscando...' : 'Buscar'}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
