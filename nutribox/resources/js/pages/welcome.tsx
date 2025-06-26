import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import LottieWelcome from '../components/LottieWelcome';
import GlareHover from '../components/blocks/Animations/GlareHover/GlareHover';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bienvenido/a">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-4 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-3 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('inicio')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Inicio
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Iniciar sesión
                                </Link>
                                {/* register */}
                                <Link
                                    href={route('login')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert('Registro deshabilitado, puedes iniciar sesión con las credenciales de demostración.');
                                    }}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-6 leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-12 lg:leading-[26px] dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-1 font-medium">NUTRIBOX</h1>
                            <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                                Alimentación inteligente <br />
                            </p>
                            <ul className="mb-4 flex flex-col lg:mb-6">
                                <li className="relative flex items-center gap-4 py-2">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                        </span>
                                    </span>
                                    <span>Diseño de Menús Diarios (IA).</span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                        </span>
                                    </span>
                                    <span>Buscador de Información Nutricional.</span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                        </span>
                                    </span>
                                    <span>Evaluador de Alimentos y Patologías (IA).</span>
                                </li>
                            </ul>
                            <br />

                            <div className="flex items-center justify-center ">
                                <GlareHover
                                    glareColor="#ffffff"
                                    glareOpacity={0.5}
                                    glareAngle={-30}
                                    glareSize={300}
                                    transitionDuration={1000}
                                    playOnce={true}
                                >
                                    <div className="items-center border-ring bg-primary dark:bg-primary flex flex-col rounded-lg p-2 text-[#1b1b18] lg:justify-center lg:p-4 glow-border">
                                        <p className="text-foreground dark:text-background border-ring rounded-lg p-1 text-lg font-bold">
                                            <b>REGISTRO DESHABILITADO</b>
                                            <br />
                                            Credenciales de prueba:
                                        </p>
                                        <span className="text-foreground dark:text-foreground bg-sidebar mt-2 rounded-lg pl-3 pr-3 font-light">
                                            Email:
                                            <span className="pl-3 font-bold">
                                                <i>correo@ejemplo.es</i>
                                            </span>
                                        </span>
                                        <span className="text-foreground dark:text-foreground bg-sidebar mt-2 rounded-lg pl-3 pr-3 font-light">
                                            Clave:
                                            <span className="pl-3 font-bold">
                                                <i>Contraseña</i>
                                            </span>
                                        </span>
                                    </div>
                                </GlareHover>
                            </div>
                        </div>
                        <div className="relative w-full overflow-hidden rounded-t-lg bg-[#161615] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] lg:mb-0 lg:ml-0 lg:aspect-auto lg:w-[450px] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <div className="flex items-center justify-center">
                                <LottieWelcome />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
