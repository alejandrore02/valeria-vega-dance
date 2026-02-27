import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, ExternalLink, X } from "lucide-react";

import rebozoFlyer from "@/assets/events/rebozo-postal.jpeg";
import varsoviaFlyer from "@/assets/events/rebozo-varsovia.jpeg";
import rebozoMarzoFlyer from "@/assets/events/rebozo-marzo.jpeg";
import lasOrquestasFlyer from "@/assets/events/las_orquestas_marzo.jpeg";
import laDamaFebFlyer from "@/assets/events/la_dama_feb.jpeg";
import detrasDeMinFlyer from "@/assets/events/detras-de-mi.jpeg";

type EventDate = {
  day: string;
  time?: string;
  label?: string; // ★ ej. "Viernes", "Sábado", "Domingo"
};

type EventItem = {
  dates: EventDate[];
  month: string;
  year: string;
  title: string;
  subtitle?: string; // ★ subtítulo opcional bajo el título
  location: string;
  address: string; // dirección fija siempre
  gradient: string;
  flyer: string;
  description?: string;
  ticketUrl?: string;

  // ★ Flex extra para textos complejos
  dateText?: string; // si lo pones, se muestra en vez del rango calculado
  notes?: string[]; // bullets: precio, descuentos, taquilla, etc.
  tags?: string[]; // chips opcionales
  reservationUrl?: string; // ★ botón para WhatsApp u otro canal
};

