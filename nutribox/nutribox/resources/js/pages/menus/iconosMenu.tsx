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
  export function getIconoPorTipo(tipo?: string) {
    return iconosPorTipo[tipo as keyof typeof iconosPorTipo] ?? (
        <CookingPot 
             
        />
    );
}




  