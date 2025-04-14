import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { MenusTipo, columns } from './menus/columnsMenu';
import { DataTable } from './menus/data-table';
import { Separator } from '@/components/ui/separator';

type Props = {
    menus: MenusTipo[];
};

export default function VerMenus({ menus }: Props) {
    return (
        <AppLayout>
            <Head title="Menús guardados" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Menús guardados</p>
                <Separator className="my-4" />
                <div className="container mx-auto py-10 px-4 py-2 rounded ">
                    <DataTable columns={columns} data={menus} />
                </div>
            </div>
        </AppLayout>
    );
}
