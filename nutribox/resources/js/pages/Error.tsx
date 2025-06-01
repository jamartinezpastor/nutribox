import FollowCursor from '@/components/blocks/Animations/FollowCursor/FollowCursor';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { router } from '@inertiajs/react';
import { FileWarning } from 'lucide-react';

interface ErrorProps {
    status: number;
    mensaje: string;
}

export default function Error({ status, mensaje }: ErrorProps) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
            <img
                src="https://img.freepik.com/premium-vector/seamless-pattern-with-vegetarian-food_929078-102.jpg"
                alt=""
                className="pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover opacity-25 select-none"
            />
            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-background/20 to-background/100"></div>

            <Icon iconNode={FileWarning} className="text-destructive z-1 mb-4 size-15" />
            <h1 className="text-destructive z-1 mb-4 text-7xl font-bold">{status}</h1>
            <h2 className="z-1 mb-2 text-3xl font-semibold">¡Algo salió mal!</h2>
            <p className="text-foreground-700 z-1 mb-4 text-lg">{mensaje}</p>
            <div className="z-1 hidden h-14.5 lg:block">
                <FollowCursor
                    offsetX={35}
                    cardWidth="200px"
                    rotationFactor={5}
                    enableTilt={true}
                    animationConfig={{ mass: 5, tension: 350, friction: 40 }}
                    wheelConfig={{ mass: 1, tension: 200, friction: 30 }}
                >
                    {' '}
                </FollowCursor>
            </div>
            <div className="z-1 gap-8 pt-8">
                <Button size="lg" className="cursor-pointer shadow-[0_0_20px_-10px]" variant="outline" onClick={() => router.visit('/')}>
                    ← Volver
                </Button>
            </div>
        </div>
    );
}
