import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import cartelClases from "@/assets/clases/tango-class.jpg";

const Classes = () => {
  const contactInfo = {
    email: {
      label: "Email",
      value: "valeriavegatango@gmail.com",
      href: "mailto:valeriavegatango@gmail.com",
    },
    whatsapp: {
      label: "Cel / WhatsApp",
      value: "55 2900 9002",
      href: "https://wa.me/525529009002",
    },
    instagram: {
      label: "Instagram",
      value: "@valeriavegadanza",
      href: "https://instagram.com/valeriavegadanza",
    },
    facebook: {
      label: "Facebook",
      value: "Valeria Vega Danza",
      href: "https://facebook.com/valeriavegadanza",
    },
  };

  return (
    <main className="min-h-screen relative pt-20 overflow-hidden bg-black">
      {/* Fondos: idénticos a Events.tsx */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-violet-500/5 to-rose-500/5" />

      <section className="relative z-10 min-h-[calc(100vh-5rem)] max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-right mb-14 animate-slide-up motion-reduce:animate-none">
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-8 tracking-tight">
            Clases
          </h1>
          <div className="w-24 h-px bg-cultural ml-auto mr-0 opacity-60" />
        </header>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Cartel a la izquierda */}
          <figure className="group lg:col-span-5 animate-fade-in motion-reduce:animate-none">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-5 rounded-[2.8rem] bg-gradient-to-br from-tango/35 via-accent/20 to-cultural/25 blur-2xl opacity-60 transition-all duration-700 group-hover:opacity-95 group-hover:scale-105" />

              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 bg-card/35 p-2 backdrop-blur-sm border border-border/40 transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.01] group-hover:border-cultural/45 group-hover:shadow-cultural/15">
                <img
                  src={cartelClases}
                  alt="Cartel de clases privadas de Tango Argentino"
                  className="w-full h-auto object-contain rounded-[1.5rem] transition-transform duration-700 group-hover:scale-[1.035]"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </div>
          </figure>

          {/* Texto y contacto */}
          <div className="lg:col-span-7 animate-fade-in motion-reduce:animate-none">
            <div className="max-w-2xl lg:ml-auto">
              <h2 className="font-serif text-4xl md:text-6xl font-light text-cultural leading-tight mb-8">
                Clases privadas Personalizadas
              </h2>

              <p className="text-white/80 font-light leading-relaxed text-lg md:text-xl [text-wrap:pretty] mb-12">
                Valeria Vega ofrece clases privadas personalizadas de danza, con
                especial atención al Tango Argentino. Desde hace más de 20 años
                ejerce la docencia a partir de un método propio, centrado en la
                conexión, la conciencia corporal y el trabajo técnico desde la
                relajación y la organicidad.
              </p>

              <div className="border-t border-cultural/25 pt-8">
                <p className="uppercase tracking-[0.25em] text-xs text-white/50 font-light mb-6">
                  Datos de contacto
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <a
                    href={contactInfo.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-white/[0.055] px-4 py-3 text-white/80 shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.095] hover:text-white hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="Contactar por WhatsApp"
                  >
                    <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15 group-hover:text-white">
                      <Phone className="w-5 h-5" />
                    </span>

                    <span>
                      <span className="block text-xs uppercase tracking-wide text-white/45">
                        {contactInfo.whatsapp.label}
                      </span>
                      <span className="block font-light text-lg">
                        {contactInfo.whatsapp.value}
                      </span>
                    </span>
                  </a>

                  <a
                    href={contactInfo.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-white/[0.055] px-4 py-3 text-white/80 shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.095] hover:text-white hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="Visitar Instagram"
                  >
                    <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15 group-hover:text-white">
                      <Instagram className="w-5 h-5" />
                    </span>

                    <span>
                      <span className="block text-xs uppercase tracking-wide text-white/45">
                        {contactInfo.instagram.label}
                      </span>
                      <span className="block font-light text-lg">
                        {contactInfo.instagram.value}
                      </span>
                    </span>
                  </a>

                  <a
                    href={contactInfo.facebook.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-white/[0.055] px-4 py-3 text-white/80 shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.095] hover:text-white hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="Visitar Facebook"
                  >
                    <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15 group-hover:text-white">
                      <Facebook className="w-5 h-5" />
                    </span>

                    <span>
                      <span className="block text-xs uppercase tracking-wide text-white/45">
                        {contactInfo.facebook.label}
                      </span>
                      <span className="block font-light text-lg">
                        {contactInfo.facebook.value}
                      </span>
                    </span>
                  </a>

                  <a
                    href={contactInfo.email.href}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-white/[0.055] px-4 py-3 text-white/80 shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.095] hover:text-white hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="Enviar correo electrónico"
                  >
                    <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15 group-hover:text-white">
                      <Mail className="w-5 h-5" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wide text-white/45">
                        {contactInfo.email.label}
                      </span>
                      <span className="block font-light text-base break-all">
                        {contactInfo.email.value}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Classes;
