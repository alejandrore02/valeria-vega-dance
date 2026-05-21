import valeria from "../assets/fotos/vale_bn.webp";
import acerca_de from "../assets/shows/rebozo/valeria-rebozo.jpg";

const About = () => {
  const sections = [
    {
      image: valeria,
      alt: "Valeria Vega Solórzano",
      paragraphs: [
        `Valeria Vega Solórzano es intérprete, coreógrafa, docente de tango y productora escénica con más de veinticinco años de trayectoria profesional. Formada en ballet clásico y teatro, es licenciada en Artes Escénicas por la Universidad de Guadalajara y Maestra en Artes Escénicas por la Universidad UNIR. Su carrera se ha desarrollado entre grandes escenarios y circuitos internacionales, con participación en musicales como El Fantasma de la Ópera y Victor Victoria, producciones operísticas en el Palacio de Bellas Artes, y giras de tango en México, Estados Unidos y China.`,

        `Discípula de Claudio Villagra y Carlos Gavito, es reconocida como una de las figuras de referencia del tango argentino en México. Su labor pedagógica ha marcado a varias generaciones de bailarines, y su trabajo como creadora incluye la producción de más de una docena de obras escénicas vinculadas al tango. Ha sido jurado en certámenes nacionales de arte y campeonatos de tango, respaldada por un sólido conocimiento técnico y una mirada artística madura.`,
      ],
    },
    {
      image: acerca_de,
      alt: "Valeria en escena",
      paragraphs: [
        `En su práctica, la danza aparece como una forma de pensamiento encarnado. Cada gesto articula memoria, cada pausa convoca escucha, y cada escena abre un espacio donde tradición y experiencia se reconocen. Su presencia escénica transforma el movimiento en lenguaje y el lenguaje en tiempo compartido, dejando una huella que permanece más allá de la función, como una caricia musical que sobrevive en la piel.`,
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-background pt-20"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <header
          className="text-center mb-16 animate-slide-up motion-reduce:animate-none"
          style={{
            animationDuration: "400ms",
            animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
            animationDelay: "80ms",
            willChange: "transform, opacity",
          }}
        >
          <h1
            id="about-heading"
            className="text-5xl md:text-7xl font-serif font-light text-primary mb-8 text-right leading-none tracking-tight"
          >
            Acerca de
          </h1>
          <div className="w-24 h-px bg-cultural ml-auto mr-0 opacity-60" />
        </header>

        {/* Secciones alternadas (2) */}
        <div className="space-y-16 lg:space-y-24">
          {sections.map((block, i) => {
            const isReversed = i % 2 === 1; // alterna imagen/texto
            return (
              <section
                key={i}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Imagen sin bordes */}
                <figure
                  className={`relative lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"} motion-safe:animate-fade-in`}
                  style={{
                    animationDelay: `${120 + i * 120}ms`,
                    animationDuration: "420ms",
                    animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]">
                      <img
                        src={block.image}
                        alt={block.alt}
                        className="w-full h-full object-cover select-none"
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        draggable={false}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </div>
                  </div>
                </figure>

                {/* Texto */}
                <div
                  className={`lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"} motion-safe:animate-fade-in`}
                  style={{
                    animationDelay: `${180 + i * 120}ms`,
                    animationDuration: "420ms",
                    animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="space-y-6 md:space-y-7">
                    {block.paragraphs.map((p, k) => (
                      <p
                        key={k}
                        className="text-foreground/80 font-light leading-relaxed text-base md:text-lg [text-wrap:pretty]"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
