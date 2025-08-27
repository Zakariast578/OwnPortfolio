import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import CV from '@/assets/cv.pdf';

// --- Helper Components ---

// Reusable NavLink component for desktop
const NavLink = ({ href, activeSection, handleLinkClick, children, setIndicatorProps }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (activeSection === href.substring(1)) {
            setIndicatorProps({
                left: ref.current?.offsetLeft ?? 0,
                width: ref.current?.offsetWidth ?? 0,
            });
        }
    }, [activeSection, href, setIndicatorProps]);

    return (
        <a
            ref={ref}
            href={href}
            onClick={(e) => handleLinkClick(e, href)}
            className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                activeSection === href.substring(1)
                    ? 'text-foreground'
                    : 'text-foreground/70 hover:text-foreground'
            }`}
            aria-current={activeSection === href.substring(1) ? 'page' : undefined}
        >
            {children}
        </a>
    );
};

// Reusable IconButton for theme and CV download
const IconButton = ({ onClick, children, ariaLabel }) => (
    <button
        onClick={onClick}
        className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background"
        aria-label={ariaLabel}
    >
        {children}
    </button>
);


// --- Main Navbar Component ---

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0 });
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
        }
        return 'dark'; // Default to dark theme
    });

    const navLinks = React.useMemo(() => ([
        { href: '#home', label: 'Home' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#experience', label: 'Experience' },
        { href: '#contact', label: 'Contact' },
    ]), []);

    // --- Effects ---

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => setHasScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );

        navLinks.forEach((link) => {
            const section = document.querySelector(link.href);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, [navLinks]);
    
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }, [isMenuOpen]);


    // --- Handlers ---

    const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

    const handleLinkClick = useCallback((e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                hasScrolled ? 'border-b border-border/50 bg-background/80 backdrop-blur-xl' : 'bg-transparent'
            }`}
        >
            {/* Aurora effect for scrolled state */}
            <div
                className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
                    hasScrolled ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                    backgroundImage:
                        'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent)',
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#home"
                            onClick={(e) => handleLinkClick(e, '#home')}
                            className="text-foreground text-2xl font-bold tracking-wider transition-transform duration-300 hover:scale-105"
                            aria-label="Home (ZakariaSaid.dev)"
                        >
                            ZakariaSaid<span className="text-primary">.dev</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="relative ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.href}
                                    href={link.href}
                                    activeSection={activeSection}
                                    handleLinkClick={handleLinkClick}
                                    setIndicatorProps={setIndicatorProps}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            {/* Animated underline */}
                            <div
                                className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out"
                                style={{
                                    left: indicatorProps.left,
                                    width: indicatorProps.width,
                                    opacity: indicatorProps.width > 0 ? 1 : 0,
                                }}
                            />
                        </div>
                    </div>

                    {/* Right-side Actions (Desktop) */}
                    <div className="hidden md:flex items-center space-x-2">
                        <IconButton onClick={toggleTheme} ariaLabel={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                            <Sun size={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </IconButton>
                        <a
                            href={CV}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background transition-transform duration-300 hover:scale-105"
                        >
                            <Download size={16} />
                            Download CV
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)} ariaLabel="Open main menu">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </IconButton>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
            >
                <div className="pt-20 h-full flex flex-col">
                    <div className="px-5 space-y-2">
                        {navLinks.map((link, index) => (
                            <a
                                key={`mobile-${link.href}`}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`block px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
                                    isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                } ${
                                    activeSection === link.href.substring(1)
                                        ? 'text-primary bg-primary/10'
                                        : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                                }`}
                                style={{ transitionDelay: `${index * 50 + 100}ms` }}
                                aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="mt-auto p-5 border-t border-border">
                        <div className="flex items-center justify-between">
                            <a
                                href={CV}
                                download
                                className="inline-flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted"
                            >
                                <Download size={20} />
                                Download CV
                            </a>
                            <IconButton onClick={toggleTheme} ariaLabel={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                                <Sun size={24} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon size={24} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};