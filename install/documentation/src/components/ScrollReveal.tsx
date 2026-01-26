import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    animation?: "fade-up" | "fade-in" | "bounce-in" | "slide-in-left" | "slide-in-right";
    delay?: number;
    className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    animation = "fade-up",
    delay = 0,
    className = ""
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const animationClasses = {
        "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        "fade-in": isVisible ? "opacity-100" : "opacity-0",
        "bounce-in": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
        "slide-in-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20",
        "slide-in-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20",
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${animationClasses[animation]} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
