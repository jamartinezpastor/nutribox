import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieWelcome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animacionLottie = lottie.loadAnimation({
      container: containerRef.current!,
      renderer: 'html',
      loop: true,
      autoplay: true,
      path: 'lottie/nutriboxwelcome.json', 
      rendererSettings: {
        imagePreserveAspectRatio: 'xMidYMid slice'
      },
    });

    return () => {
      animacionLottie.destroy();
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto h-[350px] lg:h-[450px]">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{}}
      />
    </div>
  );
};

export default LottieWelcome;
