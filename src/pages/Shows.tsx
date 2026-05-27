import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink,
  Download,
  Images,
  X,
} from "lucide-react";

import lasOrquestasImg from "@/assets/shows/orquestas/Las_Orquestas_portada.jpeg";
import detrasDeMiImg from "@/assets/shows/detras/detras-pose.jpeg";
import rebozoImg from "@/assets/shows/rebozo/rebozo_portada.jpeg";
import damaPuertoImg from "@/assets/shows/dama/dama-del-puerto.jpg";
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

type ShowItem = {
  year: string;
  title: string;
  gradient: string; // Tailwind gradient classes: "from-.. via-.. to-.."
  image: string;
  pdf?: string; // Ruta al PDF si existe (e.g., "/pdfs/detras-de-mi.pdf")
  gallery?: string[];
};

const Shows = () => {
  const [open, setOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState<ShowItem | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryInteractionCount, setGalleryInteractionCount] = useState(0);

  const shows: ShowItem[] = [
    {
      year: "2026",
      title: "LAS ORQUESTAS",
      gradient: "from-red-500 via-rose-500 to-pink-500",
      image: lasOrquestasImg,
      gallery: lasOrquestasGallery,
    },
    {
      year: "2025",
      title: "DETRÁS DE MI\n DE MUJERES Y TANGOS",
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      image: detrasDeMiImg,
      pdf: "/pdfs/detras-de-mi.pdf",
    },
    {
      year: "2024",
      title: "REBOZO",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      image: rebozoImg,
      pdf: "/pdfs/rebozo.pdf",
    },
    {
      year: "2018-2025",
      title: "LA DAMA DEL PUERTO",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      image: damaPuertoImg,
      pdf: "/pdfs/dama.pdf",
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

  const pdfUrl = useMemo(() => currentShow?.pdf ?? null, [currentShow]);
  const galleryImages = currentShow?.gallery ?? [];
  const hasGallery = galleryImages.length > 0;

  function openPdf(show: ShowItem) {
    if (!show.pdf) return;
    setCurrentShow(show);
    setPdfError(null);
    setPdfLoading(true);
    setOpen(true);
  }

  function openGallery(show: ShowItem) {
    if (!show.gallery?.length) return;
    setCurrentShow(show);
    setGalleryIndex(0);
    setGalleryInteractionCount(0);
    setPdfError(null);
    setPdfLoading(false);
    setOpen(true);
  }

  function openShow(show: ShowItem) {
    if (show.gallery?.length) {
      openGallery(show);
      return;
    }
    openPdf(show);
  }

  function showPreviousImage() {
    if (!galleryImages.length) return;
    setGalleryInteractionCount((count) => count + 1);
    setGalleryIndex(
      (currentIndex) =>
        (currentIndex - 1 + galleryImages.length) % galleryImages.length,
    );
  }

  function showNextImage() {
    if (!galleryImages.length) return;
    setGalleryInteractionCount((count) => count + 1);
    setGalleryIndex(
      (currentIndex) => (currentIndex + 1) % galleryImages.length,
    );
  }

  useEffect(() => {
    if (!open || galleryImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setGalleryIndex(
        (currentIndex) => (currentIndex + 1) % galleryImages.length,
      );
    }, 3500);

    return () => window.clearInterval(timer);
  }, [open, galleryImages.length, galleryInteractionCount]);

  useEffect(() => {
    if (!open || !hasGallery) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setGalleryInteractionCount((count) => count + 1);
        setGalleryIndex(
          (currentIndex) =>
            (currentIndex - 1 + galleryImages.length) % galleryImages.length,
        );
      }

      if (event.key === "ArrowRight") {
        setGalleryInteractionCount((count) => count + 1);
        setGalleryIndex(
          (currentIndex) => (currentIndex + 1) % galleryImages.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, hasGallery, galleryImages.length]);

  return (
    <div className="min-h-screen bg-black relative pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-violet-500/5 to-emerald-500/5" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16 z-10">
        {/* Header */}
        <div className="text-right mb-16 animate-slide-up">
          <h1 className="font-serif tracking-tight text-5xl md:text-7xl font-light text-white mb-6">
            Espectáculos
          </h1>
          <div className="w-24 h-px bg-cultural ml-auto mr-0 opacity-60 mb-6" />
        </div>

        {/* iO Artes Escénicas section */}
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
              internacional de música de Morelia) “Detrás de mí, de mujeres y
              tangos” (Foro de las Artes, CENART y Teatro de la Danza, INBA) “Mi
              tango”, “Manon, un último tango”, “Los colores del tango”( Los
              Talleres de Coyoacán), “La dama del puerto” (Circuito Nacional de
              Artes Escénicas en espacios independientes), “Las notas del tango”
              (Un Teatro), “Mordisquito” (Casa del Lago UNAM), "Detrás de mi, de
              mujeres y tangos" (Foro de las Artes CENART, Teatro de la Danza
              INBA, Festival internacional de danza Oaxaca, Foro La Gruta,
              Helénico), entre otros.
            </p>
          </div>
        </div>

        {/* Shows timeline */}
        <div>
          <h3 className="font-serif tracking-tight text-3xl md:text-4xl font-light text-white mb-12 text-right">
            Producciones
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show, index) => {
              const isClickable = Boolean(show.pdf || show.gallery?.length);
              const hasGallery = Boolean(show.gallery?.length);
              return (
                <div
                  key={`${show.year}-${show.title}`}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : -1}
                  onClick={() => isClickable && openShow(show)}
                  onKeyDown={(e) => {
                    if (!isClickable) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
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
                  aria-label={
                    isClickable
                      ? `Abrir ${hasGallery ? "galería" : "carpeta"} de ${show.title}`
                      : undefined
                  }
                >
                  {/* Show image */}
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={show.image}
                      alt={show.title}
                      className="w-full h-full object-cover object-[50%_30%] transition-transform duration-400 group-hover:scale-[1.03]"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${show.gradient} opacity-10 group-hover:opacity-0 transition-opacity duration-500`}
                    />

                    {/* Year badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium tracking-wide rounded-md border border-white/20 backdrop-blur-sm">
                        {show.year}
                      </span>
                    </div>

                    {/* Subtle hint only if clickable */}
                    {isClickable && (
                      <div className="absolute bottom-4 right-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-xs tracking-wide rounded-md border border-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          {hasGallery ? (
                            <Images className="w-3.5 h-3.5" />
                          ) : (
                            <FileText className="w-3.5 h-3.5" />
                          )}
                          {hasGallery ? "Galería" : "Carpeta"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card content */}
                  <div className="relative p-6 space-y-4">
                    <div
                      className={`w-16 h-1 bg-gradient-to-r ${show.gradient} group-hover:w-24 transition-all duration-500 rounded-full`}
                    />
                    <h4 className="font-serif tracking-tight text-xl md:text-2xl font-normal text-white leading-snug whitespace-pre-line">
                      {show.title}
                    </h4>
                    {/* No mostrar mensaje si no hay carpeta disponible */}
                  </div>

                  {/* Outer glow on hover */}
                  <div
                    className={`pointer-events-none absolute -inset-1 bg-gradient-to-r ${show.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal para PDF */}
      {/* MODAL */}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            setPdfLoading(false);
            setPdfError(null);
            setCurrentShow(null);
            setGalleryIndex(0);
            setGalleryInteractionCount(0);
          }
        }}
      >
        <DialogContent className="group h-[100dvh] w-screen max-w-none rounded-none border-0 bg-zinc-950/95 p-0 shadow-2xl sm:h-[92vh] sm:w-[98vw] sm:max-w-[min(1400px,98vw)] sm:rounded-2xl sm:border sm:border-white/10 sm:backdrop-blur-xl">
          {/* MICRO-TOOLBAR flotante (solo iconos, sin aumentar altura) */}
          {pdfUrl && !hasGallery && (
            <div className="absolute top-2 right-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2 py-1.5 backdrop-blur-md shadow-md opacity-80 hover:opacity-100 transition">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir en pestaña nueva"
                aria-label="Abrir en pestaña nueva"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
              <a
                href={pdfUrl}
                download
                title="Descargar PDF"
                aria-label="Descargar PDF"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <Download className="w-6 h-6" />
              </a>
              <button
                onClick={() => setOpen(false)}
                title="Cerrar (Esc)"
                aria-label="Cerrar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          {hasGallery && (
            <div className="relative w-full h-full bg-black">
              <button
                type="button"
                aria-label="Cerrar galería"
                onClick={() => setOpen(false)}
                className="absolute inset-0 z-10 cursor-default"
              />

              <div className="absolute right-2 top-[max(0.5rem,env(safe-area-inset-top))] z-30 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2 py-1.5 backdrop-blur-md shadow-md opacity-85 transition hover:opacity-100">
                <span className="px-3 text-xs tracking-wide text-white/80">
                  {galleryIndex + 1} / {galleryImages.length}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  title="Cerrar (Esc)"
                  aria-label="Cerrar"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="pointer-events-none relative z-0 h-full w-full">
                {galleryImages.map((image, index) => (
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

              {galleryImages.length > 1 && (
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
                  {galleryImages.map((image, index) => (
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
                        aria-hidden
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loader */}
          {pdfLoading && !pdfError && (
            <div className="absolute inset-0 grid place-items-center z-10">
              <div className="flex flex-col items-center gap-3 text-white/80">
                <div className="w-9 h-9 rounded-full border-2 border-white/20 border-t-white/70 animate-spin" />
                <span className="text-xs tracking-wide">Cargando carpeta</span>
              </div>
            </div>
          )}

          {/* Lienzo PDF */}
          {pdfUrl && !hasGallery && (
            <div className="relative w-full h-full">
              <iframe
                key={pdfUrl}
                src={`${pdfUrl}#toolbar=0&view=FitH`}
                title={`Dossier ${currentShow?.title ?? ""}`}
                className={[
                  "absolute inset-0 w-full h-full border-0",
                  pdfLoading ? "opacity-0" : "opacity-100",
                ].join(" ")}
                onLoad={() => setPdfLoading(false)}
                onError={() => {
                  setPdfLoading(false);
                  setPdfError("embed-failed");
                  setOpen(false);
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shows;
