import {
    UserMinus,
    UserCheck,
    BicepsFlexed,
    ArrowUpToLine,
    ChevronsUp,
    PersonStanding,
    CookingPot,
  } from 'lucide-react';
  
  export const iconosPorTipo = {
    UserMinus: <UserMinus />,
    UserCheck: <UserCheck />,
    BicepsFlexed: <BicepsFlexed />,
    ArrowUpToLine: <ArrowUpToLine />,
    ChevronsUp: <ChevronsUp />,
    PersonStanding: <PersonStanding />,
    CookingPot: <CookingPot />,
  };
  
  // para despues importarla en menudetalle
  export function getIconoPorTipo2(tipo?: string) {
    return iconosPorTipo[tipo as keyof typeof iconosPorTipo] ?? (
        <CookingPot className="absolute right-0 top-0 h-[100vh] w-[100vw] opacity-5 z-[-1] pointer-events-none" 
             
        />
    );
}




  