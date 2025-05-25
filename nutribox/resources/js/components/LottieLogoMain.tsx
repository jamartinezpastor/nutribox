import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';

const LottieLogoMain: React.FC = () => {
  const containerRef2 = useRef<HTMLDivElement>(null);
  const animInstance = useRef<any>(null);

  useEffect(() => {  
    const loadAnimation = () => {
      // destroy si cambia la apariencia
      if (animInstance.current) {
        animInstance.current.destroy();
      }
      const isDark = document.documentElement.classList.contains('dark');
      const path = isDark
        ? 'https://lottie.host/a8a30e2d-0bc2-413e-a645-28af544a6a27/Elc4HLwLqH.json'
        : 'https://lottie.host/9b2dcbc4-baea-4bb4-a6b6-3863b31882ac/1MUR2SH210.json';

      animInstance.current = lottie.loadAnimation({
        container: containerRef2.current!,
        renderer: 'html',
        loop: true,
        autoplay: true,
        path,
        rendererSettings: {
          imagePreserveAspectRatio: 'xMidYMid slice',
        },
      });
    };
    
    loadAnimation();

    // Observador de cambios
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          loadAnimation();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    // Destroy que ya estaba
    return () => {
      if (animInstance.current) animInstance.current.destroy();
      observer.disconnect();
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



/*
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
           //  path: 'https://lottie.host/83b00b3e-f4ea-4b78-97d2-be382dc04885/eUl1dff9FS.lottie',
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
*/
