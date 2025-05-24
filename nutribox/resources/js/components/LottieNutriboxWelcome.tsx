import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieNutriboxWelcome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animacionLottie = lottie.loadAnimation({
      container: containerRef.current!,
      renderer: 'html',
      loop: true,
      autoplay: true,
      path: 'lottie/nutriboxwelcome.json',
    });

    return () => {
      animacionLottie.destroy();
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div ref={containerRef} style={{ height: 450 }} />
    </div>
  );
};

export default LottieNutriboxWelcome;
