import React, { useEffect, useState } from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    const target = document.documentElement;
    const observer = new MutationObserver(() => {
      const isDark = target.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });
    observer.observe(target, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };
