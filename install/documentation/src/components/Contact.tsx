import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Github } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/iamovi", label: "GitHub" },
  { icon: Mail, href: "mailto:fornet.ovi@gmail.com", label: "Email" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background text-foreground border-t-2 border-foreground relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-primary border-2 border-foreground rotate-12 hidden lg:block" />
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-secondary border-2 border-foreground -rotate-6 hidden lg:block" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block bg-primary text-foreground border-2 border-foreground px-4 py-2 text-sm font-bold mb-8 shadow-brutal-sm">
            LET'S COLLABORATE
          </span>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 animate-fade-in">
            Interested in
            <br />
            getting involved?
          </h2>

          <p className="text-xl text-foreground/80 mb-10 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Check out the project repository and feel free to submit issues,
            pull requests, or suggestions!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button
              size="xl"
              className="group bg-primary text-foreground border-2 border-foreground hover:bg-primary/90 shadow-brutal-sm hover:shadow-none transition-all"
              asChild
            >
              <a href="https://github.com/iamovi/AnimeWaifu" target="_blank" rel="noopener noreferrer">
                View on GitHub
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Divider */}
          <div className="border-t border-foreground/30 pt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p className="text-foreground/60 mb-6 font-semibold">Or find me on</p>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : "_blank"}
                  rel={social.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                  className="w-12 h-12 border-2 border-foreground bg-background hover:bg-primary transition-colors flex items-center justify-center shadow-brutal-sm hover:shadow-none"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
