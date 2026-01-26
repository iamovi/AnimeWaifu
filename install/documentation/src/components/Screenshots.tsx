import { Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

const screenshots = [
    { id: 0, color: "bg-gum-purple", image: "/screenshots/cursor.jpg" },
    { id: 1, color: "bg-gum-pink", image: "/screenshots/i.png" },
    { id: 2, color: "bg-gum-yellow", image: "/screenshots/ii.png" },
    { id: 3, color: "bg-gum-blue", image: "/screenshots/iii.png" },
    { id: 4, color: "bg-gum-green", image: "/screenshots/iv.png" },
];

const Screenshots = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="screenshots" className="py-24 bg-muted border-y-2 border-foreground">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <span className="inline-block bg-primary border-2 border-foreground px-3 py-1 text-sm font-bold mb-4 shadow-brutal-sm text-black">
                            GALLERY
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black">
                            App Screenshots
                        </h2>
                    </div>
                    <p className="text-lg max-w-md">
                        Visual overview of the AnimeWaifu ecosystem in action.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {screenshots.map((screen, index) => (
                        <Dialog key={screen.id}>
                            <DialogTrigger asChild>
                                <div
                                    className={`group animate-fade-in block border-2 border-foreground p-3 shadow-brutal transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg ${screen.color} cursor-zoom-in`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="aspect-video border-2 border-foreground bg-white mb-4 flex items-center justify-center relative overflow-hidden">
                                        {screen.image ? (
                                            <img
                                                src={screen.image}
                                                alt={`Screenshot ${screen.id}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 flex items-center justify-center text-black/20">
                                                    <ImageIcon size={48} className="animate-pulse" />
                                                </div>
                                                <div className="relative z-10 text-center p-4">
                                                    <p className="font-black text-xs uppercase tracking-widest text-black/40 italic">
                                                        [ Screenshot {screen.id} ]
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-4 border-foreground bg-background shadow-brutal-xl overflow-hidden rounded-none">
                                <div className="relative w-full h-full flex items-center justify-center bg-black/5">
                                    <img
                                        src={screen.image}
                                        alt={`Screenshot ${screen.id}`}
                                        className="max-w-full max-h-[90vh] object-contain"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Screenshots;
