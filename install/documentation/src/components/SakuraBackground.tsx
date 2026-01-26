import { useEffect, useState } from "react";

const SakuraBackground = () => {
    const [petals, setPetals] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: number }[]>([]);

    useEffect(() => {
        // Generate petals on mount
        const newPetals = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 10}s`,
            duration: `${15 + Math.random() * 20}s`,
            size: `${1 + Math.random() * 2}rem`,
            opacity: 0.4 + Math.random() * 0.4,
        }));
        setPetals(newPetals);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute animate-sakura-fall"
                    style={{
                        left: petal.left,
                        top: "-10%",
                        fontSize: petal.size,
                        "--petal-opacity": petal.opacity,
                        animationDelay: petal.delay,
                        animationDuration: petal.duration,
                    } as React.CSSProperties}
                >
                    🌸
                </div>
            ))}
            <style>{`
        @keyframes sakura-fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--petal-opacity);
          }
          90% {
            opacity: var(--petal-opacity);
          }
          100% {
            transform: translateY(110vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-sakura-fall {
          animation-name: sakura-fall;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          color: hsl(var(--primary));
        }
      `}</style>
        </div>
    );
};

export default SakuraBackground;
