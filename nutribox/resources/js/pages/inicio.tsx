import GridMotion from '@/components/blocks/backgrounds/GridMotion/GridMotion';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/inicio',
    },
];

// note: you'll need to make sure the parent container of this component is sized properly
const huecos = [
    'https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4929675/pexels-photo-4929675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5175576/pexels-photo-5175576.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1305063/pexels-photo-1305063.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/15913503/pexels-photo-15913503/free-photo-of-comida-ensalada-vegetales-verduras.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWpiM2Z0dnBwZGU2azk2a3F1cm9nZXNheHZlbnh4aDdvdDU1cDN5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U4ugCJfthkwdWJTfzJ/giphy.gif',
    'N',
    'U',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExemw2MnMwM3p6ZWt1Zjk0d2VtNjVoYXFobmRoNnpxaGxpamVtMDU0aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/E8RT57VpG9GEB6Hjeo/giphy.gif',
    '/img/gridmotion_iconos2.jpg',
    //'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    //'https://images.pexels.com/photos/4929675/pexels-photo-4929675.jpeg?auto=compress&cs=tinysrgb&w=800',
    '/img/gridmotion_iconos3.jpg',
    'T',
    'R',
    'I',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXQxbjBidTY5eDI3c280dDVsaHpkNm84MjQ0MHdwcm5zY2drejhxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Qtw2vklEIHrff8hLNK/giphy.gif',    
    'https://images.pexels.com/photos/5175576/pexels-photo-5175576.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4929675/pexels-photo-4929675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjJrenFrODdia2o5M2JoaHhqdGNiMmZvZmNrdjE2c2loNTlhdDFiOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z428zUetu8pFpeQHaY/giphy.gif',
    'B',
    'O',
    'X',
    'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5175576/pexels-photo-5175576.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/31508562/pexels-photo-31508562/free-photo-of-foto-de-primer-plano-de-lechuga-verde-fresca-y-crujiente.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/15913503/pexels-photo-15913503/free-photo-of-comida-ensalada-vegetales-verduras.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5175576/pexels-photo-5175576.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4929675/pexels-photo-4929675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1305063/pexels-photo-1305063.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5175576/pexels-photo-5175576.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1305063/pexels-photo-1305063.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14089635/pexels-photo-14089635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1305063/pexels-photo-1305063.jpeg?auto=compress&cs=tinysrgb&w=800',
    // Add more items as needed
];

export default function Inicio() {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Inicio" />
        {/* Contenedor flex que ocupa todo el espacio restante y evita overflow */}
        <div className="flex flex-1 flex-col p-4 gap-4 rounded-xl overflow-hidden min-h-0">
          {/* Wrapper para forzar a GridMotion a rellenar la altura disponible */}
          <div className="flex-1 min-h-0">
            <GridMotion items={huecos} gradientColor="#00bc7d" />
          </div>
        </div>
      </AppLayout>
    );
  }
