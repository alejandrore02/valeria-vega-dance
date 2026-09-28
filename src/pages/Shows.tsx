import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Images, Play, X } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import lasOrquestasImg from "@/assets/shows/orquestas/Las_Orquestas_portada.jpeg";
import detrasDeMiImg from "@/assets/shows/detras/detras-pose.jpeg";
import detrasAbrazoImg from "@/assets/shows/detras/detras-abrazo.jpeg";
import detrasPisoImg from "@/assets/shows/detras/detras-piso.jpeg";
import detrasMesaImg from "@/assets/shows/detras/vale-mesa.jpg";
import rebozoImg from "@/assets/shows/rebozo/rebozo_portada.jpeg";
import rebozoSceneImg from "@/assets/shows/rebozo/rebozo.webp";
import valeriaRebozoImg from "@/assets/shows/rebozo/valeria-rebozo.webp";
import damaPuertoImg from "@/assets/shows/dama/dama-del-puerto.webp";
import damaPosterImg from "@/assets/varios/galeria/vale-dama-poster.jpg";
import suenoVeranoImg from "@/assets/shows/verano/sueno-verano.jpg";
import notasTangoImg from "@/assets/shows/notas/notas-del-tango.jpeg";
import manonTangoImg from "@/assets/shows/manon/manon-tango.jpeg";
import coloresTangoImg from "@/assets/shows/colores/colores-del-tango.jpeg";
import miTangoImg from "@/assets/varios/mi-tango.jpeg";
import queQuilomboImg from "@/assets/varios/que-quilombo.jpeg";
import tangoOleoImg from "@/assets/varios/tango-oleo.jpeg";
import ioTangoImg from "@/assets/shows/io/io-tango.jpg";
import malenaBailaImg from "@/assets/shows/malena/malena-baila.jpeg";
import valeBnImg from "@/assets/fotos/vale_bn.webp";

