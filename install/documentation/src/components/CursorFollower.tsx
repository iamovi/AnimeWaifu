import { useEffect, useState } from "react";

const CursorFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div
            className="fixed pointer-events-none z-[9999] transition-transform duration-300 ease-out flex items-center justify-center"
            style={{
                left: position.x,
                top: position.y,
                transform: `translate(-50%, -50%)`,
            }}
        >
            <div className="relative">
                <span className="text-3xl animate-wiggle inline-block">🌸</span>
                {/* Subtle neo-brutalist trail effect */}
                <div className="absolute inset-0 bg-primary/20 -z-10 blur-xl scale-150 animate-pulse" />
            </div>
        </div>
    );
};

export default CursorFollower;
