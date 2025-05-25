import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';

const LottieLogoMain: React.FC = () => {
    const containerRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animacionLottie2 = lottie.loadAnimation({
            container: containerRef2.current!,
            renderer: 'html',
            loop: true,
            autoplay: true,
            path: 'https://lottie.host/a8a30e2d-0bc2-413e-a645-28af544a6a27/Elc4HLwLqH.json',
            rendererSettings: {
                imagePreserveAspectRatio: 'xMidYMid slice',
            },
        });

        return () => {
            animacionLottie2.destroy();
        };
    }, []);

    return (
      <div className="h-full w-full flex items-center justify-center">
      <div
        ref={containerRef2}
        className="h-full w-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
    );
  };

export default LottieLogoMain;
