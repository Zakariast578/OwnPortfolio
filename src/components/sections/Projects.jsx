import { motion as Motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import your project images
// Make sure the path is correct relative to this file.
// For this example, we assume they are in `src/assets/projects/`
import portfolio1 from "../../assets/portfolio1.jpg";
import portfolio2 from "../../assets/portfolio2.jpg";
import portfolio3 from "../../assets/portfolio3.jpg";

const projectsData = [
  {
    title: "Somali TalentLink",
    description:
      "A local job and gig platform that connects Somali youth with employment opportunities using React and Django.",
    image: portfolio1,
    liveUrl: "https://talentlink.example.com",
    codeUrl: "https://github.com/zakaria-ak/talentlink",
  },
  {
    title: "Personal Portfolio",
    description:
      "My developer portfolio showcasing skills, projects, and contact details, built with React and Framer Motion.",
    image: portfolio2,
    liveUrl: "https://zakariast578.github.io/portfolio/",
    codeUrl: "https://github.com/Zakariast578/myPortfolio/",
  },
  {
    title: "E-commerce Store",
    description:
      "A full-featured e-commerce platform with product listings, a shopping cart, and a secure checkout process.",
    image: portfolio3,
    liveUrl: null, // No live link for this one
    codeUrl: "https://github.com/zakaria-ak/ecommerce",
  },
];

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full py-20 lg:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
  <Motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center mb-12"
        >
          <h2
            id="projects-heading"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary"
          >
            Featured Projects
          </h2>
          <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Here are some of the projects I've worked on.
          </p>
  </Motion.div>

        <div
          role="list"
          aria-label="My projects"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projectsData.map((project, index) => (
            <Motion.div
              key={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              custom={index}
              role="listitem"
            >
              <Card className="h-full overflow-hidden transition-all duration-300 border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="relative group overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Screenshot of the ${project.title} project`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View live version of ${project.title}`}
                        >
                          <Button variant="outline" size="icon">
                            <ExternalLink className="h-5 w-5" />
                          </Button>
                        </a>
                      )}
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View source code of ${project.title}`}
                        >
                          <Button variant="outline" size="icon">
                            <Github className="h-5 w-5" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">
                    {project.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {/* Optional: You can add tech stack badges here if desired */}
                </CardFooter>
              </Card>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};