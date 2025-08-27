import { RevealOnScroll } from "../RevealOnScroll.jsx";
import ExperienceEducation from "./ExperienceEducation.jsx";
import React from "react";
import { motion as Motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
// import { Skills } from './Skills';

// SVG icons for stack
const icons = {
  React: (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
      <g>
        <ellipse
          stroke="#61DAFB"
          strokeWidth="2"
          cx="20"
          cy="20"
          rx="18"
          ry="7.5"
        />
        <ellipse
          stroke="#61DAFB"
          strokeWidth="2"
          cx="20"
          cy="20"
          rx="7.5"
          ry="18"
          transform="rotate(60 20 20)"
        />
        <ellipse
          stroke="#61DAFB"
          strokeWidth="2"
          cx="20"
          cy="20"
          rx="7.5"
          ry="18"
          transform="rotate(120 20 20)"
        />
        <circle fill="#61DAFB" cx="20" cy="20" r="3.5" />
      </g>
    </svg>
  ),
  "Next.js": (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 0C7.163 0 0 7.163 0 16c0 8.837 7.163 16 16 16s16-7.163 16-16c0-8.837-7.163-16-16-16zm0 29.333C8.636 29.333 2.667 23.364 2.667 16S8.636 2.667 16 2.667 29.333 8.636 29.333 16 23.364 29.333 16 29.333z"
        fill="#fff"
      />
      <path d="M22.667 9.333h-2.667v13.334h2.667V9.333z" fill="#fff" />
    </svg>
  ),
  TailwindCSS: (
    <svg width="20" height="20" viewBox="0 0 48 28" fill="none">
      <path
        d="M13.5 14C13.5 7.648 18.648 2.5 25 2.5c4.5 0 8.5 2.5 10.5 7.5-2-2-4.5-3-7.5-3-6.352 0-11.5 5.148-11.5 11.5 0 4.5 2.5 8.5 7.5 10.5-2-2-3-4.5-3-7.5z"
        fill="#38bdf8"
      />
    </svg>
  ),
  TypeScript: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#3178C6" />
      <path d="M10.5 14.5h11v2h-4.5v7h-2v-7H10.5v-2z" fill="#fff" />
    </svg>
  ),
  "Node.js": (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#68A063" />
      <path d="M16 8l7 4v8l-7 4-7-4V12l7-4z" fill="#fff" />
    </svg>
  ),
  Django: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#092E20" />
      <text x="7" y="23" fontSize="16" fill="#fff" fontFamily="Arial">
        Dj
      </text>
    </svg>
  ),
  PostgreSQL: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#336791" />
      <text x="7" y="23" fontSize="16" fill="#fff" fontFamily="Arial">
        PG
      </text>
    </svg>
  ),
  MongoDB: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#47A248" />
      <text x="7" y="23" fontSize="16" fill="#fff" fontFamily="Arial">
        MG
      </text>
    </svg>
  ),
  MySQL: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#00758F" />
      <text x="7" y="23" fontSize="16" fill="#fff" fontFamily="Arial">
        🐬
      </text>
    </svg>
  ),
  Git: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#F05032" />
      <text x="7" y="23" fontSize="16" fill="#fff" fontFamily="Arial">
        Git
      </text>
    </svg>
  ),
  Firebase: (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" fill="#FFCA28" />
      <text x="7" y="23" fontSize="16" fill="#fff" fontFamily="Arial">
        🔥
      </text>
    </svg>
  ),
  "REST API": (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#0ea5e9" />
      <text x="3" y="23" fontSize="16" fill="#fff" fontFamily="Arial">
        REST
      </text>
    </svg>
  ),
};



function Progress({ value, label }) {
const clamped = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
return (
<div className="mt-3" aria-label={`${label} proficiency`}>
<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
<div
className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
style={{ width: `${clamped}%` }}
role="progressbar"
aria-valuemin={0}
aria-valuemax={100}
aria-valuenow={clamped}
aria-label={`${label} proficiency ${clamped}%`}
/>
</div>
<span className="sr-only">{clamped}%</span>
</div>
);
}

export const Skills = () => {
  const frontendSkills = [
    { name: "React", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "TailwindCSS", level: 80 },
    { name: "TypeScript", level: 75 },
  ];

  const backendSkills = [
    { name: "Node.js", level: 80 },
    { name: "Django", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "MongoDB", level: 70 },
  ];

  const otherSkills = [
    { name: "MySQL", level: 70 },
    { name: "Git", level: 85 },
    { name: "Firebase", level: 65 },
    { name: "REST API", level: 80 },
  ];

  const renderSkillGroup = (title, skills) => (
<div className="mb-10">
<h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
{title}
</h3>
<ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" role="list">
{skills.map((skill, i) => (
<Motion.li
key={skill.name}
className="list-none"
initial={{ opacity: 0, y: 16 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.3 }}
transition={{ duration: 0.4, delay: i * 0.05 }}
>
<Card className="group h-full cursor-default select-none border border-border/70 bg-card/70 px-4 py-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
<CardContent className="p-0">
<div className="flex items-center gap-3">
<div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
{icons[skill.name]}
</div>
<div>
<h3 className="text-sm font-semibold">{skill.name}</h3>
<p className="text-xs text-muted-foreground">Proficiency</p>
</div>
</div>
<Progress value={skill.level} label={skill.name} />
</CardContent>
</Card>
</Motion.li>
))}
</ul>
</div>
);

 return (
<section id="skills" className="min-h-screen flex items-center justify-center py-20">
<RevealOnScroll>
<div className="max-w-6xl mx-auto px-4">
<h2 className="text-3xl font-bold mb-8 text-center text-primary">
Skills
</h2>



{renderSkillGroup("Frontend", frontendSkills)}
{renderSkillGroup("Backend", backendSkills)}
{renderSkillGroup("Data & Tools", otherSkills)}
</div>
</RevealOnScroll>
</section>
);
};
