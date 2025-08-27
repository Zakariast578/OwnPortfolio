import React from "react";
import { motion as Motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { GraduationCap, Briefcase } from "lucide-react";
import me from "@/assets/me.jpeg";

const timeline = [
    
    {
        type: "education",
        role: "BSc Computer Science",
        company: "SNU",
        year: "2021-present",
        description:
            "Undergoing studies in computer science with a focus on software development and algorithms.",
        image: me,
    },
    {
        type: "work",
        role: "Frontend Intern",
        company: "Freelance",
        year: "2024",
        description:
            "Built responsive UI components and improved accessibility for client projects.",
        image: me,
    },
];

function TimelineItem({ item, idx }) {
    const [open, setOpen] = React.useState(false);
    const isLeft = idx % 2 === 0;

    return (
        <Motion.li
            key={idx}
            className={`relative list-none pl-8 md:pl-0 ${
                isLeft ? "md:pr-8 md:col-start-1" : "md:pl-8 md:col-start-2"
            }`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            role="listitem"
        >
            <span
                className="pointer-events-none absolute left-3 top-6 size-3 rounded-full border bg-background shadow md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
            />
            <Motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card className="group border border-border/70 bg-card/80 shadow-sm transition-all hover:shadow-md">
                    <CardContent className="flex items-start gap-4 p-5">
                        <img
                            src={item.image}
                            alt={`${item.type === "work" ? "Company" : "Institution"}: ${item.company}`}
                            className="size-12 rounded-full object-cover border"
                        />
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    {item.type === "work" ? (
                                        <Briefcase className="size-4" aria-hidden="true" />
                                    ) : (
                                        <GraduationCap className="size-4" aria-hidden="true" />
                                    )}
                                    {item.role}
                                </Badge>
                                <Badge>{item.year}</Badge>
                            </div>
                            <p className="mt-1 text-sm font-medium text-muted-foreground">
                                {item.company}
                            </p>

                            <Accordion
                                type="single"
                                collapsible
                                className="mt-2"
                                value={open ? "desc" : undefined}
                                onValueChange={(v) => setOpen(Boolean(v))}
                            >
                                <AccordionItem value="desc">
                                    <AccordionTrigger
                                        className="text-xs"
                                        aria-expanded={open}
                                    >
                                        Details
                                    </AccordionTrigger>
                                    <AccordionContent className="text-xs text-muted-foreground">
                                        {item.description}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </CardContent>
                </Card>
            </Motion.div>
        </Motion.li>
    );
}

export default function ExperienceEducation() {
    return (
        <section
            id="experience"
            aria-labelledby="exp-title"
            className="py-16"
        >
            <div className="mx-auto max-w-5xl px-4">
                <Motion.header
                    className="mb-10"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <h2
                        id="exp-title"
                        className="text-center text-3xl font-bold tracking-tight sm:text-4xl text-primary"
                    >
                        Experience & Education
                    </h2>
                </Motion.header>

                <ul
                    className="
                        relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12
                        before:absolute before:inset-y-0 before:left-[1.125rem] before:w-px before:bg-border before:content-['']
                        md:before:left-1/2
                    "
                    role="list"
                    aria-label="Timeline"
                >
                    {timeline.map((item, idx) => (
                        <TimelineItem key={idx} item={item} idx={idx} />
                    ))}
                </ul>
            </div>
        </section>
    );
}