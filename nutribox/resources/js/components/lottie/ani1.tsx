import React from 'react';
import Lottie from 'lottie-react';
import animacionData from './prueba1-n.json';

const AnimacionLottie1: React.FC = () => {
  return (
    <div className="w-64 h-64">
      <Lottie animationData={animacionData} loop={true} />
    </div>
  );
};

export default AnimacionLottie1;
