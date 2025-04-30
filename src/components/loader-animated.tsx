import { Ripple } from "@/components/magicui/ripple";

const LoaderAnimated = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-center text-4xl font-medium whitespace-pre-wrap z-10 tracking-tighter text-white">
          Memuat...
        </span>
        <Ripple />
      </div>
    </div>
  );
};

export default LoaderAnimated;
