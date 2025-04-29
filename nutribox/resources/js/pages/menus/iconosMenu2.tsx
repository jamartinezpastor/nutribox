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
    UserMinus: <UserMinus className="absolute right-0 top-0 h-[100vh] w-[100vw] opacity-5 z-[-1] pointer-events-none"/>,
    UserCheck: <UserCheck className="absolute right-0 top-0 h-[100vh] w-[100vw] opacity-5 z-[-1] pointer-events-none" />,
    BicepsFlexed: <BicepsFlexed className="absolute right-0 top-0 h-[100vh] w-[100vw] opacity-5 z-[-1] pointer-events-none"/>,
    ArrowUpToLine: <ArrowUpToLine className="absolute right-0 top-0 h-[100vh] w-[100vw] opacity-5 z-[-1] pointer-events-none"/>,
    ChevronsUp: <ChevronsUp className="absolute right-0 top-0 h-[100vh] w-[100vw] opacity-5 z-[-1] pointer-events-none"/>,
    PersonStanding: <PersonStanding className="absolute right-0 top-0 h-[100vh] w-[100vw] opacity-5 z-[-1] pointer-events-none"/>,
    CookingPot: <CookingPot className="absolute right-0 top-0 h-[100vh] w-[100vw] opacity-5 z-[-1] pointer-events-none" />,
  };
  
  // para despues importarla en menudetalle
  export function getIconoPorTipo2(tipo?: string) {
    return iconosPorTipo[tipo as keyof typeof iconosPorTipo] ?? (
        <CookingPot className="absolute right-0 top-0 h-[100vh] w-[100vw] opacity-5 z-[-1] pointer-events-none" 
             
        />
    );
}




  