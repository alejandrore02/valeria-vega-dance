import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Instagram, Facebook, Music } from "lucide-react";

// Import images
import damaPuerto from "@/assets/shows/dama/dama-del-puerto.webp";
import rebozo from "@/assets/shows/rebozo/rebozo.webp";
import valeriaDancer from "@/assets/fotos/horacio_vale_color.jpg";
import tangoClass from "@/assets/clases/tango-class.jpg";

const Contact = () => {
  // Carrusel sin controles (fade auto)
  const carouselImages = [
    { src: damaPuerto, alt: "La Dama del Puerto" },
    { src: rebozo, alt: "Rebozo" },
    { src: valeriaDancer, alt: "Valeria bailando" },
    { src: tangoClass, alt: "Clase de Tango" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "valeriavegatango@gmail.com",
      href: "mailto:valeriavegatango@gmail.com",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "55 2900 9002",
      href: "https://wa.me/525529009002",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@valeriavegadanza",
      href: "https://instagram.com/valeriavegadanza",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Valeria Vega Danza",
      href: "https://facebook.com/valeriavegadanza",
    },
    {
      icon: Music,
      label: "TikTok",
      value: "@valeriavegadanza",
      href: "https://tiktok.com/@valeriavegadanza",
    },
  ];

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Autoplay (fade suave), sin controles
  useEffect(() => {
    if (paused) return;
    intervalRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % carouselImages.length);
    }, 5500); // 5.5s por imagen
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [paused, carouselImages.length]);

  // Preload para evitar “saltos”
  useEffect(() => {
    carouselImages.forEach(({ src }) => {
      const im = new Image();
      im.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-right mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-serif font-light text-primary mb-8">
            Contacto
          </h1>
          <div className="w-24 h-px bg-cultural ml-auto mr-0 opacity-60" />
        </div>

        {/* Split layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Izquierda: carrusel full-bleed, SIN bordes ni márgenes */}
          <section
            className="relative col-span-1 lg:col-span-7 h-[22rem] md:h-[34rem] lg:h-[40rem] overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Galería de contacto"
            tabIndex={0}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="absolute inset-0">
              {carouselImages.map((img, i) => {
                const active = i === idx;
                return (
                  <img
                    key={img.alt}
                    src={img.src}
                    alt=""
                    aria-hidden={!active}
                    className={[
                      "absolute inset-0 w-full h-full object-cover select-none pointer-events-none",
                      // Fade elegante y más suave
                      "transition-opacity duration-[3400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
                      // Bordes difuminados y sombra
                      "rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-black/30",
                      "[mask-image:radial-gradient(circle_at_center,white_80%,transparent_100%)]",
                      active ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                );
              })}
            </div>

            {/* Vignette sutil para legibilidad si pones texto encima en el futuro */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15" />

            {/* Divisor vertical para separar visualmente (no es borde de foto) */}
            <div className="hidden lg:block absolute right-0 top-6 bottom-6 w-px bg-border/40" />
          </section>

          {/* Derecha: panel de contacto sticky */}
          <aside className="col-span-1 lg:col-span-5">
            <div className="lg:sticky lg:top-24 lg:pl-10">
              {/* Acciones primarias */}
              <div className="space-y-3 mb-8">
                {contactInfo.slice(0, 2).map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl bg-card/10 hover:bg-card/15
                               px-4 py-3 transition-all duration-300 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/6 group-hover:bg-accent/10 flex items-center justify-center">
                      <c.icon className="w-5 h-5 text-accent/70 group-hover:text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] uppercase tracking-wide text-muted-foreground/80">
                        {c.label}
                      </div>
                      <div className="text-sm md:text-[15px] text-foreground/90 font-light truncate">
                        {c.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Redes secundarias */}
              <div className="rounded-xl bg-card/5 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {contactInfo.slice(2).map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-card/10"
                    >
                      <div className="w-9 h-9 rounded-full bg-accent/6 group-hover:bg-accent/10 flex items-center justify-center">
                        <c.icon className="w-4 h-4 text-accent/70 group-hover:text-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-wide text-muted-foreground/80">
                          {c.label}
                        </div>
                        <div className="text-[13px] text-foreground/90 font-light truncate">
                          {c.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Reduced motion y mejora de transición difusa */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          img { transition: none !important; }
        }
        /* Suaviza el borde del mask para navegadores que soportan mask-image */
        img[style*="mask-image"], img[class*="mask-image"] {
          mask-image: radial-gradient(circle at center, white 80%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle at center, white 80%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

export default Contact;
