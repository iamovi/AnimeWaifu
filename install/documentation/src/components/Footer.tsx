const Footer = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-6 bg-background text-foreground border-t-2 border-foreground">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <a
            href="#"
            onClick={scrollToTop}
            className="text-xl font-black flex items-center gap-1"
          >
            <span className="w-7 h-7 bg-primary text-foreground border-2 border-background flex items-center justify-center text-xs">
              A
            </span>
            <span>nimeWaifu by Ovi ren.</span>
          </a>

          {/* Tagline */}
          <p className="text-foreground/60 text-sm font-medium italic">
            i'm a writer, i write scripts.
          </p>

          {/* Quick links */}
          <div className="flex gap-6 text-sm font-semibold">
            <a href="https://github.com/iamovi/AnimeWaifu" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="https://iamovi.github.io/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              Creator
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
