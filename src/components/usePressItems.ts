import { useEffect, useRef, useState } from "react";
import laJornadaImg from "../assets/press/la-jornada.jpg";
import elUniversalImg from "../assets/press/el-universal.jpg";
import lavozMichoacanImg from "../assets/press/lavoz-michoacan.jpg";
import puertaEscenicaDamaImg from "../assets/press/puerta-escenica-dama.jpg";
import puertaEscenicaDetrasImg from "../assets/press/puerta-escenica-detras.jpg";
import miMoreliaImg from "../assets/press/mi-morelia.jpg";
import cambioMichoacanImg from "../assets/press/cambio-michoacan.jpg";
import excelsiorImg from "../assets/press/excelsior.jpg";
import valeriaPortadaImg from "../assets/fotos/vale_bn.webp";
import rebozoPortadaImg from "../assets/shows/rebozo/rebozo_portada.jpeg";
// ---------- Tipos ----------
export type PressItem =
  | {
      type: "article";
      editorial: string;
      headline: string;
      url: string;
      description: string;
      descriptionLong?: string;
      image: string;
      title?: string;
      // metadatos
      favicon?: string;
      siteName?: string;
      themeColor?: string;
      domain?: string;
      // control
      __ts?: number; // timestamp de cache
    }
  | {
      type: "video";
      title: string;
      url: string;
      description: string;
      thumbnail: string;
      videoId: string;
      // metadatos
      favicon?: string;
      siteName?: string;
      themeColor?: string;
      domain?: string;
      // control
      __ts?: number;
    };

