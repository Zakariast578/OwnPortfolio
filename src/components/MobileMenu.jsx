import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
    const menuItems = [
        { href: "#home", label: "Home" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#experience", label: "Experience" },
        { href: "#contact", label: "Contact" },
    ];

    const containerRef = useRef(null);
    const previouslyFocusedRef = useRef(null);

    const closeMenu = () => setMenuOpen(false);

    // Scroll lock, Escape to close, and basic focus trap
    useEffect(() => {
        if (!menuOpen) return;

        previouslyFocusedRef.current = document.activeElement;
        const root = document.documentElement;
        const restoreOverflow = root.style.overflow;
        root.style.overflow = "hidden";

        // Focus the first interactive element
        const tryFocus = () => {
            const first = containerRef.current?.querySelector(
                "[data-autofocus], a, button, [tabindex]:not([tabindex='-1'])"
            );
            first?.focus();
        };
        setTimeout(tryFocus, 0);

    const onKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
        setMenuOpen(false);
                return;
            }
            if (e.key === "Tab") {
                const nodes = containerRef.current?.querySelectorAll(
                    "a, button, [tabindex]:not([tabindex='-1'])"
                );
                if (!nodes || nodes.length === 0) return;
                const list = Array.from(nodes);
                const i = list.indexOf(document.activeElement);
                let next = i;
                if (e.shiftKey) {
                    next = i <= 0 ? list.length - 1 : i - 1;
                } else {
                    next = i === list.length - 1 ? 0 : i + 1;
                }
                e.preventDefault();
                list[next]?.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            root.style.overflow = restoreOverflow;
            const prev = previouslyFocusedRef.current;
            if (prev && typeof prev.focus === "function") prev.focus();
        };
    }, [menuOpen, setMenuOpen]);

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { when: "beforeChildren", staggerChildren: 0.08, delayChildren: 0.05 },
        },
        exit: { opacity: 0 },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 320, damping: 26 },
        },
        exit: { opacity: 0, y: 8 },
    };

    return (
        <AnimatePresence>
            {menuOpen && (
                <Motion.div
                    key="mobile-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-title"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={overlayVariants}
                    className="fixed inset-0 z-50 flex items-center justify-center md:hidden"
                    onClick={closeMenu}
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" aria-hidden="true" />

                    {/* Close button */}
                    <Motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            closeMenu();
                        }}
                        aria-label="Close menu"
                        className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground/80 shadow-sm backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-foreground hover:border-border"
                    >
                        <span aria-hidden>&times;</span>
                    </Motion.button>

                    {/* Menu content */}
                    <div
                        ref={containerRef}
                        className="relative z-10 w-full px-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 id="mobile-menu-title" className="sr-only">
                            Mobile navigation
                        </h2>

                        <nav aria-label="Mobile">
                            <ul className="space-y-6 text-center w-full font-inter">
                                {menuItems.map((item, idx) => (
                                    <Motion.li key={item.href} variants={itemVariants}>
                                        <a
                                            href={item.href}
                                            data-autofocus={idx === 0 ? true : undefined}
                                            className="nav-underline inline-block text-3xl font-semibold text-foreground/85 hover:text-foreground py-2 transition-transform duration-300 active:scale-95"
                                            onClick={closeMenu}
                                            aria-label={item.label}
                                        >
                                            {item.label}
                                        </a>
                                    </Motion.li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </Motion.div>
            )}
        </AnimatePresence>
    );
};


// Add to your global CSS:
// .nav-underline {
//   position: relative;
//   display: inline-block; /* Changed from block to fit content width */
//   transition: color 0.2s;
// }
// .nav-underline::after {
//   content: '';
//   position: absolute;
//   left: 50%; /* Center the underline */
//   right: 50%;
//   bottom: -2px;
//   height: 2px;
//   background: #f59e42; /* Tailwind yellow-600 */
//   border-radius: 2px;
//   transition: left 0.3s ease-out, right 0.3s ease-out;
// }
// .nav-underline:hover::after, .nav-underline:focus::after {
//   left: 0;
//   right: 0;
// }