import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajustes de perfil',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    edad: number;
    altura: number;
    peso: number;
    actividad: string;
    sexo: string;
    info_extra: string;
    email: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        edad: auth.user.edad,
        altura: auth.user.altura,
        peso: auth.user.peso,
        actividad: auth.user.actividad,
        sexo: auth.user.sexo,
        info_extra: auth.user.info_extra,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ajustes de perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Información personal" description="Actualiza los datos de tu perfil de usuario" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre y apellidos</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Nombre y apellidos"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="sexo">Sexo</Label>
                            <RadioGroup id="sexo" value={data.sexo} onValueChange={(value) => setData('sexo', value)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Masculino" id="masculino" />
                                    <Label htmlFor="masculino">Hombre</Label>&nbsp;&nbsp;&nbsp;
                                    <RadioGroupItem value="Femenino" id="femenino" />
                                    <Label htmlFor="femenino">Mujer</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="flex h-full flex-row gap-4 rounded-xl p-1">
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
                            <Select value={data.actividad} onValueChange={(value) => setData('actividad', value)} required>
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
                        <div className="grid gap-2">
                            <Label htmlFor="info_extra">¿Padeces algún problema de salud?</Label>
                            <Input
                                id="info_extra"
                                type="text"
                                autoComplete="info_extra"
                                value={data.info_extra}
                                onChange={(e) => setData('info_extra', e.target.value)}
                                disabled={processing}
                                placeholder="Información adicional"
                            />
                            <InputError message={errors.info_extra} className="mt-2" />
                        </div>
                        <Separator className="my-12" />
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico <i>(Email de demostración)</i></Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled
                                autoComplete="username"
                                placeholder="Correo electrónico"

                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Tu dirección de correo aún NO está verificada.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Haz click para reenviar el enlace de verificación
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Un nuevo enlace de verificación de cuenta ha sido enviado a tu dirección de correo electrónico
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-12 flex items-center gap-4">
                            <Button className="cursor-pointer" disabled={processing}>
                                Guardar cambios
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Cambios guardados</p>
                            </Transition>
                        </div>
                        <Separator className="my-12" />
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