// ---------- Datos base mínimos ----------
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
      <rect width='100%' height='100%' fill='#1f2937'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-family='system-ui, -apple-system, Segoe UI, Roboto' font-size='42'>Prensa</text>
    </svg>`,
  );

// ⚠️ Deja esta lista como tu “fuente de verdad” (datos mínimos inmediatos)
const pressItemsBase: PressItem[] = [
  {
    editorial: "La Jornada",
    headline: "Cultura",
    url: "https://www.jornada.com.mx/2025/07/20/cultura/a05n1cul",
    description: "Artículo destacado en La Jornada",
    type: "article",
    image: laJornadaImg,
  },
  {
    editorial: "El Universal",
    headline: "Detrás de mí, de mujeres y tangos",
    url: "https://www.eluniversal.com.mx/cultura/detras-de-mi-de-mujeres-y-tangos-en-busca-de-la-naturaleza-femenina/?utm_source=web",
    description: "En busca de la naturaleza femenina",
    type: "article",
    image: elUniversalImg,
  },
  {
    title: "REBOZO | Tráiler",
    url: "https://www.youtube.com/watch?v=AHz-Shfcef8",
    description:
      "Espectáculo unipersonal de música, danza y teatro que aborda el proceso de elaboración del REBOZO, la prenda tradicional mexicana por excelencia, en una metáfora del tejido de la vida misma.",
    type: "video",
    videoId: "AHz-Shfcef8",
    thumbnail: valeriaPortadaImg,
  },
  {
    title: "Entrevista con Valeria Vega Solórzano",
    url: "https://www.youtube.com/watch?v=xyCDWj9nMBk&t=1s",
    description:
      "Ctrl Art . . . un clic al Arte presenta: entrevista con Valeria Vega Solórzano.",
    type: "video",
    videoId: "xyCDWj9nMBk",
    thumbnail: valeriaPortadaImg,
  },
  {
    title: "Reportaje Canal 22",
    url: "https://youtu.be/pxyqshz3TUM?si=VLbUbY1ioSfaDBpB",
    description: "Canal 22 presenta entrevista con Valeria Vega Solórzano.",
    type: "video",
    videoId: "pxyqshz3TUM",
    thumbnail: rebozoPortadaImg,
  },
  {
    editorial: "La Voz de Michoacán",
    headline: "Valeria Vega y la danza como un pez en el agua",
    url: "https://www.lavozdemichoacan.com.mx/cultura/jueves/entrevista-valeria-vega-y-la-danza-como-un-pez-en-el-agua/",
    description: "Entrevista a Valeria Vega",
    type: "article",
    image: lavozMichoacanImg,
  },
  {
    title: "Espectadores Helénico | Detrás de mí de mujeres y tangos",
    url: "https://www.youtube.com/watch?v=OrRppUcA4_s&t=2s",
    description: `Detrás de mí, de mujeres y tangos\n\n¿Cuántas mujeres viven en ti?\n\nDetrás de mí, de mujeres y tangos” es una obra de danza-tango que habla sobre el universo femenino y sus relaciones con el sexo opuesto.\n\nInspirada en 4 personajes de la literatura universal: Yerma de García Lorca, Carmen de Prósper Merimée y Julieta y Lady Macbeth de Shakespeare.\n\nLas cuatro mujeres convergen en en otra tan aparentemente común como cualquier mujer que trabaja detrás de un escritorio. Cuatro mujeres tan afines y distintas a la vez, con voces internas que sufren, aman, odian, seducen, desean, ambicionan y dan color a un mundo interior que parecería pintado en blanco y negro.\nAutor\nValeria Vega Solórzano\n\nDirección\nElisa Rodríguez\n\nElenco\nValeria Vega y Jacob Morales`,
    type: "video",
    videoId: "OrRppUcA4_s",
    thumbnail: valeriaPortadaImg,
  },
  {
    editorial: "Puerta Escénica",
    headline: "La Dama del Puerto",
    url: "https://puertaescenica.com/la-dama-del-puerto-el-tango-que-da-voz-a-las-emociones-humanas/",
    description: "El tango que da voz a las emociones humanas",
    type: "article",
    image: puertaEscenicaDamaImg,
  },
  {
    editorial: "Puerta Escénica",
    headline: "Detrás de mí de mujeres y tangos",
    url: "https://puertaescenica.com/una-mirada-a-historias-de-mujeres-y-hombresdetras-de-mi-de-mujeres-y-tangos/",
    description: "Artículo sobre 'Detrás de mí de mujeres y tangos'",
    type: "article",
    image: puertaEscenicaDetrasImg,
  },
  {
    editorial: "Mi Morelia",
    headline: "Rebozo",
    url: "https://mimorelia.com/noticias/morelia/con-rebozo-valeria-vega-reflexiona-acerca-de-la-vida",
    description: "Reflexión acerca de la vida a través del espectáculo Rebozo",
    type: "article",
    image: miMoreliaImg,
  },
  {
    editorial: "Cambio de Michoacán",
    headline: "Rebozo: una vida de danza",
    url: "https://cambiodemichoacan.com.mx/2024/04/10/rebozo-una-vida-de-danza/",
    description: "Una vida de danza",
    type: "article",
    image: cambioMichoacanImg,
  },
  {
    title: "Valeria Vega Solórzano Entrevista",
    url: "https://www.youtube.com/watch?v=tPRuETlYaFM",
    description: `Entrevista a Valeria Vega Solórzano de iO Tango por Angelica Ponce de TV Milenio\n18 julio 2009`,
    type: "video",
    videoId: "tPRuETlYaFM",
    thumbnail: valeriaPortadaImg,
  },
  {
    editorial: "Excélsior",
    headline: "Festival de Música de Morelia",
    url: "https://www.excelsior.com.mx/expresiones/la-musica-se-une-en-el-33-festival-de-musica-de-morelia/1475664",
    description: "La música se une en el 33 Festival de Música de Morelia",
    type: "article",
    image: excelsiorImg,
  },
];

// ---------- Helpers ----------
const CACHE_KEY = "press:cache:v4"; // Incrementé la versión para forzar recarga
const STALE_MS = 1000 * 60 * 60 * 24 * 7; // 7 días
const CONCURRENCY = 2; // procesa 2 en paralelo
const FETCH_TIMEOUT_MS = 7000;

const getDomain = (url: string) => {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const abs = (maybeUrl: string | null | undefined, base: string) => {
  if (!maybeUrl) return null;
  try {
    return new URL(maybeUrl, base).href;
  } catch {
    return null;
  }
};

const pickBestIcon = (doc: Document, baseUrl: string): string | null => {
  const links = [
    ...doc.querySelectorAll<HTMLLinkElement>('link[rel~="apple-touch-icon"]'),
    ...doc.querySelectorAll<HTMLLinkElement>('link[rel="icon"]'),
    ...doc.querySelectorAll<HTMLLinkElement>('link[rel="shortcut icon"]'),
  ];

  links.sort((a, b) => {
    const getMax = (el: HTMLLinkElement) => {
      const s = el.getAttribute("sizes");
      if (!s) return 0;
      const m = s
        .split(" ")
        .map((x) => parseInt(x.split("x")[0] || "0", 10))
        .filter(Boolean);
      return m.length ? Math.max(...m) : 0;
    };
    return getMax(b) - getMax(a);
  });

  for (const l of links) {
    const href = l.getAttribute("href");
    const resolved = abs(href, baseUrl);
    if (resolved && /^https?:\/\//.test(resolved)) return resolved;
  }
  return null;
};

const withTimeout = async (url: string, ms: number) => {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
};

const fetchArticleData = async (url: string) => {
  try {
    // YouTube simplificado
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const domain = getDomain(url);
      return {
        image: null,
        title: null,
        description: null,
        descriptionLong: null,
        favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        siteName: "YouTube",
        themeColor: "#ff0000",
      };
    }

    const proxied = `https://api.allorigins.win/get?url=${encodeURIComponent(
      url,
    )}`;
    const resp = await withTimeout(proxied, FETCH_TIMEOUT_MS);
    const data = await resp.json();
    const html = data.contents as string;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    let resolvedImage =
      abs(
        doc.querySelector('meta[property="og:image"]')?.getAttribute("content"),
        url,
      ) ||
      abs(
        doc
          .querySelector('meta[name="twitter:image"]')
          ?.getAttribute("content"),
        url,
      ) ||
      abs(doc.querySelector(".article-image img")?.getAttribute("src"), url) ||
      abs(doc.querySelector("article img")?.getAttribute("src"), url);

    const ogTitle =
      doc.querySelector('meta[property="og:title"]')?.getAttribute("content") ||
      doc.querySelector('meta[name="twitter:title"]')?.getAttribute("content");

    const ogDescription =
      doc
        .querySelector('meta[property="og:description"]')
        ?.getAttribute("content") ||
      doc
        .querySelector('meta[name="twitter:description"]')
        ?.getAttribute("content") ||
      doc.querySelector('meta[name="description"]')?.getAttribute("content");

    const siteName =
      doc
        .querySelector('meta[property="og:site_name"]')
        ?.getAttribute("content") ||
      doc
        .querySelector('meta[name="application-name"]')
        ?.getAttribute("content") ||
      doc.title?.trim();

    const themeColor =
      doc.querySelector('meta[name="theme-color"]')?.getAttribute("content") ||
      undefined;

    const article =
      doc.querySelector("article") ||
      doc.querySelector(".article-content") ||
      doc.querySelector(".entry-content") ||
      doc.querySelector(".post-content") ||
      doc.querySelector("main");

    let title = ogTitle || undefined;
    let short = ogDescription || undefined;
    let long: string | undefined;

    if (article) {
      if (!title) {
        const h1 = article.querySelector("h1");
        title = h1?.textContent?.trim() || undefined;
      }
      const paragraphs = Array.from(article.querySelectorAll("p"))
        .map((p) => (p.textContent || "").trim())
        .filter(
          (t) =>
            t.length > 60 &&
            !/©|Derechos reservados|Todos los derechos/i.test(t),
        );

      if (!short && paragraphs.length > 0) {
        short = paragraphs[0].slice(0, 220).replace(/\s+\S*$/, "") + "…";
      }

      if (paragraphs.length > 0) {
        const joined = paragraphs.slice(0, 3).join(" ");
        long = joined.slice(0, 480).replace(/\s+\S*$/, "") + "…";
      }
    }

    const bestIcon = pickBestIcon(doc, url);
    const domain = getDomain(url);
    const favicon =
      bestIcon ||
      (domain
        ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
        : null);

    return {
      image: resolvedImage,
      title: title ?? null,
      description: short ?? null,
      descriptionLong: long ?? null,
      favicon,
      siteName: siteName || null,
      themeColor,
    };
  } catch {
    return null;
  }
};

// ---------- Cache helpers ----------
type CacheMap = Record<string, PressItem>;

const readCache = (): CacheMap => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
};

const writeCache = (map: CacheMap) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(map));
  } catch {
    // ignore quota errors
  }
};

const mergeItem = (base: PressItem, data: Partial<PressItem>): PressItem => {
  if (base.type === "article") {
    const d = data as Partial<Extract<PressItem, { type: "article" }>>;
    const hasSpecificImage =
      base.image && !base.image.includes("data:image/svg+xml");
    const isValidImage =
      d?.image &&
      d.image.trim() &&
      !d.image.includes("Prensa") &&
      !d.image.includes("data:image/svg+xml") &&
      d.image.startsWith("http");

    return {
      ...base,
      image: hasSpecificImage
        ? base.image
        : isValidImage
          ? d.image
          : base.image,
      headline: (d as any)?.headline || (d as any)?.title || base.headline,
      description: d?.description || base.description,
      descriptionLong: d?.descriptionLong || (base as any).descriptionLong,
      favicon: d?.favicon ?? (base as any).favicon,
      siteName: d?.siteName ?? (base as any).siteName ?? base.editorial,
      themeColor: d?.themeColor ?? (base as any).themeColor,
      domain: (base as any).domain ?? getDomain(base.url),
      __ts: Date.now(),
    };
  } else {
    const d = data as Partial<Extract<PressItem, { type: "video" }>>;
    // Para videos, usar siempre el thumbnail de YouTube si hay videoId
    let ytThumb = "";
    if (base.videoId) {
      ytThumb = `https://i.ytimg.com/vi/${base.videoId}/maxresdefault.jpg`;
    }
    // Si el thumbnail de YouTube falla, usar hqdefault
    const fallbackThumb = base.videoId
      ? `https://i.ytimg.com/vi/${base.videoId}/hqdefault.jpg`
      : base.thumbnail;

    return {
      ...base,
      thumbnail: ytThumb || fallbackThumb,
      favicon: d?.favicon ?? (base as any).favicon,
      siteName: d?.siteName ?? (base as any).siteName ?? "YouTube",
      themeColor: d?.themeColor ?? (base as any).themeColor ?? "#ff0000",
      domain: (base as any).domain ?? getDomain(base.url),
      __ts: Date.now(),
    };
  }
};

