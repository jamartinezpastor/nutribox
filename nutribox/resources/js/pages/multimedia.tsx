import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ListVideo, Tv } from 'lucide-react';
import YouTube from 'react-youtube';

export default function Play() {
    const playlistId = 'PLyuBqhin8FX8sSHlF__anYY-Rse9w0Nah';
    const opts = {
        width: '100%',
        height: '335',
        playerVars: {
            listType: 'playlist',
            list: playlistId,
            autoplay: 0,
            controls: 2,
            showinfo: 0,
            modestbranding: 1,
        },
    };

    return (
        <AppLayout>
            <Head title="Sección Multimedia" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p className="flex items-center gap-2 text-4xl">
                    <div className="ml-1 flex items-center gap-1 text-base">
                        <Icon iconNode={Tv} className="inline-block" />
                    </div>
                    Canal Cocina
                    <small className="text-xl">(Directo)</small>
                </p>
                <p className="text-muted-foreground text-sm">
                    Gastronomía, recetas, costumbres culinarias, etc... la cocina y sus productos. Ya disponible la emisión en directo del canal
                    Cocina.
                </p>
                <div className="flex justify-center">
                    <div className="w-3/6 max-w-4xl">
                        <iframe
                            src="https://www.vivalivetv.com/embed?scheme=embedChannel&channelId=2514&autoplay=yes&showChat=no&chat-theme=dark&close-chat=yes&parent_url=www.vivalivetv.com/channel/andalucia-cocina"
                            allowFullScreen
                            className="hover:shadow-primary hover:ring-primary/60 transform-gpu aspect-video w-full cursor-pointer rounded-xl shadow-lg transition-all duration-1000 hover:[transform:scale(1.05)] hover:shadow-[0_0_30px_8px]"
                        />
                    </div>
                </div>

                <Separator className="my-4" />

                <p className="flex items-center gap-2 text-4xl">
                    <div className="ml-1 flex items-center gap-1 text-base">
                        <Icon iconNode={ListVideo} className="inline-block" />
                    </div>
                    Playlist Healthy
                    <small className="text-xl">(Youtube)</small>
                </p>
                <p className="text-muted-foreground text-sm">
                    Descubre nuestra Playlist Healthy de Youtube: consejos nutricionales, charlas sobre alimentación, recetas saludables, etc... Todo
                    para mejorar tu día a día. Inspírate y cuida tu alimentación con nuestra selección de contenido en vídeo.
                </p>
                <div className="flex justify-center">
                    <div className="w-3/6 max-w-4xl">
                        <YouTube
                            opts={opts}
                            className="hover:shadow-primary hover:ring-primary/60 transform-gpu aspect-video w-full cursor-pointer rounded-xl shadow-lg transition-all duration-1000 hover:[transform:scale(1.05)] hover:shadow-[0_0_30px_8px]"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
