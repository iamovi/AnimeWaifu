import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Hero = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["waifu"],
    queryFn: async () => {
      setIsImageLoading(true);
      const res = await fetch("https://api.waifu.pics/sfw/waifu");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  const handleFetchNext = () => {
    setIsImageLoading(true);
    refetch();
  };

  return (
    <section className="min-h-screen flex items-center pt-16 pb-20 relative overflow-hidden">
      {/* Decorative elements - Gumroad style */}
      <div className="absolute top-32 right-20 w-24 h-24 bg-primary border-2 border-foreground shadow-brutal rotate-12 hidden lg:block" />
      <div className="absolute bottom-40 left-16 w-16 h-16 bg-secondary border-2 border-foreground shadow-brutal -rotate-6 hidden lg:block" />
      <div className="absolute top-1/2 right-40 w-12 h-12 bg-accent border-2 border-foreground shadow-brutal rotate-45 hidden lg:block" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary border-2 border-foreground px-4 py-2 mb-8 shadow-brutal-sm animate-fade-in">
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold uppercase tracking-wide">Docs</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-6 animate-slide-up">
              AnimeWaifu
              <br />
              <span className="bg-primary px-2">Docs + Apps</span>
              <br />
              Explore Now.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl max-w-xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              The right place to know about AnimeWaifu Project and it's Apps,
              tools and other ecosystem components.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" variant="black" className="group" asChild>
                <a
                  href="#apps"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore Apps
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com/iamovi/AnimeWaifu" target="_blank" rel="noopener noreferrer">
                  GitHub Repo
                </a>
              </Button>
            </div>
          </div>

          {/* Waifu Card */}
          <div className="animate-fade-in lg:mt-0 mt-8" style={{ animationDelay: "0.4s" }}>
            <div className="relative group mx-auto max-w-sm lg:max-w-[280px]">
              <div className="bg-white border-4 border-foreground p-2 shadow-brutal rotate-2 group-hover:rotate-0 transition-transform duration-300">
                <div className="aspect-square overflow-hidden bg-muted border-2 border-foreground relative">
                  {(isLoading || isFetching || isImageLoading) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                      <div className="w-12 h-12 border-4 border-primary border-t-foreground rounded-full animate-spin" />
                    </div>
                  )}
                  {data?.url && (
                    <img
                      src={data.url}
                      alt="Random Waifu"
                      className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => setIsImageLoading(false)}
                    />
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-tighter bg-accent border-2 border-foreground px-2 py-0.5 shadow-brutal-sm w-full text-center">
                      Waifu of the Moment
                    </span>
                  </div>
                  <Button
                    onClick={handleFetchNext}
                    variant="black"
                    size="sm"
                    className="w-full flex items-center gap-2 justify-center group/btn"
                    disabled={isFetching || isImageLoading}
                  >
                    <RefreshCw className={`w-4 h-4 ${(isFetching || isImageLoading) ? 'animate-spin' : 'group-hover/btn:rotate-180 transition-transform duration-500'}`} />
                    Fetch Next
                  </Button>
                </div>
              </div>
              {/* Decorative behind card */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-foreground bg-secondary -z-10" />
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-3 mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="gum-card px-4 py-3">
            <div className="text-lg font-black">Open Source</div>
            <div className="text-xs font-semibold text-muted-foreground">GitHub Project</div>
          </div>
          <div className="gum-card-pink px-4 py-3 text-black">
            <div className="text-lg font-black">Free</div>
            <div className="text-xs font-semibold">Forever & Always</div>
          </div>
          <div className="gum-card-yellow px-4 py-3 text-black">
            <div className="text-lg font-black">Multi-Platform</div>
            <div className="text-xs font-semibold">Windows & Android</div>
          </div>
          <div className="gum-card-accent px-4 py-3 text-black">
            <div className="text-lg font-black">Kawaii CLI</div>
            <div className="text-xs font-semibold">Terminal Tools</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
