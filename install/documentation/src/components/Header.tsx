import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-foreground">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-black flex items-center gap-1">
          <span className="w-8 h-8 bg-primary border-2 border-foreground flex items-center justify-center text-sm shadow-brutal-sm">
            A
          </span>
          <span>nimeWaifu</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <a href="#apps" className="px-4 py-2 font-semibold hover:bg-muted transition-colors">
            Apps
          </a>
          <a href="#side-projects" className="px-4 py-2 font-semibold hover:bg-muted transition-colors">
            Side Projects
          </a>
          <a href="#screenshots" className="px-4 py-2 font-semibold hover:bg-muted transition-colors">
            Screenshots
          </a>
          <a href="#about" className="px-4 py-2 font-semibold hover:bg-muted transition-colors">
            About
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button variant="black" size="sm" asChild>
            <a href="https://github.com/iamovi/AnimeWaifu" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-10 h-10 border-2 border-foreground flex items-center justify-center shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b-2 border-foreground animate-fade-in">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
            <a href="#apps" className="py-3 font-bold border-b border-muted">Apps</a>
            <a href="#side-projects" className="py-3 font-bold border-b border-muted">Side Projects</a>
            <a href="#screenshots" className="py-3 font-bold border-b border-muted">Screenshots</a>
            <a href="#about" className="py-3 font-bold border-b border-muted">About</a>
            <div className="flex items-center justify-between py-3 border-b border-muted">
              <span className="font-bold">Theme</span>
              <ThemeToggle />
            </div>
            <Button variant="black" className="mt-4" asChild>
              <a href="https://github.com/iamovi/AnimeWaifu" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
