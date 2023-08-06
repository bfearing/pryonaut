import { Icons } from "./icons";

const Loading = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <Icons.logo className="flex w-20 h-20 animate-[spin_3s_linear_infinite]" />
      <h2 className="tracking-tight">{text}</h2>
    </div>
  );
};

export default Loading;
