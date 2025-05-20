import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { BookMarkedIcon, ForkKnifeCrossed, HeartPulse, LucideCarrot, Menu, Play, Smile } from 'lucide-react';
import { useRef } from 'react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import { Separator } from './ui/separator';

const mainNavItems: NavItem[] = [

    {
        title: 'Buscar',
        href: '/offbuscar',
        icon: LucideCarrot,
    },
    {
        title: 'Evaluar',
        href: '/dsevaluar',
        icon: HeartPulse,
    },
    {
        title: 'Diseñar menú',
        href: '/menucrear',
        icon: ForkKnifeCrossed,
    },
    {
        title: 'Menús guardados',
        href: '/menuslistar',
        icon: BookMarkedIcon,
    },
    {
        title: 'Canal Cocina',
        href: '/multimedia',
        icon: Play,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Acerca de',
        href: '',
        icon: Smile,
    },
];

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
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
        imagen: 'https://tailwindcss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcard.d69e3d8c.jpg&w=3840&q=75',
        texto: 'Estilos: Tailwind CSS 4.0.6',
    },
    {
        imagen: 'https://miro.medium.com/v2/resize:fit:1024/1*xFASqi7HgNXyCvQJ9NmEDA.png',
        texto: 'Librerías UI: shadcn/ui, Headless UI, React Bits, Radix UI, React Chartjs 2, Embla Carousel y React Youtube',
    },
    {
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDuhTcp6ETMZtlL_eJ5lAQDImJHC6TJYCyJg&s',
        texto: 'Empaquetador: Vite 6.0',
    },
    {
        imagen: 'https://miro.medium.com/v2/resize:fit:1400/1*HWgi914cfYaezPHLalCOZQ.png',
        texto: 'Router: Inertia.js v2.0.1',
    },
    {
        imagen: 'https://files.nette.org/blog/main/135-b.webp?v=1730788240',
        texto: 'Backend: PHP 8.2.12',
    },
    {
        imagen: 'https://i.blogs.es/ef26c3/81789893-2daf-418f-a041-8d37ee55b9a0/1366_2000.webp',
        texto: 'Base de datos: SQLite 3.42.0',
    },
    {
        imagen: 'https://images.seeklogo.com/logo-png/46/1/open-food-facts-logo-png_seeklogo-463766.png',
        texto: 'API Base de datos alimentos: Open Fact Foods v1',
    },
    {
        imagen: 'https://tjzk.replicate.delivery/models_models_featured_image/302182ab-af74-4963-97f2-6121a80c61d7/deepseek-r1-cover.webp',
        texto: 'API IA: Deepseek Model R1 (DeepSeek PHP Client wrapper)',
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
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOCLsjMtwYXxs6m0rIrYmKriOWyI88059LTw&s',
        texto: 'Dominio Hostinger: nutribox.es',
    },
    {
        imagen: 'https://www.softwaredoit.es/logotipos/axarnet.jpg?t=2023-05-08_11_17_48',
        texto: 'Hosting Axarnet VPS Go! VZ: Apache Ubuntu 22.04 2vCPU 20GB-Almacenamiento 4GB-RAM',
    },
];

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const autoplay = useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));
    return (
        <>
            <div className="border-sidebar-border/80 border-b">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between">
                                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item) => (
                                                <Link key={item.title} href={item.href} className="flex items-center space-x-2 font-medium">
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        {/* 
                                        // Menu por defecto con <a>
                                        <div className="flex flex-col space-y-4">
                                            {rightNavItems.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={item.href}
                                                    target="_parent"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                    <span>{item.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                        */}
                                        <div className="flex flex-col space-y-4">
                                            {rightNavItems.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href=""
                                                    target=""
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                    <span>
                                                        <small>Desarrollado por:</small> <br />
                                                        <b> Jose Antonio Martínez Pastor</b> <br />
                                                        <a href="https://www.linkedin.com/in/jamartinezpastor/">
                                                            <i>Linkedin</i>
                                                        </a>
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link
                        href="/inicio"
                        prefetch
                        className="flex items-center space-x-2 transition duration-600 hover:brightness-125 hover:drop-shadow-[0_0_18px_#45c3bc]"
                    >
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                page.url === item.href && activeItemStyles,
                                                'h-9 cursor-pointer px-3',
                                            )}
                                        >
                                            {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                            {item.title}
                                        </Link>
                                        {page.url === item.href && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                            {/*
                            <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer">
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button>
                            */}
                            <div className="hidden lg:flex">
                                {rightNavItems.map((item) => (
                                    <TooltipProvider key={item.title} delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                {/* Éste <span> antes era un <a>, cambiado ya que interfería su trigger/disparador con el del Drawer (Ahora solo 1 a la vez)*/}
                                                <span
                                                    rel="noopener noreferrer"
                                                    className="group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                    <Drawer>
                                                        <DrawerTrigger className="cursor-pointer">
                                                            {/* <span className="sr-only">{item.title}</span> */}
                                                            {item.icon && (
                                                                <Icon iconNode={item.icon} className="size-5 opacity-80 group-hover:opacity-100" />
                                                            )}
                                                        </DrawerTrigger>
                                                        <DrawerContent>
                                                            <div className="mx-auto w-full max-w-lg">
                                                                <DrawerHeader>
                                                                    <DrawerTitle>Acerca de</DrawerTitle>
                                                                    <DrawerDescription>NUTRIBOX - Alimentación Inteligente</DrawerDescription>
                                                                    <DrawerDescription>
                                                                        SPA (Single Page App) para la generación de menús diarios personalizados.
                                                                    </DrawerDescription>
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
                                                                                            <img
                                                                                                src={imagen}
                                                                                                alt="Cargando..."
                                                                                                className="h-full w-full object-cover"
                                                                                            />
                                                                                            <div className="bg-background/60 absolute bottom-4 left-4 rounded-xl px-4 py-2">
                                                                                                <span className="text-foreground">{texto}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </CarouselItem>
                                                                                ))}
                                                                            </CarouselContent>
                                                                        </Carousel>
                                                                    </div>
                                                                    {/* 
                                                                    <div className="mt-3 h-[10px]">Gestión de tareas: Trello</div>
                                                                    */}
                                                                </div>
                                                                <DrawerFooter>
                                                                    <DrawerDescription>
                                                                        <TooltipProvider>
                                                                            <Tooltip>
                                                                                <TooltipTrigger className="cursor-pointer">
                                                                                    Tutor: Jose Manuel Rubira Miranda
                                                                                </TooltipTrigger>
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
                                                                                    Desarrollador: Jose Antonio Martínez Pastor{' '}
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
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="size-10 cursor-pointer rounded-full p-1">
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="border-sidebar-border/70 flex w-full border-b">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
