// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout
            title="Verificación de correo electrónico"
            description="Por favor, revisa tu buzón de entrada de correo electrónico, abre el mail que te hemos enviado y haz click en el enlace de verificación de cuenta. (Es posible que el correo lo hayas recibido erróneamente en la carpeta de spam o correo no deseado)."
        >
            <Head title="Verificación de correo electrónico" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Un nuevo enlace de verificación ha sido enviado a la dirección de correo electrónico registrada
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Reenviar enlace de verificación
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    Salir
                </TextLink>
            </form>
        </AuthLayout>
    );
}
