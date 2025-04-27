import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { MenusTipo, columns } from './menus/columnsMenu';
import { DataTable } from './menus/data-table';

type Props = {
    menus: MenusTipo[];
};

export default function VerMenus({ menus }: Props) {
    return (
        <AppLayout>
            <Head title="Menús guardados" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Menús guardados</p>
                <p className="text-muted-foreground text-sm">
                    Todos tus menús diarios previamente almacenados, en un solo lugar.
                </p>
                <Separator className="my-4" />
                <div className="container mx-auto rounded px-4 py-2">
                    <DataTable columns={columns} data={menus} />
                </div>
            </div>
        </AppLayout>
    );
}
