import { useEffect, useRef } from "react";

/**
 * RevealOnScroll - Animates children into view on scroll with a professional fade/slide effect.
 * Optional: Pass `animationClass` prop to customize the animation.
 */
export const RevealOnScroll = ({ children, animationClass = "fade-up" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          node.classList.add("visible");
          obs.unobserve(node); // Only animate once
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal opacity-0 transform transition-all duration-700 ease-out ${animationClass}`}
      tabIndex={-1}
      aria-live="polite"
    >
      {children}
    </div>
  );
};

// TailwindCSS styles (add to your global CSS if not present):
// .reveal.visible { opacity: 1 !important; transform: none !important; }
// .fade-up { transform: translateY(40px); }
// .fade-left { transform: translateX(-40px); }
// .fade-right { transform: translateX(40px); }
// .fade-up.visible, .fade-left.visible, .fade-right.visible { transform: none; opacity: 1; }