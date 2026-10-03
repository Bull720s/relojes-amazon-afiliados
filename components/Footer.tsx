export default function Footer() {
  return (
    <footer className="border-t border-line px-5 md:px-8 py-10 flex flex-col md:flex-row gap-4 justify-between text-[12px] uppercase tracking-[0.06em] text-ink-soft">
      <div className="text-ink font-bold normal-case text-[15px]" style={{ fontStyle: "italic" }}>
        el cronista<sup className="text-[8px] ml-0.5">TM</sup>
      </div>
      <div className="max-w-xl md:text-right normal-case tracking-normal">
        Participamos en el Programa de Afiliados de Amazon Services LLC y percibimos comisiones por compras
        calificadas.
      </div>
    </footer>
  );
}
