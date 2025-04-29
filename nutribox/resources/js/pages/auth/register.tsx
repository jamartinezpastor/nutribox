import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    sexo: string;
    edad: number;
    altura: number;
    peso: number;
    actividad: string;
    // objetivo: string;
    info_extra: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const [actividad, setActividad] = useState('');
    // const [objetivo, setObjetivo] = useState("");
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        sexo: '',
        edad: 0,
        altura: 0,
        peso: 0,
        actividad: '',
        // objetivo: '',
        info_extra: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Crear cuenta de usuario" description="Introduce tus datos y date de alta como usuario">
            <Head title="Alta de usuario" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre y apellidos</Label>
                        <Input
                        autoFocus
                            id="name"
                            type="text"
                            required
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Nombre y apellidos"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <Separator className="my-1" />

                    <div className="flex h-full flex-row gap-4 rounded-xl p-1">
                        <div>
                            <Label htmlFor="sexo">Sexo</Label>
                            <RadioGroup id="sexo" value={data.sexo} onValueChange={(value) => setData('sexo', value)} defaultValue="masculino">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Masculino" id="masculino" />
                                    <Label htmlFor="masculino">Hombre</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Femenino" id="femenino" />
                                    <Label htmlFor="femenino">Mujer</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label htmlFor="edad">Edad</Label>
                            <Input
                                id="edad"
                                type="number"
                                required
                                autoComplete="edad"
                                value={data.edad}
                                onChange={(e) => setData('edad', Number(e.target.value))}
                                placeholder="Edad"
                            />
                            <InputError message={errors.edad} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="altura">
                                Altura <small>(cm)</small>
                            </Label>
                            <Input
                                id="altura"
                                type="number"
                                required
                                autoComplete="altura"
                                value={data.altura}
                                onChange={(e) => setData('altura', Number(e.target.value))}
                                placeholder="Altura"
                            />
                            <InputError message={errors.altura} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="peso">
                                Peso <small>(kg)</small>
                            </Label>
                            <Input
                                id="peso"
                                type="number"
                                required
                                autoComplete="peso"
                                value={data.peso}
                                onChange={(e) => setData('peso', Number(e.target.value))}
                                placeholder="Peso"
                            />
                            <InputError message={errors.peso} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Actividad física</Label>
                        <Select
                            value={data.actividad}
                            onValueChange={(value) => {
                                setActividad(value);
                                setData('actividad', value);
                            }}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu nivel de actividad diaria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Nivel</SelectLabel>
                                    <SelectItem className="cursor-pointer" value="completamente-sedentario">
                                        Completamente sedentario
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="poco-movimiento">
                                        Poco movimiento
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="actividad-normal">
                                        En la media
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="persona-activa">
                                        Persona activa
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="actividad-intensa">
                                        Actividad intensa
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* 
                    <div className="grid gap-2">
                        <Label>Objetivo nutricional</Label>
                        <Select
                            value={data.objetivo}
                            onValueChange={(value) => {
                                setObjetivo(value);
                                setData('objetivo', value);
                            }}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu objetivo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Objetivo</SelectLabel>
                                    <SelectItem
                                        className="cursor-pointer"
                                        value="disminuir-ingesta-calorica-reduciendo-en-menor-medida-las-proteinas-diarias"
                                    >
                                        Bajar de peso
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="aumentar-ingesta-calorica">
                                        Aumentar de peso
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="disminuir-ingesta-carbohidratos-manteniendo-calorias">
                                        Diminuir la ingesta de Carbohidratos <small>(Manteniendo las Calorías diarias)</small>
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="aumentar-ingesta-proteinas-manteniendo-calorias">
                                        Aumentar la ingesta de Proteínas <small>(Manteniendo las Calorías diarias)</small>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    */}
                    <div className="grid gap-2">
                        <Label htmlFor="info_extra">¿Padeces algún problema de salud?</Label>
                        <Input
                            id="info_extra"
                            type="text"
                            required
                            autoComplete="info_extra"
                            value={data.info_extra}
                            onChange={(e) => setData('info_extra', e.target.value)}
                            placeholder="Información adicional"
                        />
                        <InputError message={errors.info_extra} className="mt-2" />
                    </div>
                    <Separator className="my-1" />

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="correo@ejemplo.es"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Contraseña"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirma tu contraseña</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Repite tu Contraseña"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full cursor-pointer" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Dar de alta
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    ¿Tienes ya una cuenta?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Iniciar sesión
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