const lasOrquestasGallery = Object.entries(
  import.meta.glob("@/assets/las_orquestas/*.jpg", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => String(src));

type ShowDetails = {
  description: string[];
  duration: string;
  audience: string;
  presentations: string;
  highlightsTitle?: string;
  videoId?: string;
  gallery: string[];
};

type ShowItem = {
  year: string;
  title: string;
  gradient: string;
  image: string;
  details?: ShowDetails;
  gallery?: string[];
};

const shows: ShowItem[] = [
  {
    year: "2026",
    title: "LAS ORQUESTAS",
    gradient: "from-red-500 via-rose-500 to-pink-500",
    image: lasOrquestasImg,
    details: {
      duration: "60 min",
      audience: "Todo público",
      description: [
        "Las Orquestas es un espectáculo de tango-danza que rescata y rinde homenaje a la Época de Oro del Tango.",
        "Ocho entusiastas y comprometidos amantes del tango de distintas generaciones, acompañados por profesionales de la escena, muestran que todas las personas pueden disfrutar de esta bella danza.",
        "Las icónicas orquestas de Francisco Canaro, Carlos Di Sarli, Juan D’Arienzo, Osvaldo Pugliese y Aníbal Troilo son la columna vertebral de este viaje musical y emotivo por el universo del tango.",
      ],
      highlightsTitle: "La puesta",
      presentations:
        "Idea original, dirección y producción general de Valeria Vega Solórzano. El elenco reúne a Adriana Ontiveros, Alejandro Fragoso, Cecy Moreno, Fabiola Yáñez, Jorge Giordano, Leonardo Hernández, Tony Recoder y Verónica Solórzano.",
      gallery: lasOrquestasGallery,
    },
  },
  {
    year: "2025",
    title: "DETRÁS DE MÍ\nDE MUJERES Y TANGOS",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    image: detrasDeMiImg,
    details: {
      duration: "50 minutos",
      audience: "Adolescentes y adultos",
      description: [
        "¿Cuántas mujeres viven en ti? Detrás de mí; de mujeres y tangos es una obra escénica creada por Valeria Vega Solórzano que combina teatro, danza y tango para explorar el universo femenino desde sus múltiples facetas.",
        "Inspirada en Yerma, Carmen, Julieta y Lady Macbeth, invita a descubrir las emociones, contradicciones y fuerzas internas que habitan en cada mujer. Es una experiencia de autoconocimiento, aceptación y diálogo sobre la riqueza emocional y cíclica de lo femenino.",
      ],
      presentations:
        "iO Artes Escénicas ha presentado sus obras en foros como el CENART, Teatro de la Danza INBA, Teatro Ocampo, Festival Internacional de Danza de Oaxaca y Casa del Lago UNAM, entre otros.",
      videoId: "eyleItPM63A",
      gallery: [detrasDeMiImg, detrasAbrazoImg, detrasPisoImg, detrasMesaImg],
    },
  },
  {
    year: "2024",
    title: "REBOZO",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    image: rebozoImg,
    details: {
      duration: "60 minutos",
      audience: "Todo público",
      description: [
        "Espectáculo unipersonal de música, danza y teatro que aborda el proceso de elaboración del REBOZO, la prenda tradicional mexicana por excelencia, como metáfora del tejido de la vida misma.",
        "El rebozo es un legado divino: el arte del tejer encierra un conocimiento que va más allá de la tradición y recoge el espíritu de sobrevivencia de la mujer, madre, trabajadora, guerrera y de sus ancestros.",
        "La música original de Celso Duarte, la danza y el teatro son el vehículo para comunicar los dilemas de la existencia en tiempos donde podemos sentirnos sin rumbo.",
      ],
      presentations:
        "REBOZO se ha presentado en el H. Ayuntamiento de Morelia, Teatro Emperador Rey Caltzontzin en Pátzcuaro, Teatro Ocampo de Morelia, Teatro Varsovia CDMX, Museo Casa de la Cultura Postal, Centro Cultural Fábrica de San Pedro en Uruapan, Teatro Isabela Corona y Teatro Cuauhtémoc en Naucalpan. Ha ganado estímulos como PECDA Michoacán, EFI Danza y Escenarios IMSS.",
      videoId: "AHz-Shfcef8",
      gallery: [rebozoImg, rebozoSceneImg, valeriaRebozoImg],
    },
  },
  {
    year: "2018-2025",
    title: "LA DAMA DEL PUERTO",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    image: damaPuertoImg,
    details: {
      duration: "50 minutos · 3 artistas en escena",
      audience: "Todo público",
      description: [
        "La Dama del Puerto combina el arte escénico y la danza tango para crear una experiencia profundamente conmovedora. Bajo la dirección y coreografía de Valeria Vega Solórzano, explora el tango como lenguaje universal para narrar emociones y reflexiones sobre las decisiones humanas.",
        "A principios del siglo XX, Margot llega a un puerto con una maleta llena de sueños y un contrato arreglado como única certeza. Un triángulo amoroso y luchas de poder la conducen a decidir el rumbo de su vida.",
      ],
      presentations:
        "Estrenada en 2017 en el Festival de Tango del ISSSTE, CDMX. También se ha presentado en Teatro Ocampo de Morelia, Festival Quimera de Metepec, Festival del Desierto de Matehuala, Festival de las Artes de Ciudad del Carmen, Festival de Tango CENART, Teatro Varsovia y foros de CDMX, Querétaro, Toluca, Tepoztlán y San Miguel de Allende.",
      videoId: "pNxXRVUsSlo",
      gallery: [damaPuertoImg, damaPosterImg],
    },
  },
  {
    year: "2016",
    title: "SUEÑO DE UNA NOCHE DE VERANO",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    image: suenoVeranoImg,
  },
  {
    year: "2015",
    title: "LAS NOTAS DEL TANGO",
    gradient: "from-violet-500 via-purple-500 to-pink-500",
    image: notasTangoImg,
  },
  {
    year: "2015",
    title: "MANON, UN ÚLTIMO TANGO",
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    image: manonTangoImg,
  },
  {
    year: "2014",
    title: "LOS COLORES DEL TANGO",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    image: coloresTangoImg,
  },
  {
    year: "2013",
    title: "MI TANGO",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    image: miTangoImg,
  },
  {
    year: "2010",
    title: "QUÉ QUILOMBO, TANGO, TEATRO Y CABARET",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    image: queQuilomboImg,
  },
  {
    year: "2009",
    title: "TANGO, ÓLEO SOBRE TELA",
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    image: tangoOleoImg,
  },
  {
    year: "2008",
    title: "iO TANGO",
    gradient: "from-red-600 via-rose-600 to-pink-600",
    image: ioTangoImg,
  },
  {
    year: "2007",
    title: "JUERGA POR TANGOS",
    gradient: "from-purple-600 via-violet-600 to-indigo-600",
    image: valeBnImg,
  },
  {
    year: "2006",
    title: "MALENA BAILA EL TANGO",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    image: malenaBailaImg,
  },
];

const Shows = () => {
  const [open, setOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState<ShowItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryInteractionCount, setGalleryInteractionCount] = useState(0);
  const [detailGalleryIndex, setDetailGalleryIndex] = useState(0);
  const [detailGalleryInteractionCount, setDetailGalleryInteractionCount] =
    useState(0);

  const fullScreenGallery = currentShow?.gallery ?? [];
  const hasFullScreenGallery = fullScreenGallery.length > 0;
  const details = currentShow?.details;
  const detailGallery = details?.gallery ?? [];

  function openShow(show: ShowItem) {
    if (!show.details && !show.gallery?.length) return;
    setCurrentShow(show);
    setGalleryIndex(0);
    setDetailGalleryIndex(0);
    setDetailGalleryInteractionCount(0);
    setGalleryInteractionCount(0);
    setOpen(true);
  }

  function closeShow() {
    setOpen(false);
    setCurrentShow(null);
    setGalleryIndex(0);
    setDetailGalleryIndex(0);
    setDetailGalleryInteractionCount(0);
    setGalleryInteractionCount(0);
  }

  function showPreviousImage() {
    if (!fullScreenGallery.length) return;
    setGalleryInteractionCount((count) => count + 1);
    setGalleryIndex(
      (currentIndex) =>
        (currentIndex - 1 + fullScreenGallery.length) %
        fullScreenGallery.length,
    );
  }

  function showNextImage() {
    if (!fullScreenGallery.length) return;
    setGalleryInteractionCount((count) => count + 1);
    setGalleryIndex(
      (currentIndex) => (currentIndex + 1) % fullScreenGallery.length,
    );
  }

  useEffect(() => {
    if (!open || !hasFullScreenGallery || fullScreenGallery.length <= 1) return;
    const timer = window.setInterval(() => {
      setGalleryIndex(
        (currentIndex) => (currentIndex + 1) % fullScreenGallery.length,
      );
    }, 3500);
    return () => window.clearInterval(timer);
  }, [
    open,
    hasFullScreenGallery,
    fullScreenGallery.length,
    galleryInteractionCount,
  ]);

  function showPreviousDetailImage() {
    if (!detailGallery.length) return;
    setDetailGalleryInteractionCount((count) => count + 1);
    setDetailGalleryIndex(
      (currentIndex) =>
        (currentIndex - 1 + detailGallery.length) % detailGallery.length,
    );
  }

  function showNextDetailImage() {
    if (!detailGallery.length) return;
    setDetailGalleryInteractionCount((count) => count + 1);
    setDetailGalleryIndex(
      (currentIndex) => (currentIndex + 1) % detailGallery.length,
    );
  }

  useEffect(() => {
    if (!open || !details || detailGallery.length <= 1) return;

    const timer = window.setInterval(() => {
      setDetailGalleryIndex(
        (currentIndex) => (currentIndex + 1) % detailGallery.length,
      );
    }, 4500);

    return () => window.clearInterval(timer);
  }, [open, details, detailGallery.length, detailGalleryInteractionCount]);

  useEffect(() => {
    if (!open || !details || detailGallery.length <= 1) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") showPreviousDetailImage();
      if (event.key === "ArrowRight") showNextDetailImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, details, detailGallery.length]);

  useEffect(() => {
    if (!open || !hasFullScreenGallery) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, hasFullScreenGallery, fullScreenGallery.length]);

  return (
    <div className="min-h-screen bg-black relative pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-violet-500/5 to-emerald-500/5" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16 z-10">
        <div className="text-right mb-16 animate-slide-up">
          <h1 className="font-serif tracking-tight text-5xl md:text-7xl font-light text-white mb-6">
            Espectáculos
          </h1>
          <div className="w-24 h-px bg-cultural ml-auto mr-0 opacity-60 mb-6" />
        </div>

        <div className="mb-20 animate-fade-in" lang="es">
          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-sm border border-border/30">
            <h2 className="font-serif text-2xl md:text-3xl text-white tracking-tight mb-4">
              Acerca de iO Artes Escénicas
            </h2>
            <p className="font-sans text-[17px] leading-relaxed text-gray-200 text-justify">
              Sello fundado en 2006 por Valeria Vega Solórzano que utiliza el
              lenguaje teatral y dancístico para crear espectáculos que cuentan
              historias y transportan al espectador al encuentro con sus
              pasiones desde una concepción e interpretación propias. Reúne de
              manera independiente y por proyecto a distintos creadores:
              bailarines, iluminadores, escenógrafos, compositores, directores,
              dramaturgos, coreógrafos y diseñadores de vestuario.
            </p>
            <p className="mt-6 font-sans text-[17px] leading-relaxed text-gray-200 text-justify">
              A la fecha ha realizado 14 puestas en escena destacando “Malena
              baila el tango” (Foro de las Artes, CENART), iO Tango (Festival
              internacional de música de Morelia), “Detrás de mí, de mujeres y
              tangos” (Foro de las Artes, CENART y Teatro de la Danza, INBA),
              “Mi tango”, “Manon, un último tango”, “Los colores del tango”, “La
              dama del puerto”, “Las notas del tango” y “Mordisquito”.
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-serif tracking-tight text-3xl md:text-4xl font-light text-white mb-12 text-right">
            Producciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show, index) => {
              const isClickable = Boolean(show.details || show.gallery?.length);
              return (
                <div
                  key={`${show.year}-${show.title}`}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : -1}
                  onClick={() => openShow(show)}
                  onKeyDown={(event) => {
                    if (!isClickable) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openShow(show);
                    }
                  }}
                  className={[
                    "group relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 animate-fade-in",
                    isClickable
                      ? "hover:shadow-2xl hover:scale-[1.02] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      : "opacity-90",
                  ].join(" ")}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-label={isClickable ? `Ver ${show.title}` : undefined}
                >
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={show.image}
                      alt={show.title}
                      className="w-full h-full object-cover object-[50%_30%] transition-transform duration-400 group-hover:scale-[1.03]"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${show.gradient} opacity-10 group-hover:opacity-0 transition-opacity duration-500`}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium tracking-wide rounded-md border border-white/20 backdrop-blur-sm">
                        {show.year}
                      </span>
                    </div>
                    {isClickable && (
                      <div className="absolute bottom-4 right-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-xs tracking-wide rounded-md border border-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          {show.details ? (
                            <Play className="w-3.5 h-3.5" />
                          ) : (
                            <Images className="w-3.5 h-3.5" />
                          )}
                          {show.details ? "Ver espectáculo" : "Galería"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="relative p-6 space-y-4">
                    <div
                      className={`w-16 h-1 bg-gradient-to-r ${show.gradient} group-hover:w-24 transition-all duration-500 rounded-full`}
                    />
                    <h4 className="font-serif tracking-tight text-xl md:text-2xl font-normal text-white leading-snug whitespace-pre-line">
                      {show.title}
                    </h4>
                  </div>
                  <div
                    className={`pointer-events-none absolute -inset-1 bg-gradient-to-r ${show.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={(value) => !value && closeShow()}>
        <DialogContent
          className={
            details
              ? "[&>button]:hidden gap-0 h-[96dvh] max-h-[96dvh] w-[calc(100vw-1rem)] max-w-[1700px] overflow-hidden border border-white/10 bg-zinc-950 p-0 text-white shadow-2xl sm:w-[96vw] sm:rounded-2xl lg:h-[92dvh] lg:max-h-[92dvh]"
              : "[&>button]:hidden group h-[100dvh] w-screen max-w-none rounded-none border-0 bg-zinc-950/95 p-0 shadow-2xl sm:h-[92vh] sm:w-[98vw] sm:max-w-[min(1400px,98vw)] sm:rounded-2xl sm:border sm:border-white/10 sm:backdrop-blur-xl"
          }
        >
          {details && currentShow && (
            <article className="h-full overflow-hidden">
              <button
                type="button"
                onClick={closeShow}
                aria-label="Cerrar"
                className="absolute right-3 top-3 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="grid h-full min-h-0 grid-rows-[48dvh_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.3fr)_minmax(22rem,0.85fr)] lg:grid-rows-1">
                <div className="relative min-h-0 overflow-hidden bg-zinc-900">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/35 via-zinc-900 to-black" aria-hidden="true" />
                  <img
                    src={detailGallery[detailGalleryIndex] ?? currentShow.image}
                    alt={`${currentShow.title} ${detailGalleryIndex + 1}`}
                    className="absolute inset-0 z-10 h-full w-full object-contain p-2 sm:p-4 lg:p-5"
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-t ${currentShow.gradient} opacity-[0.08]`}
                  />
                  {detailGallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Imagen anterior"
                        onClick={showPreviousDetailImage}
                        className="absolute left-3 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        type="button"
                        aria-label="Siguiente imagen"
                        onClick={showNextDetailImage}
                        className="absolute right-3 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    <div className="absolute inset-x-0 bottom-0 z-30 flex gap-2 overflow-x-auto bg-black/65 p-3 backdrop-blur-sm">
                      {detailGallery.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => {
                            setDetailGalleryInteractionCount((count) => count + 1);
                            setDetailGalleryIndex(index);
                          }}
                          aria-label={`Ver foto ${index + 1}`}
                          className={[
                            "h-14 w-12 shrink-0 overflow-hidden rounded-md border transition",
                            index === detailGalleryIndex
                              ? "border-white opacity-100"
                              : "border-white/20 opacity-60 hover:opacity-100",
                          ].join(" ")}
                        >
                          <img
                            src={image}
                            alt=""
                            aria-hidden="true"
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    </>
                  )}
                </div>
                <div className="min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8 lg:h-full lg:p-10">
                  <p className="mb-3 text-sm uppercase tracking-[0.28em] text-white/55">
                    {currentShow.year}
                  </p>
                  <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl whitespace-pre-line">
                    {currentShow.title}
                  </h2>
                  <div
                    className={`my-6 h-1 w-20 rounded-full bg-gradient-to-r ${currentShow.gradient}`}
                  />
                  <div className="mb-7 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80">
                      Duración: {details.duration}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80">
                      Público: {details.audience}
                    </span>
                  </div>
                  <div className="space-y-4 text-[16px] leading-relaxed text-gray-200">
                    {details.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <section className="mt-8 border-l border-white/25 pl-5">
                    <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-white/55">
                      {details.highlightsTitle ?? "Presentaciones"}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-300">
                      {details.presentations}
                    </p>
                  </section>
                  {details.videoId && (
                    <section className="mt-9">
                      <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-white/55">
                        Video
                      </h3>
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
                        <LiteYouTubeEmbed
                          id={details.videoId}
                          title={`Video de ${currentShow.title}`}
                          noCookie
                          webp
                        />
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </article>
          )}

          {!details && hasFullScreenGallery && (
            <div className="relative h-full w-full bg-black">
              <button
                type="button"
                aria-label="Cerrar galería"
                onClick={closeShow}
                className="absolute inset-0 z-10 cursor-default"
              />
              <div className="absolute right-2 top-[max(0.5rem,env(safe-area-inset-top))] z-30 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2 py-1.5 backdrop-blur-md shadow-md">
                <span className="px-3 text-xs tracking-wide text-white/80">
                  {galleryIndex + 1} / {fullScreenGallery.length}
                </span>
                <button
                  onClick={closeShow}
                  title="Cerrar (Esc)"
                  aria-label="Cerrar"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="pointer-events-none relative z-0 h-full w-full">
                {fullScreenGallery.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${currentShow?.title ?? "Galería"} ${index + 1}`}
                    draggable={false}
                    className={[
                      "pointer-events-none absolute inset-0 h-full w-full object-contain px-2 pb-24 pt-16 transition-all duration-700 ease-out sm:px-6 sm:pb-28 md:px-10",
                      index === galleryIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-[0.985]",
                    ].join(" ")}
                  />
                ))}
              </div>
              {fullScreenGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Imagen anterior"
                    onClick={showPreviousImage}
                    className="absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:left-3 sm:h-11 sm:w-11 md:left-5"
                  >
                    <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                  </button>
                  <button
                    type="button"
                    aria-label="Siguiente imagen"
                    onClick={showNextImage}
                    className="absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:right-3 sm:h-11 sm:w-11 md:right-5"
                  >
                    <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                  </button>
                </>
              )}
              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/55 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md sm:px-3 sm:py-3">
                <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1">
                  {fullScreenGallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      aria-label={`Ver imagen ${index + 1}`}
                      onClick={() => {
                        setGalleryInteractionCount((count) => count + 1);
                        setGalleryIndex(index);
                      }}
                      className={[
                        "h-14 w-11 shrink-0 overflow-hidden rounded-md border transition sm:h-16 sm:w-12 md:h-20 md:w-16",
                        index === galleryIndex
                          ? "border-white opacity-100"
                          : "border-white/15 opacity-60 hover:opacity-90",
                      ].join(" ")}
                    >
                      <img
                        src={image}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shows;
