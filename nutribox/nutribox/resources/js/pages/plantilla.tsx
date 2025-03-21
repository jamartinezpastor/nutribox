import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Plantilla',
        href: '/plantilla',
    },
    // {
    //     title: 'Principal',
    //     href: '/principal',
    // },

];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
             <h1>11111111111  consectetur adipisicing elit. Architecto, aperiam quis!</h1>
            <Head title="Plantilla" />
            <h2>2222222222222 Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, aperiam quis!</h2>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h2>3333333333333 Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, aperiam quis!</h2>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <p>444444444444 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique illo sit quibusdam quis quo, eveniet qui ab ipsum ducimus nemo sed vitae dolorem. Suscipit laboriosam nostrum rerum sapiente voluptate fugit.
                        Eius, voluptatibus tempora expedita minus sit nam ipsam quis sequi ab sed autem, modi magnam ea vitae ex eveniet animi asperiores fugit a, architecto ullam nemo! Minima perferendis minus adipisci.
                        Accusamus, repellendus consequuntur voluptatum, tempora aliquid delectus beatae quas aut totam quod possimus nostrum ratione incidunt, soluta quasi nihil fugit quia ipsum consectetur dolores asperiores odit. Sequi mollitia labore asperiores.
                        Cum fugiat neque odio accusantium minima temporibus id facere illum. Reiciendis vel voluptatibus, in asperiores atque voluptas minima minus excepturi hic! Aliquam officia minima temporibus, eaque dolorem quas porro mollitia.
                    </p>
                </div>

            </div>
        </AppLayout>
    );
}
