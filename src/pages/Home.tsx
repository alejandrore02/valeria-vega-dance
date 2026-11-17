import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import valeriaDancer from "@/assets/fotos/valeria-portada.jpg";
import logo from "@/assets/logo.png";
import almaComunBanner from "@/assets/almacomun/banner-540.webp";

const Home = () => {
  const { search } = useLocation();
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const showAlmaComun = new Date() <= new Date(2026, 10, 24, 23, 59, 59);

  useEffect(() => {
    if (!showAlmaComun) return;

    const forceOpen = new URLSearchParams(search).get("showEvents") === "1";
    if (forceOpen) sessionStorage.removeItem("io.eventsPromo.alma-comun");

    if (forceOpen || !sessionStorage.getItem("io.eventsPromo.alma-comun")) {
      setIsPromoOpen(true);
      sessionStorage.setItem("io.eventsPromo.alma-comun", "1");
    }
  }, [search, showAlmaComun]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-12">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={valeriaDancer}
          alt=""
          className="w-full h-full object-cover motion-safe:animate-glow"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 px-6 lg:flex-row lg:gap-12 lg:px-8">
        <img
          src={logo}
          alt="Logo Valeria Vega"
          className="w-48 sm:w-64 lg:w-[min(45%,32rem)] motion-safe:animate-breathe"
        />

      </div>

      {showAlmaComun && (
        <Dialog open={isPromoOpen} onOpenChange={setIsPromoOpen}>
          <DialogContent
            aria-describedby={undefined}
            className="z-[999] w-auto max-w-[min(390px,80vw)] overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-2xl [&>button]:hidden"
          >
            <Link
              to="/events"
              onClick={() => setIsPromoOpen(false)}
              aria-label="El Alma Común, 24 de noviembre a las 20:00 h. Ver información y boletos"
            >
              <img
                src={almaComunBanner}
                alt="El Alma Común / Souls in Common. 24 de noviembre, 20:00 h. Stelaris Foro Reforma, Ciudad de México."
                width={540}
                height={699}
                className="block h-auto w-full"
              />
            </Link>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Home;
