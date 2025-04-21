import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage} from '@inertiajs/react';
import { MenusTipo, columns } from './menus/columnsMenu';
import { DataTable } from './menus/data-table';
import { useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
    menus: MenusTipo[];
};
export default function VerMenus({ menus }: Props) {
/*
    const { props } = usePage();

    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
    }, [props.flash]);
    */

    return (
        <AppLayout>
            <Head title="Menús guardados" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="text-4xl">Menús guardados</p>
                <Separator className="my-4" />
                <div className="container mx-auto rounded px-4 py-2 py-10">
                    <DataTable columns={columns} data={menus} />
                </div>
            </div>
        </AppLayout>
    );
}
