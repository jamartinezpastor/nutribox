import GridMotion from '@/components/blocks/backgrounds/GridMotion/GridMotion';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/inicio',
    },
];



// note: you'll need to make sure the parent container of this component is sized properly
const huecos = [
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1305063/pexels-photo-1305063.jpeg?auto=compress&cs=tinysrgb&w=800',
    'N', 'U',
  
    'https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4929675/pexels-photo-4929675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5175576/pexels-photo-5175576.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/15913503/pexels-photo-15913503/free-photo-of-comida-ensalada-vegetales-verduras.jpeg?auto=compress&cs=tinysrgb&w=800',
    'T', 'R', 'I',
    'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4929675/pexels-photo-4929675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5175576/pexels-photo-5175576.jpeg?auto=compress&cs=tinysrgb&w=800',
    'B', 'O', 'X',
    'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=800',

    'https://images.pexels.com/photos/31508562/pexels-photo-31508562/free-photo-of-foto-de-primer-plano-de-lechuga-verde-fresca-y-crujiente.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1305063/pexels-photo-1305063.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1305063/pexels-photo-1305063.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4929675/pexels-photo-4929675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5175576/pexels-photo-5175576.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/15913503/pexels-photo-15913503/free-photo-of-comida-ensalada-vegetales-verduras.jpeg?auto=compress&cs=tinysrgb&w=800',

    // Add more items as needed
];







export default function Dashboard() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <GridMotion items={huecos} gradientColor="#00bc7d" />

                {/*
               <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                    <h1 className="text-4xl mb-4">Bienvenido/a a Nutribox</h1>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
                <div className="mt-4">
                    <Link href={route('principal')} className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Ir a Principal
                    </Link>
                </div>
                */}
            </div>
        </AppLayout>
    );
}
