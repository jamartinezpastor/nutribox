import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evaluar alimento',
        href: '/inicio',
    },

];

export default function DS_evaluar() {
    const [producto, setProducto] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [unidad, setUnidad] = useState("");
    const [patologia, setPatologia] = useState("");


    const handleEvaluar = () => {
        if (producto.trim()) {
            router.get("/dsevaluaracontroller", { producto, cantidad, unidad, patologia });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Evaluar alimentos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Evaluar la relación entre un alimento y una patología</p>
                <p className="text-sm text-muted-foreground">
                    Analice la relación existente entre un alimento o producto, su cantidad y una patología, con el fin de comprender sus interacciones y la evidencia científica que respalda nuestra evaluación.        </p>
                <Separator className="my-4" />
                {/* Flex, columna de arriba a abajo, 4 unidades de separación,
                 max-w-sm limita el ancho, mx-auto margen automatico a ambos lados.. centra horizontal */}
                <div className="flex flex-col space-y-4 max-w-xl mx-auto">
                    <div>
                        <Label htmlFor="producto">Alimento o producto:</Label>
                        <Input
                            id="producto"
                            type="text"
                            placeholder="Alimento / Producto"
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
                            <Select onValueChange={(value) => setUnidad(value)} required> {/* Aquí se asigna `onValueChange` */}
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una unidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Unidad</SelectLabel>
                                        <SelectItem className='cursor-pointer' value="gr">Gramos (g)</SelectItem>
                                        <SelectItem className='cursor-pointer' value="ml">Mililitros (ml)</SelectItem>
                                        <SelectItem className='cursor-pointer' value="piezas">Porciones (unidad/pieza)</SelectItem>
                                        <SelectItem className='cursor-pointer' value="tazas">Taza o Vaso</SelectItem>
                                        <SelectItem className='cursor-pointer' value="cucharadas">Cucharadas (tbsp)</SelectItem>
                                        <SelectItem className='cursor-pointer' value="kcal">Kilocalorías (kcal)</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex h-full flex-row gap-4 rounded-xl pt-4">

                    <div>
                        <Label>Patología:</Label>
                        <Select onValueChange={(value) => setPatologia(value)} required > {/* Aquí se asigna `onValueChange` */}
                            <SelectTrigger >
                                <SelectValue  placeholder="Selecciona una patología" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup>
                                    <SelectLabel>Patología</SelectLabel>
                                    <SelectItem className='cursor-pointer' value="sin patologia conocida">Sin patología conocida</SelectItem>
                                    <SelectItem className='cursor-pointer' value="obesidad">Obesidad</SelectItem>
                                    <SelectItem className='cursor-pointer' value="diabetes">Diabetes</SelectItem>
                                    <SelectItem className='cursor-pointer' value="hipercolesterolemia">Hipercolesterolemia</SelectItem>
                                    <SelectItem className='cursor-pointer' value="hipertrigliceridemia">Hipertrigliceridemia</SelectItem>
                                    <SelectItem className='cursor-pointer' value="enfermedad celiaca">Enfermedad celíaca</SelectItem>
                                    <SelectItem className='cursor-pointer' value="enfermedad-renal-cronica-con-restriccion-de-potasio">Enfermedad renal crónica <small>(Con altos niveles de Potasio)</small></SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        </div> </div>

                    <div className="gap-8 pt-2">
                    <Button className='cursor-pointer' type="button" onClick={handleEvaluar}>
                        Evaluar
                    </Button>
                    </div> </div>
            </div>
        </AppLayout>
    );
}