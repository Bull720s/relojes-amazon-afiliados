export type Guia = {
  slug: string;
  tag: string;
  titulo: string;
  resumen: string;
  parrafos: string[];
  relacionados?: string[];
};

export const GUIAS: Guia[] = [
  {
    slug: "automatico-vs-cuarzo",
    tag: "Comparativa",
    titulo: "Automático vs cuarzo: ¿cuál es mejor para ti?",
    resumen:
      "Las dos familias de movimiento resuelven problemas distintos. Aquí la diferencia real, sin mitos de vendedor.",
    parrafos: [
      "Un reloj de cuarzo mide el tiempo con un cristal de cuarzo que vibra a una frecuencia constante cuando recibe corriente de una pila. Es preciso, barato de producir y prácticamente no requiere mantenimiento: pierde o gana apenas unos segundos al mes. Un reloj automático, en cambio, se mueve con un rotor que se carga con el movimiento de tu muñeca y no lleva pila. Es mecánicamente más complejo, pierde o gana entre 5 y 20 segundos al día según la calidad del calibre, y necesita darle cuerda si pasa varios días sin usarse.",
      "La pregunta 'cuál es mejor' está mal planteada porque compara precisión contra otra cosa: el automático no compite en exactitud, compite en que tiene una pieza mecánica en movimiento visible a través del fondo transparente, sin batería que reemplazar, y con una tradición relojera detrás. El cuarzo compite en precisión, precio y bajo mantenimiento.",
      "En la práctica: si vas a usar el reloj todos los días y no te importa que sea 'solo' preciso, el cuarzo es la opción sin fricción. Si te interesa el objeto mecánico en sí —ver el rotor, saber que nadie más tiene tu calibre exacto ajustado igual, la ritualidad de darle cuerda— el automático justifica el mantenimiento extra.",
      "Un punto que casi nadie menciona: los automáticos de entrada (como los calibres NH35 o 4R36 de Seiko) no son más precisos que un cuarzo de 200 pesos. Pagas por la mecánica, no por la exactitud. Si buscas precisión pura, un cuarzo siempre gana.",
    ],
    relacionados: ["seiko-5-sports-srpd55", "citizen-ecodrive-promaster-bn0151"],
  },
  {
    slug: "primer-reloj-automatico",
    tag: "Para empezar",
    titulo: "Cómo elegir tu primer reloj automático",
    resumen:
      "Cuatro criterios antes de mirar la esfera: calibre, resistencia al agua, diámetro de caja y disponibilidad de repuestos.",
    parrafos: [
      "Antes de fijarte en si te gusta la esfera, revisa el calibre. Los automáticos de entrada casi siempre usan calibres genéricos japoneses (Seiko NH35/NH34, Miyota 8215) o su equivalente suizo más caro (ETA 2824). Un calibre genérico tiene una ventaja concreta: cualquier relojero en cualquier ciudad puede repararlo porque hay piezas de sobra en el mercado. Un calibre exclusivo de marca puede dejarte atado al servicio técnico oficial.",
      "La resistencia al agua importa más de lo que parece incluso si no nadas: un reloj de 30 metros aguanta salpicaduras y lavarte las manos, pero no una ducha ni mucho menos nadar. Para uso diario sin preocuparte, busca al menos 100 metros (10 ATM o 10 bar en la especificación).",
      "El diámetro de caja define si el reloj se ve proporcional en tu muñeca, no si es 'mejor' o 'peor'. Una muñeca delgada con una caja de 44mm se ve como si el reloj te hubiera ganado a ti. Mide tu muñeca y busca referencias: 38-40mm para muñecas delgadas, 40-42mm es el punto medio más seguro, 44mm+ solo si tu muñeca ya es ancha.",
      "Por último, revisa si el modelo sigue en producción o tiene una versión reciente. Los repuestos de un modelo descontinuado hace una década se vuelven un problema el día que necesites cambiar una corona o un cristal.",
    ],
    relacionados: ["seiko-5-sports-srpd55", "orient-bambino-v4"],
  },
  {
    slug: "mejores-relojes-menos-5000",
    tag: "Presupuesto",
    titulo: "Los mejores relojes por menos de $5,000 MXN",
    resumen:
      "Con menos de $5,000 pesos ya hay automáticos reales con calibre japonés, no solo cuarzos genéricos.",
    parrafos: [
      "Con un presupuesto de $5,000 pesos mexicanos, la pregunta no es 'qué reloj barato compro' sino 'qué estoy dispuesto a sacrificar'. En ese rango puedes conseguir un automático con calibre japonés genuino (no un clon) o un cuarzo con acabados que en otras marcas costarían el triple.",
      "Lo que normalmente se sacrifica a este precio: acabados de caja menos pulidos, cristal mineral en vez de zafiro (se raya más fácil), y funciones extra como cronógrafo o GMT. Lo que NO tienes que sacrificar: resistencia al agua decente, un calibre confiable, y una marca con historia real en relojería (no una marca de moda que subcontrata el ensamblaje).",
      "La regla práctica para no arrepentirte: revisa siempre la ficha de especificaciones completa, no solo la foto. Un reloj que se ve idéntico a otro 3 veces más caro en la miniatura de Amazon puede tener un cristal acrílico que se raya con la llave del carro. Compara movimiento, resistencia al agua y material de caja antes que estética.",
    ],
    relacionados: ["seiko-5-sports-srpd55", "orient-bambino-v4", "invicta-pro-diver-8926ob"],
  },
];

export function getGuiaBySlug(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
