import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import { Toaster, toast } from 'sonner';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    //toast.success('¡Notificación de prueba!');
    return (
        <AppShell >
         <div className="min-h-screen flex flex-col">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent className="flex-1 flex flex-col overflow-hidden">{children}</AppContent>
            </div>
        </AppShell>
    );
}
