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
            router.get("/ds-evaluar_a_controller", { producto, cantidad, unidad, patologia });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Evaluar alimentos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Evaluar la relación entre un alimento y una patología</p>
                <p className="text-sm text-muted-foreground">
                    Analice la relación existente entre un alimento o producto, su cantidad y una patología,<br />
                    con el fin de comprender sus interacciones y la evidencia científica que respalda nuestra evaluación.        </p>
                <Separator className="my-4" />
                {/* Flex, columna de arriba a abajo, 4 unidades de separación,
                 max-w-sm limita el ancho, mx-auto margen automatico a ambos lados.. centra horizontal */}
                <div className="flex flex-col space-y-4 max-w-md mx-auto">
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
                    <div className="flex h-full flex-row gap-4 rounded-xl p-4">
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
                                        <SelectItem value="gr">Gramos (g)</SelectItem>
                                        <SelectItem value="ml">Mililitros (ml)</SelectItem>
                                        <SelectItem value="piezas">Porciones (unidad/pieza)</SelectItem>
                                        <SelectItem value="tazas">Taza o Vaso</SelectItem>
                                        <SelectItem value="cucharadas">Cucharadas (tbsp)</SelectItem>
                                        <SelectItem value="kcal">Kilocalorías (kcal)</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    <div>
                        <Label>Patología:</Label>
                        <Select onValueChange={(value) => setPatologia(value)} required> {/* Aquí se asigna `onValueChange` */}
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una patología" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Patología</SelectLabel>
                                    <SelectItem value="sin patologia conocida">Sin patología conocida</SelectItem>
                                    <SelectItem value="obesidad">Obesidad</SelectItem>
                                    <SelectItem value="diabetes">Diabetes</SelectItem>
                                    <SelectItem value="hipercolesterolemia">Hipercolesterolemia</SelectItem>
                                    <SelectItem value="hipertrigliceridemia">Hipertrigliceridemia</SelectItem>
                                    <SelectItem value="enfermedad celiaca">Enfermedad celíaca</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>


                    <Button type="button" onClick={handleEvaluar}>
                        Evaluar
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}