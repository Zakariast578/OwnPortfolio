import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, ChevronDown, ArrowRight } from "lucide-react";
import Me from "@/assets/me.jpeg";

const UNUSED_MOTION = motion;

// Typewriter hook
function useTypewriter(words, speed = 80, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words?.length) return;
    const current = words[index % words.length];
    let timeout;

    if (!deleting && subIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      timeout = setTimeout(() => {}, speed);
    } else {
      timeout = setTimeout(() => {
        setSubIndex((s) => s + (deleting ? -1 : 1));
      }, deleting ? speed / 1.8 : speed);
    }

    return () => clearTimeout(timeout);
  }, [words, index, subIndex, deleting, speed, pause]);

  return useMemo(
    () => (words?.length ? words[index % words.length].slice(0, subIndex) : ""),
    [words, index, subIndex]
  );
}

export default function Hero() {
  const roles = [
    "Software Developer",
    "Full‑Stack Engineer",
    "React & Node.js Enthusiast",
  ];
  const typed = useTypewriter(roles, 70, 1000);
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const handleSmoothScroll = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getFadeUpProps = (delay = 0, amount = 0.6) =>
    prefersReducedMotion
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount },
          transition: { duration: 0.6, ease: "easeOut", delay },
        };

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      role="banner"
      aria-label="Hero section"
  className="relative isolate overflow-hidden bg-gradient-to-b from-primary-dark/95 to-primary/30 text-foreground"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? {} : { duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Subtle zoom/fade overlay */}
        <motion.div
          className="absolute inset-0"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.05 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 1.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/20),transparent_60%),radial-gradient(ellipse_at_bottom,theme(colors.accent/20),transparent_60%)]" />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 1.2 }}
          className="absolute -top-48 right-0 h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 1.2, delay: 0.1 }}
          className="absolute -bottom-48 -left-24 h-[420px] w-[420px] rounded-full bg-accent/25 blur-3xl"
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-24 sm:py-28 md:grid-cols-2 lg:gap-12 lg:py-32">
        {/* Copy */}
        <motion.div className="text-center md:text-left" {...getFadeUpProps(0, 0.6)}>
          <Badge variant="secondary" className="mb-3 inline-flex items-center gap-2 bg-slate-500">
            <span className="inline-block size-1.5 rounded-full bg-green-500" />
            Available for freelance work
          </Badge>

          {/* Title */}
          <motion.h1
            className="mt-2 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 18 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.8 },
                  transition: { duration: 0.6, ease: "easeOut" },
                })}
          >
            Hi, I'm <span className="text-primary">Zakaria</span>
          </motion.h1>

          {/* Tagline with delay */}
          <motion.p
            className="mt-3 text-lg text-secondary sm:text-xl"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 12 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.7 },
                  transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
                })}
          >
            <span className="sr-only">Role:</span>
            <span aria-live="polite" aria-atomic="true" className="font-semibold text-foreground">
              {typed}
            </span>
            <span
              className="ml-0.5 inline-block w-[2px] animate-pulse bg-foreground/80 align-middle"
              aria-hidden="true"
            />
          </motion.p>

          <motion.p className="mt-4 max-w-prose text-balance text-secondary md:max-w-lg" {...getFadeUpProps(0.25, 0.6)}>
            I'm a passionate developer specializing in building fast, accessible, and user-friendly web applications.

          </motion.p>

          {/* Buttons */}
          <motion.nav
            aria-label="Primary"
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 10 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.6 },
                  transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
                })}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="group px-6" onClick={handleSmoothScroll("projects")}>
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="px-6"
                onClick={handleSmoothScroll("contact")}
                aria-label="Contact me"
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.a
              href="https://github.com/Zakariast578"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-foreground/[0.05] text-foreground/80 transition-colors hover:bg-foreground/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/zakaria-said-a948362a7/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-foreground/[0.05] text-foreground/80 transition-colors hover:bg-foreground/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
          </motion.nav>
        </motion.div>

        {/* Right: Photo / Card */}
        <motion.div
          className="relative mx-auto w-full max-w-md"
          {...getFadeUpProps(0.15, 0.4)}
          animate={
            prefersReducedMotion
              ? {}
              : { y: [0, -6, 0] }
          }
          transition={prefersReducedMotion ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Card className="relative overflow-hidden border-border/60 bg-foreground/[0.03] backdrop-blur">
            <motion.div
              className="absolute inset-0"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
            </motion.div>

            <div className="flex flex-col items-center gap-4 px-8 py-10 sm:flex-row sm:gap-6">
              {/* making Me avatar */}
              <Avatar className="size-28 ring-2 ring-primary/40">
                <AvatarImage src={Me} alt="Zakaria portrait" />
                <AvatarFallback>ZA</AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left">
                <p className="text-xl font-semibold text-foreground">Zakaria</p>
                <p className="text-foreground/70">Building fast, accessible web apps.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary-foreground/90">
                    React
                  </span>
                  <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs text-secondary-foreground/90">
                    Node.js
                  </span>
                  <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-100">
                    TailwindCSS
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Scroll cue */}
    <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <motion.button
          type="button"
          aria-label="Scroll to projects"
          onClick={handleSmoothScroll("projects")}
      className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-border bg-foreground/[0.05] p-2 text-foreground/80 hover:bg-foreground/10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.section>
  );
}