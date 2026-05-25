import { Info } from "lucide-react";

interface HeroBannerProps {
  title: string;
  description: string;
  image: string;
}

export function HeroBanner({ title, description, image }: HeroBannerProps) {
  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] w-full">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent md:from-black/80 md:via-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="relative h-full flex items-end sm:items-center px-4 sm:px-6 md:px-12 pb-20 sm:pb-0">
        <div className="max-w-xl lg:max-w-2xl space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-200 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
            {description}
          </p>
          <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
            <button className="bg-zinc-600/70 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded text-sm sm:text-base font-semibold flex items-center gap-1.5 sm:gap-2 hover:bg-zinc-600 active:bg-zinc-700 transition touch-manipulation">
              <Info className="size-4 sm:size-5 md:size-6" />
              <span className="hidden xs:inline">More Info</span>
              <span className="xs:hidden">Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