const Events = () => {
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventItem | null>(null);

  // Helper function to check if an event has passed
  function hasEventPassed(event: EventItem): boolean {
    const now = new Date();
    const monthMap: { [key: string]: number } = {
      Enero: 0,
      Febrero: 1,
      Marzo: 2,
      Abril: 3,
      Mayo: 4,
      Junio: 5,
      Julio: 6,
      Agosto: 7,
      Septiembre: 8,
      Octubre: 9,
      Noviembre: 10,
      Diciembre: 11,
    };

    const monthIndex = monthMap[event.month];
    if (monthIndex === undefined) return false;

    // Get the last date of the event
    const lastDate = event.dates[event.dates.length - 1];
    const lastDay = parseInt(lastDate.day);
    const year = parseInt(event.year);

    // Create date for the last day of the event at end of day (23:59:59)
    const eventEndDate = new Date(year, monthIndex, lastDay, 23, 59, 59);

    return now > eventEndDate;
  }

  const allEvents: EventItem[] = [
    {
      dates: [
        { day: "26", time: "20:00 hrs", label: "Jueves" },
        { day: "27", time: "20:00 hrs", label: "Viernes" },
        { day: "28", time: "19:00 hrs", label: "Sábado" },
        { day: "29", time: "18:00 hrs", label: "Domingo" },
      ],
      month: "Marzo",
      year: "2026",
      title: "Detrás de mi",
      subtitle: "de mujeres y tango",
      location: "Teatro Varsovia",
      address: "Teatro Varsovia, Ciudad de México",
      gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
      flyer: detrasDeMinFlyer,
      dateText: "26 al 29 de marzo 2026",
      notes: [
        "Jueves y viernes 20 hrs, sábado 19 hrs, domingo 18 hrs",
        "Boletos en Ticketmaster",
      ],
      ticketUrl:
        "https://www.ticketmaster.com.mx/search?q=detras+de+mi+de+mujeres+y+tangos",
    },
    {
      dates: [
        { day: "11", time: "20:00 hrs", label: "Martes" },
        { day: "18", time: "20:00 hrs", label: "Martes" },
      ],
      month: "Febrero",
      year: "2026",
      title: "REBOZO",
      location: "Teatro Varsovia",
      address: "Teatro Varsovia, Ciudad de México",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
      flyer: rebozoMarzoFlyer,
      description:
        "Espectáculo unipersonal de música, danza y teatro, que aborda el proceso de elaboración del REBOZO, la prenda tradicional mexicana por excelencia, en una metáfora del tejido de la vida misma.",
      dateText: "11 y 18 de febrero 2026",
      notes: ["Boleto $350"],
    },
    {
      dates: [
        { day: "8", time: "12:00 hrs", label: "Sábado" },
        { day: "8", time: "17:00 hrs", label: "Sábado" },
        { day: "15", time: "12:00 hrs", label: "Sábado" },
        { day: "15", time: "17:00 hrs", label: "Sábado" },
      ],
      month: "Marzo",
      year: "2026",
      title: "Las Orquestas",
      location: "Sala Julián Carrillo Radio UNAM",
      address: "Adolfo Prieto 133, Col. Del Valle, Ciudad de México",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      flyer: lasOrquestasFlyer,
      description:
        'iO artes escénicas y La Virtud Producciones presentan "Las Orquestas" de Valeria Vega Solórzano.',
      dateText: "8 y 15 de marzo 2026",
      notes: ["Contacto: 5529009002"],
    },
    {
      dates: [
        { day: "13", time: "20:00 hrs", label: "Viernes" },
        { day: "20", time: "20:00 hrs", label: "Viernes" },
        { day: "27", time: "20:00 hrs", label: "Viernes" },
      ],
      month: "Marzo",
      year: "2026",
      title: "LA DAMA DEL PUERTO",
      location: "Teatro Varsovia",
      address: "Teatro Varsovia, Ciudad de México",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      flyer: laDamaFebFlyer,
      description:
        "Una noche. Dos hombres. Una sola elección. ¡Un espectáculo único de tango!",
      dateText: "13, 20 y 27 de marzo 2026",
      notes: ["Boleto $400", "Boletos en taquilla y ticketmaster.com.mx"],
      ticketUrl: "https://www.ticketmaster.com.mx/search?q=la+dama+del+puerto",
    },
    {
      dates: [
        { day: "28", time: "19:00 hrs", label: "Viernes" },
        { day: "29", time: "16:00 hrs", label: "Sábado" },
        { day: "30", time: "13:00 hrs", label: "Domingo" },
      ],
      month: "Noviembre",
      year: "2025",
      title: "REBOZO",
      location: "Museo Casa de la Cultura Postal",
      address:
        "C. Valentín Gómez Farías 52, San Rafael Cuauhtémoc, 06470, CDMX",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      flyer: rebozoFlyer,
      description:
        "Espectáculo unipersonal de música, danza y teatro, que aborda el proceso de elaboración del REBOZO, la prenda tradicional mexicana por excelencia, en una metáfora del tejido de la vida misma.",
      dateText: "28, 29 y 30 de noviembre 2025",
      notes: [
        "Boleto $250",
        "Descuentos a estudiantes e INAPAM",
        "Boletos en taquilla",
      ],
      reservationUrl: "https://wa.me/525513361466",
    },
  ];

  // Filter out past events
  const events = allEvents.filter((event) => !hasEventPassed(event));

  function openEventDetails(event: EventItem) {
    setCurrentEvent(event);
    setOpen(true);
  }

  function formatDateRange(
    dates: EventDate[],
    month: string,
    year: string,
  ): string {
    if (dates.length === 0) return "";
    if (dates.length === 1) return `${dates[0].day} ${month} ${year}`;
    const days = dates.map((d) => d.day).join(", ");
    return `${days} ${month} ${year}`;
  }

  // ★ usa dateText si viene
  function formatDateDisplay(event: EventItem): string {
    return (
      event.dateText?.trim() ||
      formatDateRange(event.dates, event.month, event.year)
    );
  }

  return (
    <div className="min-h-screen bg-black relative pt-20">
      {/* Fondos */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-violet-500/5 to-rose-500/5" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="font-serif tracking-tight text-5xl md:text-7xl font-light text-white mb-6">
            Próximos Eventos
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60 mb-6" />
          <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto">
            Descubre los próximos espectáculos
          </p>
        </div>

        {/* Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {events.map((event, index) => (
              <div
                key={`${event.title}-${event.year}`}
                role="button"
                tabIndex={0}
                onClick={() => openEventDetails(event)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openEventDetails(event);
                  }
                }}
                className="group relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer animate-fade-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                style={{ animationDelay: `${index * 0.15}s` }}
                aria-label={`Ver detalles de ${event.title}`}
              >
                {/* ★ IMAGEN RESPONSIVA SIN RECORTE
                    Usamos aspect-ratio para que el flyer se vea completo en móvil y desktop */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                  {/* Fondo cover blur para llenar el card */}
                  <img
                    src={event.flyer}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40"
                  />
                  {/* Flyer principal sin recorte */}
                  <img
                    src={event.flyer}
                    alt={event.title}
                    className="relative z-10 mx-auto h-full w-auto max-w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Velo sutil */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${event.gradient} opacity-15 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Badge fecha flexible */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/45 text-white backdrop-blur-sm rounded-lg border border-white/15">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs sm:text-sm font-medium tracking-wide">
                        {formatDateDisplay(event)}
                      </span>
                    </div>
                  </div>

                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white text-sm sm:text-lg font-medium tracking-wide px-6 py-2 sm:py-3 border border-white/40 rounded-full backdrop-blur-sm">
                      Ver Detalles
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="relative p-5 sm:p-6 space-y-4">
                  <div
                    className={`w-16 sm:w-20 h-1 bg-gradient-to-r ${event.gradient} group-hover:w-28 sm:group-hover:w-32 transition-all duration-500 rounded-full`}
                  />
                  <h3 className="font-serif tracking-tight text-2xl md:text-3xl font-normal text-white leading-tight">
                    {event.title}
                  </h3>
                  {event.subtitle && (
                    <p className="font-sans text-sm text-white/60 italic mt-1">
                      {event.subtitle}
                    </p>
                  )}

                  <div className="space-y-2">
                    {/* Dirección fija */}
                    <div className="flex items-start gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">{event.location}</div>
                        <div className="text-gray-400">{event.address}</div>
                      </div>
                    </div>

                    {/* Horarios o notas (flex) */}
                    {event.dates.some((d) => d.time) ? (
                      <div className="flex items-start gap-2 text-gray-300">
                        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          {event.dates.map((d, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span>
                                {d.label ?? `${d.day} ${event.month}`}
                              </span>
                              {d.time && (
                                <span className="text-gray-400">
                                  • {d.time}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : event.notes?.length ? (
                      <ul className="text-sm text-gray-300 list-disc ml-6">
                        {event.notes.slice(0, 2).map((n, i) => (
                          <li key={i}>{n}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>

                {/* Glow */}
                <div
                  className={`pointer-events-none absolute -inset-1 bg-gradient-to-r ${event.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
              <Calendar className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="font-serif text-2xl text-white/80 mb-3">
              Próximamente
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Estamos preparando nuevos eventos. Mantente al tanto en nuestras
              redes sociales para conocer las fechas.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setCurrentEvent(null);
        }}
      >
        <DialogContent className="max-w-[min(980px,95vw)] w-[95vw] max-h-[90vh] p-0 overflow-hidden bg-zinc-950/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl [&>button[class*='sr-only']]:hidden">
          {currentEvent && (
            <div className="relative h-full">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md border border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-all duration-200"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-0 h-full max-h-[90vh]">
                {/* ★ Imagen: oculta en móviles (md:block) */}
                <div className="hidden md:block relative overflow-hidden">
                  <img
                    src={currentEvent.flyer}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40"
                  />
                  <img
                    src={currentEvent.flyer}
                    alt={currentEvent.title}
                    className="relative z-10 mx-auto h-full w-auto max-w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${currentEvent.gradient} opacity-15`}
                  />
                </div>

                {/* ★ Contenido: full-width en móviles, scroll habilitado */}
                <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[90vh]">
                  <div>
                    <div
                      className={`w-16 h-1 bg-gradient-to-r ${currentEvent.gradient} rounded-full mb-4`}
                    />
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-1 leading-tight">
                      {currentEvent.title}
                    </h2>
                    {currentEvent.subtitle && (
                      <p className="font-sans text-base text-white/60 italic mb-2">
                        {currentEvent.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-white/60">
                      {formatDateDisplay(currentEvent)}
                    </p>
                  </div>

                  <div className="space-y-5 text-gray-200">
                    {/* Fechas detalladas */}
                    {currentEvent.dates.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5 text-white/60" />
                        <div className="flex-1">
                          <p className="text-sm text-white/50 mb-2">Fechas</p>
                          <div className="space-y-1">
                            {currentEvent.dates.map((date, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between gap-2"
                              >
                                <span className="text-base">
                                  {date.label
                                    ? `${date.label} ${date.day} ${currentEvent.month} ${currentEvent.year}`
                                    : `${date.day} ${currentEvent.month} ${currentEvent.year}`}
                                </span>
                                <div className="text-sm text-white/60">
                                  {date.time}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dirección */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-white/60" />
                      <div>
                        <p className="text-sm text-white/50 mb-1">Lugar</p>
                        <p className="text-base font-medium">
                          {currentEvent.location}
                        </p>
                        <p className="text-sm text-white/60 mt-1">
                          {currentEvent.address}
                        </p>
                      </div>
                    </div>

                    {/* Notas (precio, descuentos, taquilla, etc.) */}
                    {currentEvent.notes?.length ? (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-sm text-white/50 mb-2">
                          Información
                        </p>
                        <ul className="text-base leading-relaxed list-disc ml-6">
                          {currentEvent.notes.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {/* Descripción */}
                    {currentEvent.description && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-base leading-relaxed">
                          {currentEvent.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {currentEvent.ticketUrl && (
                      <a
                        href={currentEvent.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r ${currentEvent.gradient} text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
                      >
                        <span>Boletos</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {currentEvent.reservationUrl && (
                      <a
                        href={currentEvent.reservationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                      >
                        Reservar por WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
