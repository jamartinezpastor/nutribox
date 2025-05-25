import LottieLogoMain from './LottieLogoMain';

export default function AppLogo() {
    return (
        <div className="relative flex h-12 w-[200px] items-center"> 
            <LottieLogoMain />
        </div>
    );
}

{
    /*  <DotLottieReact src="https://lottie.host/a8a30e2d-0bc2-413e-a645-28af544a6a27/Elc4HLwLqH.json" loop autoplay /> */
}
/*  
import AppLogoIcon from './app-logo-icon';
export default function AppLogo() {
    return (
        <>      
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />             
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-bold">NUTRIBOX</span>
            </div>  
        </>
    );
}
*/
