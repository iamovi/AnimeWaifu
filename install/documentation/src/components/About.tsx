import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block bg-accent border-2 border-foreground px-3 py-1 text-sm font-bold mb-4 shadow-brutal-sm">
                ABOUT PROJECT
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                What is AnimeWaifu?
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  <strong>AnimeWaifu</strong> is a collection of applications and tools designed for anime enthusiasts.
                  The project brings anime waifus to your desktop and mobile devices through various applications,
                  from simple image viewers to interactive chat experiences.
                </p>
                <p>
                  The project aims to create fun, engaging, and accessible applications that celebrate anime culture.
                  Whether you want a quick waifu image, system information with style, or interactive features,
                  AnimeWaifu has something for everyone.
                </p>
                <p>
                  All AnimeWaifu projects are <strong>open source</strong> and available on GitHub.
                  We believe in community-driven development and welcome contributions from developers and anime fans alike.
                </p>
              </div>
            </div>



            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["Anime", "Open Source", "Windows", "Android", "CLI Tools"].map((tag) => (
                <span key={tag} className="bg-muted border-2 border-foreground px-3 py-1 text-sm font-bold shadow-brutal-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-8 border-t-2 border-foreground/10">
              <h3 className="text-xl font-bold mb-2">About the Creator</h3>
              <p className="mb-4">Hey, myself Ovi Ren, I'm a writer, I write code.</p>
              <Button size="lg" className="group" asChild>
                <a href="https://iamovi.github.io/" target="_blank" rel="noopener noreferrer">
                  Visit my site
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
