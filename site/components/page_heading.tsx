type PageHeadingProps = {
  title: string;
};

/** Centred page title framed by pink stars. One shared header for every page. */
export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <header className="mb-12 text-center">
      <p
        className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mb-5"
        aria-hidden="true"
      >
        ★ ★ ★
      </p>
      <h1 className="font-['PressStart2P'] text-base leading-loose text-pink-400 uppercase tracking-widest">
        {title}
      </h1>
      <p
        className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mt-5"
        aria-hidden="true"
      >
        ★ ★ ★
      </p>
    </header>
  );
}
