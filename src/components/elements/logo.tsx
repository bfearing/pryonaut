import { Icons } from "./icons";

const Logo = () => (
  <div className="relative z-20 flex items-center text-lg font-medium">
    <Icons.logo className="flex w-6 h-6 mr-2 animate-[spin_3s_linear_infinite]" />
    Pryonaut
  </div>
);

export default Logo;
