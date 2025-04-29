import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookAIcon, BookOpen, Folder, LayoutGrid, LucideAlbum, LucideCarrot, Sandwich } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Inicio',
        href: '/inicio',
        icon: LayoutGrid,
    },
    {
        title: 'Base de Datos',
        href: '/off_buscar',
        icon: LucideCarrot,
    },
    {
        title: 'Evaluar Alimento (IA)',
        href: '/ds_evaluar',
        icon: Sandwich,
    },
    {
        title: 'Diseñar Menú (IA)',
        href: '/menu_crear',
        icon: BookAIcon,
    },
    {
        title: 'Menús guardados',
        href: '/menu_ver',
        icon: LucideAlbum,
    },
  
];

const footerNavItems: NavItem[] = [
    {
        title: 'Buzón de Sugerencias',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Acerca de',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
