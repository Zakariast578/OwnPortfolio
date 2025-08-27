import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }) => {
    // Modern loading screen with animated logo, typing effect, and progress bar
    const [text, setText] = useState("");
    const fullText = "< ZakariaSaid.dev />";
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;
            if (index > fullText.length) {
                clearInterval(interval);
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 700); // Slightly faster for a snappier feel
            }
        }, 80); // Faster typing
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-background text-foreground flex flex-col items-center justify-center">
            <div className="flex flex-col items-center mb-6">
                <div className="mb-3 animate-spin-slow">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="20" stroke="hsl(var(--primary))" strokeWidth="4" strokeDasharray="60 40" />
                        <circle cx="24" cy="24" r="12" stroke="hsl(var(--secondary))" strokeWidth="3" strokeDasharray="30 18" />
                    </svg>
                </div>
                <div className="text-2xl md:text-3xl font-mono font-bold tracking-wide flex items-center">
                    {text}
                    <span className="animate-blink ml-1 text-primary">|</span>
                </div>
            </div>
            <div className="w-[200px] h-[4px] bg-muted rounded relative overflow-hidden shadow-inner">
                <div className="w-[40%] h-full bg-primary/70 animate-loading-bar rounded"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;

// TailwindCSS (add to your global CSS if not present):
// .animate-blink { animation: blink 1s steps(2, start) infinite; }
// @keyframes blink { to { visibility: hidden; } }
// .animate-loading-bar { animation: loading-bar 1.2s linear infinite; }
// @keyframes loading-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }
// .animate-spin-slow { animation: spin 2.5s linear infinite; }

