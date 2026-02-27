import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, X } from "lucide-react";
import valeriaDancer from "@/assets/fotos/valeria-portada.jpg";
import logo from "@/assets/logo.png";

const SESSION_KEY = "io.eventsPromo.seen.v3";

const Home = () => {
  const [showEventsPromo, setShowEventsPromo] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const forceOpen = params.get("showEvents") === "1";

    if (forceOpen) {
      sessionStorage.removeItem(SESSION_KEY);
      setShowEventsPromo(true);
      return;
    }

    const eventsSeen = sessionStorage.getItem(SESSION_KEY) === "1";

    if (!eventsSeen) {
      const timer = setTimeout(() => setShowEventsPromo(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [search]);

  function closeEventsPromo() {
    setShowEventsPromo(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  }

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

      {/* Modal de Eventos */}
      <Dialog
        open={showEventsPromo}
        onOpenChange={(v) =>
          v ? setShowEventsPromo(true) : closeEventsPromo()
        }
      >
        <DialogContent
          className="
            z-[999] p-0 max-w-[min(600px,92vw)] overflow-hidden rounded-2xl border-0
            [&>button]:hidden
            data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-500 data-[state=open]:ease-out
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-300
          "
        >
          {/* Marco con degradado ligero rojo/rosa/púrpura */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-rose-900/25 via-purple-900/20 to-red-900/30">
            {/* Capa interna: más transparente con degradado suave */}
            <div className="relative rounded-2xl bg-gradient-to-br from-black/40 via-zinc-900/50 to-black/45 backdrop-blur-xl border border-white/10 shadow-2xl">
              {/* Auroras ligeras en tonos rojo/rosa/púrpura */}
              <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-800/12 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-800/10 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 opacity-25">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-rose-700/12 via-purple-800/10 to-red-900/8 blur-3xl rounded-full" />
              </div>

              {/* Botón cerrar minimalista */}
              <button
                onClick={closeEventsPromo}
                className="absolute top-4 right-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full
                           bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10 backdrop-blur-sm transition-all duration-200
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800/40"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Contenido */}
              <div className="relative px-10 py-14 sm:px-12 sm:py-16 text-center space-y-8">
                {/* Icono con acento rojo/rosa sutil */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mx-auto">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-35
                                  bg-gradient-to-br from-rose-800/40 via-red-800/25 to-purple-900/20"
                  />
                  <div
                    className="relative flex items-center justify-center w-20 h-20 rounded-full border border-white/10
                                  bg-gradient-to-br from-zinc-900/80 via-zinc-800/70 to-black/80 shadow-lg"
                  >
                    <Calendar
                      className="w-9 h-9 text-red-50/90"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Título elegante con mayor peso tipográfico */}
                <div className="space-y-4">
                  <h2 className="font-serif text-4xl md:text-5xl font-extralight text-white tracking-wide leading-tight">
                    Próximos Eventos
                  </h2>
                  <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-rose-800/60 to-transparent" />
                </div>

                {/* Texto más refinado */}
                <p className="font-sans text-base md:text-lg text-zinc-200/85 leading-relaxed max-w-sm mx-auto font-light">
                  Descubre la cartelera y reserva tu lugar para las siguientes
                  funciones.
                </p>

                {/* CTA elegante con acento rojo sutil */}
                <Link
                  to="/events"
                  onClick={closeEventsPromo}
                  className="inline-flex items-center justify-center gap-3 px-10 py-4
                             bg-white text-zinc-950 font-medium tracking-wide rounded-full
                             hover:bg-red-50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800/40 border border-zinc-200/20"
                >
                  <span className="text-[15px]">Ver Eventos</span>
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
