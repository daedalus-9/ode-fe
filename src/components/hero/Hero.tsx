import { PlaceTruckForm } from "../placeTruckForm/PlaceTruckForm";
import Content from "./Content";

export const Hero = () => {
  return (
    <div className="relative flex flex-col text-zinc-50">
      {/* Hero Section */}
      <section
        className="relative flex w-full items-center justify-center bg-cover bg-center px-6 py-12 md:py-24 lg:min-h-screen"
        style={{ backgroundImage: "url('/assets/images/truck_bg.webp')" }}
      >
        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-900/70 to-zinc-950/90" />

        {/* Main container */}
        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-12 lg:flex-row lg:gap-24">
          {/* Form */}
         
            <PlaceTruckForm className="shadow-2xl" />
        

          {/* Content */}
          <div className="hidden w-full flex-col text-center lg:flex lg:w-1/2 lg:items-start lg:text-left">
            <Content />
          </div>
        </div>
      </section>
    </div>
  );
};
