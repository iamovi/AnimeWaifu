import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

const mainApps = [
  {
    title: "AnimeWaifu",
    category: "Main App",
    description: "Main AnimeWaifu application for Windows and Android. Features chatrooms and more.",
    color: "pink" as const,
    links: [
      { label: "APK", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu.apk" },
      { label: "EXE", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifuSetup.exe" },
      { label: "Uptodown", url: "https://animewaifu.en.uptodown.com/android" },
    ],
  },
  {
    title: "AnimeWaifu Basic",
    category: "Basic Version",
    description: "Basic version of the main application. Just swipe and waifu images without chatrooms.",
    color: "yellow" as const,
    links: [
      { label: "APK", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Basic.apk" },
      { label: "EXE", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Basic_Setup.exe" },
    ],
  },
  {
    title: "AnimeWaifu Lite",
    category: "Lite Version",
    description: "Lightweight version of the main application. Optimized for performance.",
    color: "blue" as const,
    links: [
      { label: "APK", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Lite.apk" },
      { label: "EXE", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Lite_Setup.exe" },
    ],
  },
  {
    title: "AnimeWaifu Cloud",
    category: "Cloud Based",
    description: "Cloud Based App to run All AnimeWaifu Versions from your browser.",
    color: "green" as const,
    links: [
      { label: "APK", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Cloud.apk" },
      { label: "EXE", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Cloud_Setup.exe" },
    ],
  },
  {
    title: "AnimeWaifu QuickChat",
    category: "Dedicated App",
    description: "A dedicated quick chat app extracted from the main AnimeWaifu App.",
    color: "purple" as const,
    links: [
      { label: "APK", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/QuickChat.apk" },
      { label: "EXE", url: "https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/QuickChatSetup.exe" },
    ],
  },
];

const sideProjects = [
  {
    title: "AnimeWaifu Pixel Terminal",
    category: "CLI Tool",
    description: "Brings Anime Waifu straight to your terminal! Fetch a new waifu in pixel style.",
    color: "orange" as const,
    links: [
      { label: "NPM Package", url: "https://www.npmjs.com/package/animewaifu_pixel_terminal" },
    ],
  },
  {
    title: "SysWaifu 🌸",
    category: "CLI Tool",
    description: "A Cross-Platform aesthetic system info fetcher with a waifu touch.",
    color: "pink" as const,
    links: [
      { label: "View GitHub", url: "https://github.com/iamovi/syswaifu" },
      { label: "NPM Package", url: "https://www.npmjs.com/package/syswaifu" },
    ],
  },
];

const Projects = () => {
  return (
    <div className="space-y-24">
      <section id="apps" className="py-24 bg-muted border-y-2 border-foreground">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="inline-block bg-primary border-2 border-foreground px-3 py-1 text-sm font-bold mb-4 shadow-brutal-sm">
                AVAILABLE APPS
              </span>
              <h2 className="text-4xl md:text-5xl font-black">
                Explore the Ecosystem
              </h2>
            </div>
            <p className="text-lg max-w-md">
              A curated collection of AnimeWaifu applications for all platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {mainApps.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}

            {/* Release Site Card */}
            <div className="group animate-fade-in block border-2 border-foreground p-6 shadow-brutal transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg bg-white text-black">
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-2xl font-black">Visit Release Site</h3>
                  <span className="bg-black text-white border-2 border-foreground px-2 py-0.5 text-[10px] font-black uppercase shadow-brutal-sm whitespace-nowrap">
                    GitHub
                  </span>
                </div>
                <p className="font-medium leading-snug">
                  Check out the full release notes and alternative download options on the official GitHub repository.
                </p>
                <div className="pt-2">
                  <a
                    href="https://github.com/iamovi/AnimeWaifu/releases/tag/waifuappsv2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 font-bold hover:bg-black/90 transition-colors shadow-brutal-sm hover:translate-y-0.5 hover:shadow-none"
                  >
                    Release Page
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="gum-card-accent p-8 border-2 border-foreground shadow-brutal max-w-3xl mx-auto">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
              <ArrowRight className="w-6 h-6" />
              PowerShell Installation
            </h3>
            <p className="mb-4 font-mono bg-background p-4 border-2 border-foreground shadow-brutal-sm text-sm break-all overflow-x-auto">
              powershell -c "irm iamovi.github.io/AnimeWaifu/Install.ps1 | iex"
            </p>
            <p className="text-sm font-bold">
              Run PowerShell as administrator to use the official installer.
            </p>
          </div>
        </div>
      </section>

      <section id="side-projects" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="inline-block bg-accent border-2 border-foreground px-3 py-1 text-sm font-bold mb-4 shadow-brutal-sm">
                SIDE PROJECTS
              </span>
              <h2 className="text-4xl md:text-5xl font-black">
                CLI & Terminal Tools
              </h2>
            </div>
            <p className="text-lg max-w-md">
              Bringing your favorite waifus to the command line interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sideProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
