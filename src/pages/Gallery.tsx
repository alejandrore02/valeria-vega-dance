import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import React, { useState, useEffect, useRef } from "react";

// Componente para imagen con blur placeholder
function BlurImage(props: { src: string; thumbnail: string; alt: string }) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div className="w-full h-full relative">
      <img
        src={props.thumbnail}
        alt={props.alt}
        className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100 blur-md scale-105"}`}
        draggable={false}
        aria-hidden="true"
      />
      <img
        src={props.src}
        alt={props.alt}
        className={`w-full h-full object-cover object-center relative transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        draggable={false}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import horacioValeBn from "@/assets/fotos/horacio_vale_bn.jpg";
import pose1 from "@/assets/fotos/pose1.png";
import detrasAbrazo from "@/assets/shows/detras/detras-abrazo.jpeg";
import detrasPiso from "@/assets/shows/detras/detras-piso.jpeg";
import detrasPose from "@/assets/shows/detras/detras-pose.jpeg";
import valeMesa from "@/assets/shows/detras/vale-mesa.jpg";

// Importa automáticamente todas las imágenes de galería
const galeriaImages = Object.entries(
  import.meta.glob("@/assets/varios/galeria/*", {
    eager: true,
    import: "default",
  }),
);

// Intenta buscar miniaturas en una subcarpeta thumbnails (mismo nombre de archivo)
const galeriaThumbnails: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob("@/assets/varios/galeria/thumbnails/*", {
      eager: true,
      import: "default",
    }),
  ).map(([path, mod]) => [
    path.replace("/thumbnails", "").replace(/^.*\/([^/]+)$/, "$1"),
    mod as string,
  ]),
);

interface VideoItem {
  type: "video";
  id: string; // YouTube ID
  title: string;
}

interface ImageItem {
  type: "image";
  src: string;
  title?: string;
}

// Helpers para miniaturas oficiales de YouTube
const ytThumbs = (id: string) => ({
  primary: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  fallback: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
});

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Por defecto: FOTOS
  const [section, setSection] = useState<"all" | "videos" | "images">("images");

  // "Peek" mobile / hover
  const [peekImageIndex, setPeekImageIndex] = useState<number | null>(null);
  const [peekVideoIndex, setPeekVideoIndex] = useState<number | null>(null);
  const peekImgTimer = useRef<number | null>(null);
  const peekVidTimer = useRef<number | null>(null);

  const videos: VideoItem[] = [
    { type: "video", id: "PQM7bVGOrxM", title: "Valeria" },
    { type: "video", id: "AHz-Shfcef8", title: "Rebozo" },
    { type: "video", id: "z-JPHGXkzNo", title: "Valeria y Horacio" },
    { type: "video", id: "pNxXRVUsSlo", title: "La Dama del Puerto" },
    { type: "video", id: "nznr1-riZ3Q", title: "Performance" },
    { type: "video", id: "ohZYsXG5qK0", title: "Valeria en Morelia" },
    { type: "video", id: "vrsSZRXlyXY", title: "Valeria y Froyamel" },
    { type: "video", id: "OhZinnRN7vg", title: "Valeria y Abdel" },
    { type: "video", id: "VWwaL_ZxK-E", title: "Juerga por Tangos" },
    { type: "video", id: "AbbQDFGEJF4", title: "Tango Óleo sobre Tela" },
    { type: "video", id: "8f_CkDVLHxo", title: "Qué Quilombo" },
    { type: "video", id: "ZPn2uVAoWZo", title: "Tango, Óleo sobre tela" },
    {
      type: "video",
      id: "eyleItPM63A",
      title: "Detrás de mí, de mujeres y tangos",
    },
    { type: "video", id: "XD-wwYgO5W8", title: "Trailer Rebozo 2026" },
  ];

  const images: ImageItem[] = [
    { type: "image", src: horacioValeBn },
    { type: "image", src: pose1 },
    { type: "image", src: valeMesa },
    { type: "image", src: detrasAbrazo },
    { type: "image", src: detrasPiso },
    { type: "image", src: detrasPose },
    // Añade todas las imágenes de galería automáticamente, con miniaturas si existen
    ...galeriaImages.map(([path, src]) => {
      const filename = path.replace(/^.*\/([^/]+)$/, "$1");
      return {
        type: "image" as const,
        src: String(src),
        // @ts-ignore
        thumbnail: galeriaThumbnails[filename] || String(src),
      };
    }),
  ];

  // Navegación modal (solo images)
  const onNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % images.length);
  };
  const onPrevious = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      (selectedImageIndex - 1 + images.length) % images.length,
    );
  };

  // Navegación por teclado cuando hay imagen abierta
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrevious();
        if (e.key === "Escape") setSelectedImageIndex(null);
      }
      if (selectedVideo !== null && e.key === "Escape") {
        setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [selectedImageIndex, selectedVideo]);

  // Limpia timers al desmontar
  useEffect(() => {
    return () => {
      if (peekImgTimer.current) window.clearTimeout(peekImgTimer.current);
      if (peekVidTimer.current) window.clearTimeout(peekVidTimer.current);
    };
  }, []);

  const handleImageTouch = (index: number) => {
    if (peekImgTimer.current) window.clearTimeout(peekImgTimer.current);
    setPeekImageIndex(index);
    peekImgTimer.current = window.setTimeout(
      () => setPeekImageIndex(null),
      1200,
    );
  };
  const handleVideoTouch = (index: number) => {
    if (peekVidTimer.current) window.clearTimeout(peekVidTimer.current);
    setPeekVideoIndex(index);
    peekVidTimer.current = window.setTimeout(
      () => setPeekVideoIndex(null),
      1200,
    );
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-right mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-serif font-light text-primary mb-8">
            Galería
          </h1>
          <div className="w-24 h-px bg-cultural ml-auto mr-0 opacity-60"></div>
        </div>

        {/* Filtro */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSection("images")}
            className={`px-4 py-2 rounded-full text-sm font-light border transition-all ${
              section === "images"
                ? "bg-accent/10 text-accent border-accent/30"
                : "bg-transparent text-foreground/70 border-border/40 hover:text-accent"
            }`}
          >
            Fotos
          </button>
          <button
            onClick={() => setSection("videos")}
            className={`px-4 py-2 rounded-full text-sm font-light border transition-all ${
              section === "videos"
                ? "bg-accent/10 text-accent border-accent/30"
                : "bg-transparent text-foreground/70 border-border/40 hover:text-accent"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setSection("all")}
            className={`px-4 py-2 rounded-full text-sm font-light border transition-all ${
              section === "all"
                ? "bg-accent/10 text-accent border-accent/30"
                : "bg-transparent text-foreground/70 border-border/40 hover:text-accent"
            }`}
          >
            Todo
          </button>
        </div>

        {/* FOTOS */}
        {(section === "all" || section === "images") && (
          <section id="fotos">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-primary">
                Fotos
              </h2>
              <div className="h-px w-24 bg-cultural opacity-60" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((item, index) => (
                <div key={item.src} className="animate-fade-in">
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    onTouchStart={() => handleImageTouch(index)}
                    data-peek={peekImageIndex === index}
                    className="group relative block overflow-hidden rounded-xl shadow-xl transition-all duration-400 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    <div className="aspect-[3/4] relative">
                      <BlurImage
                        src={item.src}
                        thumbnail={(item as any).thumbnail || item.src}
                        alt={item.title || "Foto de galería"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 group-hover:opacity-100 data-[peek=true]:opacity-100 transition-opacity duration-300" />
                      {item.title && (
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 data-[peek=true]:translate-y-0 data-[peek=true]:opacity-100 transition-all duration-300">
                          <h3 className="text-white font-serif text-base md:text-lg drop-shadow">
                            {item.title}
                          </h3>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIDEOS */}
        {(section === "all" || section === "videos") && (
          <section id="videos" className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-primary">
                Videos
              </h2>
              <div className="h-px w-24 bg-cultural opacity-60" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((item, vIndex) => {
                const { primary, fallback } = ytThumbs(item.id);
                return (
                  <div key={item.id} className="animate-fade-in">
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(item.id)}
                      onTouchStart={() => handleVideoTouch(vIndex)}
                      data-peek={peekVideoIndex === vIndex}
                      className="group relative block overflow-hidden rounded-xl shadow-xl transition-all duration-400 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-accent/40"
                    >
                      <div className="aspect-video relative bg-black">
                        {/* Miniatura oficial de YouTube con fallback */}
                        <img
                          src={primary}
                          alt={item.title}
                          ref={(el) => {
                            if (!el) return;
                            el.onload = function () {
                              // Si la imagen es muy pequeña (placeholder gris de YouTube)
                              if (
                                el.naturalWidth < 400 ||
                                el.naturalHeight < 200
                              ) {
                                el.src = fallback;
                              }
                            };
                          }}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              fallback;
                          }}
                          className="w-full h-full object-cover object-center transition-transform duration-400 group-hover:scale-[1.03]"
                          draggable={false}
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 data-[peek=true]:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 data-[peek=true]:translate-y-0 data-[peek=true]:opacity-100 transition-all duration-300">
                          <h3 className="text-white font-serif text-base md:text-lg drop-shadow">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Video Dialog */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent
          className="max-w-5xl w-full p-0 bg-black/95 border-none flex items-center justify-center"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative w-full max-w-3xl aspect-video flex items-center justify-center">
            {selectedVideo && (
              <div className="absolute inset-0 w-full h-full rounded-lg bg-black">
                <LiteYouTubeEmbed
                  id={selectedVideo}
                  title="Video"
                  noCookie
                  adNetwork={false}
                  params="autoplay=1&rel=0&modestbranding=1&playsinline=1"
                />
              </div>
            )}
            {/* Cerrar */}
            <DialogClose asChild>
              <button
                type="button"
                aria-label="Cerrar"
                className="absolute right-3 top-3 z-20 rounded-full bg-black/40 hover:bg-black/60 text-white/90
                           p-2 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
                style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
              >
                <X className="h-5 w-5" />
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Dialog (mejorado) */}
      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={() => setSelectedImageIndex(null)}
      >
        <DialogContent
          className="max-w-[90vw] max-h-[90vh] w-full h-full p-0 bg-black/95 border-none transition-all duration-300 ease-out animate-fade-zoom"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <style>{`
            @keyframes fadeZoomIn {
              0% { opacity: 0; transform: scale(0.96); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-fade-zoom {
              animation: fadeZoomIn 0.32s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
          <div className="relative w-full h-full flex items-center justify-center touch-pan-y">
            {selectedImageIndex !== null && images[selectedImageIndex] && (
              <>
                <img
                  src={images[selectedImageIndex].src}
                  alt={images[selectedImageIndex].title || "Foto de galería"}
                  className="h-[85vh] w-auto object-contain rounded-lg select-none transition-all duration-300 ease-out animate-fade-zoom"
                  draggable={false}
                  loading="lazy"
                />

                {/* Cerrar (DialogClose) */}
                <DialogClose asChild>
                  <button
                    type="button"
                    aria-label="Cerrar"
                    className="absolute right-4 top-4 z-20 rounded-full bg-black/40 hover:bg-black/60 text-white/90
                               p-2.5 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
                    style={{ top: "max(1rem, env(safe-area-inset-top))" }}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </DialogClose>

                {/* Prev */}
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={onPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/45 hover:bg-black/65
                             p-2.5 text-white/90 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>

                {/* Next */}
                <button
                  type="button"
                  aria-label="Siguiente"
                  onClick={onNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/45 hover:bg-black/65
                             p-2.5 text-white/90 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>

                {/* Caption */}
                {images[selectedImageIndex].title && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white text-lg md:text-xl font-serif px-3 py-1.5 bg-black/35 rounded-md backdrop-blur-sm">
                    {images[selectedImageIndex].title}
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
