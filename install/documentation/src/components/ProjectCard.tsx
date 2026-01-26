import { Download } from "lucide-react";

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  color: "pink" | "yellow" | "blue" | "green" | "purple" | "orange";
  links?: ProjectLink[];
  index: number;
}

const colorClasses = {
  pink: "bg-gum-pink",
  yellow: "bg-gum-yellow",
  blue: "bg-gum-blue",
  green: "bg-gum-green",
  purple: "bg-gum-purple",
  orange: "bg-gum-orange",
};

const ProjectCard = ({ title, category, description, color, links, index }: ProjectCardProps) => {
  return (
    <div
      className={`group animate-fade-in block border-2 border-foreground p-6 shadow-brutal transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg ${colorClasses[color]} text-black`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Content */}
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-2xl font-black">
            {title}
          </h3>
          <span className="bg-foreground text-background border-2 border-foreground px-2 py-0.5 text-[10px] font-black uppercase shadow-brutal-sm whitespace-nowrap">
            {category}
          </span>
        </div>

        <p className="font-medium leading-snug">
          {description}
        </p>

        {/* Links */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background border-2 border-foreground px-3 py-1 text-xs font-bold hover:bg-primary hover:text-foreground transition-colors flex items-center gap-1 shadow-brutal-sm hover:shadow-none translate-y-0.5 hover:translate-y-1"
              >
                {link.label}
                <Download className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