// ---------- Hook con carga progresiva ----------
export function usePressItems() {
  const [items, setItems] = useState<PressItem[]>(() =>
    pressItemsBase.map((it) => {
      if (it.type === "video" && it.videoId) {
        return {
          ...it,
          domain: getDomain(it.url),
          thumbnail: `https://i.ytimg.com/vi/${it.videoId}/maxresdefault.jpg`,
        };
      }
      return {
        ...it,
        domain: getDomain(it.url),
      };
    }),
  );

  const [isLoading, setIsLoading] = useState(true);
  const queueRef = useRef<PressItem[]>([]);
  const runningRef = useRef(0);
  const cacheRef = useRef<CacheMap>({});

  // Hidrata desde cache y arranca cola progresiva
  useEffect(() => {
    cacheRef.current = readCache();

    // aplica cache por-ítem disponible
    setItems((prev) =>
      prev.map((base) => {
        const cached = cacheRef.current[base.url];
        if (
          cached &&
          cached.__ts &&
          Date.now() - cached.__ts < STALE_MS // sólo si no está “vencido”
        ) {
          // mezcla base + cache
          return { ...base, ...cached };
        }
        return base;
      }),
    );

    // encola TODO, pero los que están frescos se van a saltar en fetcher
    queueRef.current = [...pressItemsBase];

    // dispara N workers
    for (let i = 0; i < CONCURRENCY; i++) {
      tick();
    }

    // marcamos loading true sólo hasta que la cola vacíe la primera vez
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // worker de la cola
  const tick = async () => {
    if (runningRef.current >= CONCURRENCY) return;
    const next = queueRef.current.shift();
    if (!next) return;

    runningRef.current += 1;

    try {
      // si cache fresco, no fetch
      const cached = cacheRef.current[next.url];
      const fresh =
        cached && cached.__ts && Date.now() - cached.__ts < STALE_MS;

      if (!fresh) {
        const data = await fetchArticleData(next.url);

        if (data) {
          // mezcla y escribe cache
          const merged = mergeItem(next, data as any);
          cacheRef.current[next.url] = merged;
          writeCache(cacheRef.current);

          // actualiza sólo ese item en UI (incremental)
          setItems((prev) =>
            prev.map((p) => (p.url === next.url ? { ...p, ...merged } : p)),
          );
        } else {
          // si no hubo data, al menos guarda timestamp para evitar reintento inmediato
          const merged = mergeItem(next, {});
          cacheRef.current[next.url] = merged;
          writeCache(cacheRef.current);
        }
      } else {
        // ya está fresco: asegura que la UI lo tenga
        setItems((prev) =>
          prev.map((p) => (p.url === next.url ? { ...p, ...cached } : p)),
        );
      }
    } catch {
      // ignora errores
    } finally {
      runningRef.current -= 1;
      // sigue con el siguiente
      if (queueRef.current.length) {
        // yield event loop para no bloquear
        setTimeout(tick, 0);
      }
    }
  };

  // si hay huecos en ejecución (por errores), intenta rellenar
  useEffect(() => {
    if (queueRef.current.length && runningRef.current < CONCURRENCY) {
      const missing = CONCURRENCY - runningRef.current;
      for (let i = 0; i < missing; i++) tick();
    }
  });

  return {
    loadedPressItems: items,
    isLoading,
    pressItems: pressItemsBase,
  };
}
