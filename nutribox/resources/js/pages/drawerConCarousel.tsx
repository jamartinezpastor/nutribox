import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type NavItem } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import { Smile } from 'lucide-react';
import { useRef } from 'react';
import { Separator } from '../components/ui/separator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rightNavItems: NavItem[] = [
    {
        title: 'Acerca de',
        href: '',
        icon: Smile,
    },
];

interface DrawerConCarouselProps {
    texto?: string;
}

const carouselImages = [
    {
        imagen: 'https://laravel.com/images/home/video-preview-static.jpg',
        texto: 'Framework: Laravel 12.3.0',
    },
    {
        imagen: 'https://img-c.udemycdn.com/course/750x422/5620946_7c11.jpg',
        texto: 'Frontend: React 19.0.0 (Typescript 5.8.3)',
    },
    {
        imagen: 'https://miro.medium.com/v2/resize:fit:1400/1*HWgi914cfYaezPHLalCOZQ.png',
        texto: 'Router: Inertia.js v2.0.1 - CSR (Client Side Rendering)',
    },
    {
        imagen: 'https://tjzk.replicate.delivery/models_models_featured_image/302182ab-af74-4963-97f2-6121a80c61d7/deepseek-r1-cover.webp',
        texto: 'API IA: Deepseek Chat Model (DS PHP Client wrapper)',
    },
    {
        imagen: 'https://corporacioninformatica.com/wp-content/uploads/2023/06/git.jpg',
        texto: 'Control de versiones: GIT + GitHub',
    },
    {
        imagen: 'https://i0.wp.com/build5nines.com/wp-content/uploads/2024/05/GitHub_Actions_Featured_Image_2024.jpg?fit=1200%2C675&ssl=1',
        texto: 'Despliege automático CI/CD: Github Actions',
    },
    {
        imagen: 'https://tailwindcss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcard.d69e3d8c.jpg&w=3840&q=75',
        texto: 'Estilos: Tailwind CSS 4.0.6',
    },
    {
        imagen: 'https://miro.medium.com/v2/resize:fit:1024/1*xFASqi7HgNXyCvQJ9NmEDA.png',
        texto: 'Librerías UI: shadcn/ui, Headless UI, React Bits, Radix UI, React Chartjs 2, Embla Carousel y React Youtube',
    },
    {
        imagen: 'https://miro.medium.com/v2/resize:fit:2800/1*PASOqnDQksOLAFjE5jEAGg.png',
        texto: 'Animaciones: Adobe After Effects + .json + Lottie for Web',
    },
    {
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDuhTcp6ETMZtlL_eJ5lAQDImJHC6TJYCyJg&s',
        texto: 'Empaquetador/Bundler: Vite 6.0',
    },
  
    {
        imagen: 'https://files.nette.org/blog/main/135-b.webp?v=1730788240',
        texto: 'Backend: PHP 8.2.12',
    },
    {
        imagen: 'https://i.blogs.es/ef26c3/81789893-2daf-418f-a041-8d37ee55b9a0/1366_2000.webp',
        texto: 'Base de datos: SQLite 3.42.0 + Backup automático',
    },
    {
        imagen: 'https://images.seeklogo.com/logo-png/46/1/open-food-facts-logo-png_seeklogo-463766.png',
        texto: 'API Base de datos alimentos: Open Fact Foods v1',
    },
 
    {
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOCLsjMtwYXxs6m0rIrYmKriOWyI88059LTw&s',
        texto: 'Dominio Hostinger: nutribox.es',
    },
    {
        imagen: 'https://www.softwaredoit.es/logotipos/axarnet.jpg?t=2023-05-08_11_17_48',
        texto: 'Hosting Axarnet VPS Go! VZ: Apache Ubuntu 22.04 Only CLI 2vCPU 20GB-Almacenamiento 4GB-RAM',
    },
];
export function DrawerConCarousel({ texto }: DrawerConCarouselProps) {
    const autoplay = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

    return (
        <Drawer>
            <DrawerTrigger className="cursor-pointer">
                <div className="flex items-center space-x-2 font-medium">
                    <Icon iconNode={Smile} className="size-5 opacity-80 group-hover:opacity-100" />
                    {texto && <span>{texto}</span>}
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle>Acerca de</DrawerTitle>
                        <DrawerDescription>NUTRIBOX - Alimentación Inteligente</DrawerDescription>
                        <DrawerDescription>SPA (Single Page App) para la generación de menús diarios personalizados.</DrawerDescription>
                    </DrawerHeader>
                    <Separator />
                    <div className="p-4 pb-2">
                        <DrawerDescription className="mb-2">Stack de desarrollo: </DrawerDescription>
                        <div className="flex items-center justify-center space-x-2">
                            <Carousel plugins={[autoplay.current]} className="w-full">
                                <CarouselContent className="h-[30vh] w-full">
                                    {carouselImages.map(({ imagen, texto }, idx) => (
                                        <CarouselItem key={idx} className="basis-full cursor-pointer">
                                            <div className="relative h-full w-full overflow-hidden rounded-lg">
                                                <img src={imagen} alt="Cargando..." className="h-full w-full object-cover" />
                                                <div className="bg-background/60 absolute bottom-4 left-4 rounded-xl px-4 py-2">
                                                    <span className="text-foreground">{texto}</span>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerDescription>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="cursor-pointer">Tutor: Jose Manuel Rubira Miranda</TooltipTrigger>
                                    <TooltipContent>
                                        <p>Departamento de Informática - IES Alcántara (Alcantarilla)</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DrawerDescription>

                        <DrawerDescription>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="inline-flex cursor-pointer items-center">
                                        Desarrollador: Jose Antonio Martínez Pastor
                                        <a
                                            href="https://www.linkedin.com/in/jamartinezpastor/"
                                            className="ml-2 h-6 align-middle transition duration-600 hover:brightness-125 hover:drop-shadow-[0_0_18px_#45c3bc]"
                                            target="_blank"
                                        >
                                            <img
                                                src="https://images.icon-icons.com/535/PNG/512/Linkedin-Icon_icon-icons.com_52893.png"
                                                alt="Linkedin"
                                                className="h-6 align-middle"
                                                style={{ minWidth: 24 }}
                                            />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>2º FP Superior en Desarrollo de Aplicaciones Web</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DrawerDescription>
                        <DrawerClose asChild>
                            <Button className="cursor-pointer" variant="secondary">
                                Volver
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
