import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';

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

    const handleBuscar = () => {
        if (!isValido) return;
        setIsTrabajando(true);
        router.get('/offbuscaracontroller', { termino });
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

                <div className="mx-auto flex max-w-xl flex-col space-y-4">
                    <div>
                        {isTrabajando || (
                            <div>
                                <Label htmlFor="termino">Alimento o producto:</Label>
                                <Input
                                    id="termino"
                                    type="text"
                                    placeholder="Yogurt, kiwi, etc..."
                                    value={termino}
                                    onChange={(e) => setTermino(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </div>
                    <div className="gap-8 pt-2">
                        <Button
                            type="button"
                            onClick={handleBuscar}
                            disabled={!isValido || isTrabajando}
                            className={`w-full cursor-pointer ${!isValido || isTrabajando ? 'uppercase font-bold tracking-wide cursor-not-allowed opacity-50' : ''}`}
                        >
                            {isTrabajando ? 'Buscando...' : 'Buscar'}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
