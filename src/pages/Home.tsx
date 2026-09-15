import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import valeriaDancer from "@/assets/fotos/valeria-portada.jpg";
import logo from "@/assets/logo.png";
import rebozoMichoacanBanner from "@/assets/events/BannerWebInfo.png";

const SESSION_KEY = "io.eventsPromo.seen.v3";

const Home = () => {
  const { search } = useLocation();
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const forceOpen = params.get("showEvents") === "1";

    if (forceOpen) {
      sessionStorage.removeItem(SESSION_KEY);
      setIsPromoOpen(true);
      return;
    }

    if (!sessionStorage.getItem(SESSION_KEY)) {
      setIsPromoOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [search]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={valeriaDancer}
          alt=""
          className="w-full h-full object-cover motion-safe:animate-glow"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-left px-6 lg:px-8 xl:px-48 flex flex-col items-center lg:items-start w-full">
        <div className="motion-safe:animate-slide-up flex flex-col items-center w-full lg:items-start">
          <img
            src={logo}
            alt="Logo Valeria Vega"
            className="mb-12 w-48 sm:w-64 md:w-[80%] lg:w-[32rem] motion-safe:animate-breathe"
            style={{ maxWidth: "32rem" }}
          />
          {/* sin más CTAs para no duplicar */}
        </div>
      </div>

      <Dialog open={isPromoOpen} onOpenChange={setIsPromoOpen}>
        <DialogContent
          className="
            z-[999] p-0 max-w-[min(520px,92vw)] overflow-hidden rounded-2xl border-0 bg-transparent shadow-2xl
            [&>button]:hidden
            data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-500 data-[state=open]:ease-out
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-300
          "
        >
          <Link to="/events" onClick={() => setIsPromoOpen(false)}>
            <img
              src={rebozoMichoacanBanner}
              alt="REBOZO - Gira Michoacán, 23 al 27 de septiembre"
              className="block w-full h-auto rounded-2xl"
            />
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
