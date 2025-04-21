import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear menú',
        href: '/inicio',
    },
];

interface PageProps {
    error?: string;
    [key: string]: any; // Para inertia
}

export default function DS_MenuCrear() {
    const [objetivo, setObjetivo] = useState('');
    const [numComidas, setNumComidas] = useState<number>(3);
    const [numSnacks, setNumSnacks] = useState<number>(2);
    const [restricciones, setRestricciones] = useState<string[]>([]);
    const [productosAEvitar, setProductosAEvitar] = useState('');
    const [productosAPriorizar, setProductosAPriorizar] = useState('');
    const [tiempoPreparacion, setTiempoPreparacion] = useState<number>(25);
    const [nombre, setNombre] = useState('');
    const [info_extra, setInfoExtra] = useState('');

    const { props } = usePage<PageProps>();

    const handleCrearMenu = () => {
        router.post('/menucrearacontroller', {
            objetivo,
            numComidas,
            numSnacks,
            restricciones,
            productosAEvitar,
            productosAPriorizar,
            tiempoPreparacion,
            nombre,
            info_extra,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Menú" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Crear Menú</p>
                <p className="text-sm text-muted-foreground">
                    Genere menús diarios personalizados mediante inteligencia artificial, adaptados a sus requerimientos nutricionales y preferencias,
                    en base a criterios científicos y evidencia actualizada.
                </p>
                <Separator className="my-4" />
                {props.error && <p className="text-red-500">{props.error}</p>}
                {/* Flex, columna de arriba a abajo, 4 unidades de separación,
                 max-w-sm limita el ancho, mx-auto margen automatico a ambos lados.. centra horizontal */}
                <div className="mx-auto flex max-w-xl flex-col space-y-4">
                    <div className="pt-4">
                        <Label htmlFor="unidad">Objetivo principal:</Label>
                        <Select onValueChange={(value) => setObjetivo(value)} required>
                            {/* Aquí se asigna `onValueChange` */}
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu objetivo principal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>¿Cuál es tu objetivo con esta alimentación?</SelectLabel>
                                    <SelectItem
                                        className="cursor-pointer"
                                        value="disminuir-ingesta-calorica-reduciendo-en-menor-medida-las-proteinas-diarias"
                                    >
                                        Bajar peso
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="mantener-ingesta-calorica">
                                        Mantener peso
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="ganar-masa-muscular">
                                        Ganar masa muscular
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="disminuir-ingesta-carbohidratos-manteniendo-calorias">
                                        Diminuir la ingesta de Carbohidratos <small>(Manteniendo las Calorías diarias)</small>
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="aumentar-ingesta-proteinas-manteniendo-calorias">
                                        Aumentar la ingesta de Proteínas <small>(Manteniendo las Calorías diarias)</small>
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="mejorar-salud-general">
                                        Mejorar salud general
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex max-w-xl gap-8 pt-4">
                        <div>
                            <Label htmlFor="numComidas">
                                Número de comidas al día (<b>{numComidas}</b>):
                            </Label>

                            <Slider
                                className="my-4"
                                id="numComidas"
                                defaultValue={[3]}
                                max={5}
                                min={1}
                                step={1}
                                onValueChange={(value) => setNumComidas(value[0])}
                            />
                        </div>
                        <div>
                            <Label htmlFor="numSnacks">
                                Número de snacks al día (<b>{numSnacks}</b>):
                            </Label>

                            <Slider
                                className="my-4"
                                id="numSnacks"
                                defaultValue={[2]}
                                max={4}
                                min={0}
                                step={1}
                                onValueChange={(value) => setNumSnacks(value[0])}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Label>Restricciones alimentarias:</Label> <br />
                        <div className="flex items-center">
                            <Checkbox
                                id="sin-gluten"
                                onCheckedChange={(checked) =>
                                    setRestricciones((prev) => (checked ? [...prev, 'sin-gluten'] : prev.filter((item) => item !== 'sin-gluten')))
                                }
                            />
                            <Label htmlFor="sin-gluten" className="ms-1">
                                Sin&nbsp;gluten
                            </Label>
                            <br />
                            <Checkbox
                                id="sin-lactosa"
                                className="ms-5"
                                onCheckedChange={(checked) =>
                                    setRestricciones((prev) => (checked ? [...prev, 'sin-lactosa'] : prev.filter((item) => item !== 'sin-lactosa')))
                                }
                            />
                            <Label htmlFor="sin-lactosa" className="ms-1">
                                Sin&nbsp;lactosa
                            </Label>
                            <br />
                            <Checkbox
                                id="vegetariana"
                                className="ms-5"
                                onCheckedChange={(checked) =>
                                    setRestricciones((prev) => (checked ? [...prev, 'vegetariana'] : prev.filter((item) => item !== 'vegetariana')))
                                }
                            />
                            <Label htmlFor="vegetariana" className="ms-1">
                                Vegetariano/a
                            </Label>
                            <br />
                            <Checkbox
                                id="vegana"
                                className="ms-5"
                                onCheckedChange={(checked) =>
                                    setRestricciones((prev) => (checked ? [...prev, 'vegana'] : prev.filter((item) => item !== 'vegana')))
                                }
                            />
                            <Label htmlFor="vegana" className="ms-1">
                                Vegano/a
                            </Label>
                            <br />
                            <Checkbox
                                id="keto"
                                className="ms-5"
                                onCheckedChange={(checked) =>
                                    setRestricciones((prev) => (checked ? [...prev, 'keyo'] : prev.filter((item) => item !== 'keto')))
                                }
                            />
                            <Label htmlFor="keto" className="ms-1">
                                Keto / Baja en carbohidratos
                            </Label>
                            <br />
                        </div>
                    </div>
                    <div className="flex max-w-xl gap-8 pt-4">
                        <div>
                            <Label htmlFor="productosAEvitar">
                                Alimentos a evitar
                                <small>
                                    <i>(Opcional)</i>
                                </small>
                                :
                            </Label>
                            <Input
                                id="productosAEvitar"
                                type="text"
                                placeholder="Huevo, picante, marisco ..."
                                value={productosAEvitar}
                                onChange={(e) => setProductosAEvitar(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="productosAPriorizar">
                                Alimentos a priorizar
                                <small>
                                    <i>(Opcional)</i>
                                </small>
                                :
                            </Label>
                            <Input
                                id="productosAPriorizar"
                                type="text"
                                placeholder="En caso de ser posible"
                                value={productosAPriorizar}
                                onChange={(e) => setProductosAPriorizar(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="gap-8 pt-4">
                        <Label htmlFor="tiempo-para-cocinar">
                            Tiempo disponible para cocinar (<b>{tiempoPreparacion}</b> minutos):
                        </Label>

                        <Slider
                            className="my-4"
                            id="tiempo-para-cocinar"
                            defaultValue={[25]}
                            max={55}
                            min={5}
                            step={10}
                            onValueChange={(value) => setTiempoPreparacion(value[0])}
                        />
                    </div>

                    <div className="gap-8 pt-4">
                        <Label htmlFor="nombre">Nombre del menú:</Label>
                        <Input
                            id="nombre"
                            type="text"
                            placeholder="Introduce un título"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="gap-8 pt-4">
                        <Label htmlFor="info_extra">Notas adicionales:</Label>
                        <Input
                            id="info_extra"
                            type="text"
                            placeholder="Añade información extra a tu menú"
                            value={info_extra}
                            onChange={(e) => setInfoExtra(e.target.value)}
                        />
                    </div>
                    <div className="gap-8 pt-8">
                    <Button className="cursor-pointer" type="button" onClick={handleCrearMenu}>
                        Crear Menú
                    </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
