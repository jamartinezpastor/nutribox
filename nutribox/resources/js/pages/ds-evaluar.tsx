import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evaluar alimento',
        href: '/inicio',
    },
];

const carouselImages = [
    {
        imagen: '/img/loading/2frutas.gif',
        consejo: 'Comer fruta con piel, como manzanas o peras, añade fibra y flavonoides que regulan de forma natural tus niveles de glucosa.',
    },
    {
        imagen: '/img/loading/2cocinaasiatica.gif',
        consejo: 'Los fermentados de la cocina asiática, como el miso o el kimchi, introducen probióticos que refuerzan tu salud digestiva.',
    },
    {
        imagen: '/img/loading/2olivas.gif',
        consejo: 'Las olivas negras curadas concentran oleuropeína, un antioxidante que protege tu sistema cardiovascular.',
    },
];

export default function DS_evaluar() {
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [unidad, setUnidad] = useState('gr');
    const [patologia, setPatologia] = useState('');

    const isValido = producto.trim() !== '' && cantidad.trim() !== '' && unidad.trim() !== '' && patologia.trim() !== '';
    const [isTrabajando, setIsTrabajando] = useState(false);
    const autoplay = useRef(Autoplay({ delay: 7000, stopOnInteraction: false }));

    const handleEvaluar = () => {
        if (!isValido || isTrabajando) return;
        setIsTrabajando(true);
        router.get(
            '/dsevaluaracontroller',
            { producto, cantidad, unidad, patologia },
            {
                onFinish: () => {
                    setIsTrabajando(false);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Evaluador Alimentos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Evaluador Alimento-Patología (IA)</p>
                <p className="text-muted-foreground text-sm">
                    Analice la relación existente entre un alimento o producto, su cantidad y una patología, con el fin de comprender sus
                    interacciones y la evidencia científica que respalda nuestra evaluación.
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
                                                <span className="text-foreground font-semibold">{consejo}</span>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )}

                <div className="mx-auto flex max-w-xl flex-col space-y-4">
                    {isTrabajando || (
                        <div>
                            <div>
                                <Label htmlFor="producto">Alimento o producto:</Label>
                                <Input
                                    id="producto"
                                    type="text"
                                    placeholder="Huevos con jamón, plátano, etc.."
                                    value={producto}
                                    onChange={(e) => setProducto(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex h-full flex-row gap-4 rounded-xl pt-4">
                                <div>
                                    <Label htmlFor="cantidad">Cantidad: </Label>
                                    <Input
                                        id="cantidad"
                                        type="number"
                                        placeholder="Cantidad"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="unidad">Unidad de medida:</Label>
                                    <Select value={unidad} onValueChange={(value) => setUnidad(value)} required>
                                        {/* Asignar `onValueChange` */}
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una unidad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Unidad</SelectLabel>
                                                <SelectItem className="cursor-pointer" value="gr">
                                                    Gramos (g)
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="mg">
                                                    Miligramos (mg)
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="ml">
                                                    Mililitros (ml)
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="piezas">
                                                    Porciones (unidad/pieza)
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="tazas">
                                                    Taza o Vaso
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="cucharadas">
                                                    Cucharadas (tbsp)
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="kcal">
                                                    Kilocalorías (kcal)
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex h-full flex-row gap-4 rounded-xl pt-4">
                                <div>
                                    <Label>Patología:</Label>
                                    <Select onValueChange={(value) => setPatologia(value)} required>
                                        {/* Asignar `onValueChange` */}
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una patología" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Patología</SelectLabel>
                                                <SelectItem className="cursor-pointer" value="Sin patología conocida">
                                                    Sin patología conocida
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Obesidad clase I (Moderada)">
                                                    Obesidad I Moderada <small>(IMC entre 30 y 34.9 kg/m²)</small>
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Obesidad clase II (Severa)">
                                                    Obesidad II Severa <small>(IMC entre 35 y 39.9 kg/m²)</small>
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value=" Obesidad clase III(Mórbida)">
                                                    Obesidad III Mórbida <small>(IMC de 40 kg/m² o superior)</small>
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Hipotiroidismo">
                                                    Hipotiroidismo
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Hipertiroidismo">
                                                    Hipertiroidismo
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Diabetes Tipo 1">
                                                    Diabetes Tipo 1
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Diabetes Tipo 2">
                                                    Diabetes Tipo 2
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Diabetes Gestacional">
                                                    Diabetes Gestacional
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Embarazo">
                                                    Embarazo
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Madre lactante">
                                                    Lactancia
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Hipercolesterolemia">
                                                    Hipercolesterolemia
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Hipertrigliceridemia">
                                                    Hipertrigliceridemia
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Enfermedad celíaca">
                                                    Enfermedad celíaca
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="Enfermedad renal crónica (Con altos niveles de Potasio)"
                                                >
                                                    Enfermedad renal crónica <small>(Con altos niveles de Potasio)</small>
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Enfermedad renal crónica (Estadio 2)">
                                                    Enfermedad renal crónica <small>(Estadio 2)</small>
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Enfermedad renal crónica (Estadio 3)">
                                                    Enfermedad renal crónica <small>(Estadio 3)</small>
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Enfermedad renal crónica (Estadio 4)">
                                                    Enfermedad renal crónica <small>(Estadio 4)</small>
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Enfermedad renal crónica (Estadio 5 - Diálisis)">
                                                    Enfermedad renal crónica <small>(Estadio 5 - Diálisis)</small>
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Síndrome de ovario poliquístico">
                                                    Síndrome de ovario poliquístico
                                                </SelectItem>
                                                <SelectItem className="cursor-pointer" value="Esteatosis hepática no alcohólica (EHNA)">
                                                    Esteatosis hepática no alcohólica <small>(EHNA)</small>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="gap-8 pt-2">
                        <Button
                            type="button"
                            onClick={handleEvaluar}
                            disabled={!isValido || isTrabajando}
                            className={`w-full cursor-pointer ${!isValido || isTrabajando ? 'cursor-not-allowed font-bold tracking-wide uppercase opacity-50' : ''}`}
                        >
                            {isTrabajando ? 'Evaluando…' : 'Evaluar'}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
