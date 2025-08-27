import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { motion as Motion } from "framer-motion";
import logo from "@/assets/logo.png";

export default function Footer() {
    return (
        <footer
            role="contentinfo"
            aria-label="Site footer"
            className="bg-slate-100 border-t border-slate-200 py-6 px-4"
        >
            <Card className="mx-auto max-w-6xl shadow-sm border border-slate-200 bg-white">
                <CardContent className="flex flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row md:px-6">
                    <div className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="h-7 w-7 rounded"
                        />
                        <p className="text-sm text-slate-700">
                            © 2025 Zakaria Said. All rights reserved.
                        </p>
                    </div>

                    <nav aria-label="Social links" className="flex items-center gap-2">
                        <Motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                aria-label="GitHub profile"
                                className="text-slate-700 hover:text-slate-900 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            >
                                <a href="https://github.com/Zakariast578" target="_blank" rel="noopener noreferrer">
                                    <SiGithub className="h-5 w-5" aria-hidden="true" />
                                </a>
                            </Button>
                        </Motion.div>

                        <Motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                aria-label="LinkedIn profile"
                                className="text-slate-700 hover:text-slate-900 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            >
                                <a href="https://www.linkedin.com/in/zakaria-said-a948362a7/" target="_blank" rel="noopener noreferrer">
                                    <SiLinkedin className="h-5 w-5" aria-hidden="true" />
                                </a>
                            </Button>
                        </Motion.div>

                        <Motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                aria-label="WhatsApp profile"
                                className="text-slate-700 hover:text-slate-900 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            >
                                <a href="https://wa.me/+252613328355" target="_blank" rel="noopener noreferrer">
                                    <SiWhatsapp className="h-5 w-5" aria-hidden="true" />
                                </a>
                            </Button>
                        </Motion.div>
                    </nav>
                </CardContent>
            </Card>
        </footer>
    );
}