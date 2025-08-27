import { useState, useRef } from "react";
import { motion as Motion } from "framer-motion";
import emailjs from "emailjs-com";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import bgTexture from "@/assets/me.jpeg";

const socialVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [ariaMessage, setAriaMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setAriaMessage("Sending your message...");

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Zakaria", // Replace with your name
          from_email: form.email,
          to_email: "your-email@example.com", // Replace with your email
          message: form.message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("Message sent!", {
            description:
              "Thank you for reaching out. I'll get back to you soon.",
            duration: 4000,
          });
          setAriaMessage(
            "Message sent successfully. Thank you for reaching out."
          );
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("EmailJS error:", error);
          toast.error("Something went wrong", {
            description: "Please try again in a moment.",
            duration: 4000,
          });
          setAriaMessage("Failed to send message. Please try again.");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
  className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgTexture})`,
          backgroundRepeat: "repeat",
          opacity: 0.05,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-3xl w-full">
  <Motion.header
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="contact-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl text-primary"
          >
            Get In Touch
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have a question or want to work together?
          </p>
  </Motion.header>

  <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="rounded-xl border-border/70 shadow-lg backdrop-blur-sm dark:bg-slate-900/70">
            <CardContent className="p-6 sm:p-8">
              <p role="status" aria-live="polite" className="sr-only">
                {ariaMessage}
              </p>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                aria-label="Contact form"
                aria-busy={loading}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      aria-required="true"
                      className="focus-visible:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      aria-required="true"
                      className="focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can I help you?"
                      aria-required="true"
                      className="resize-y focus-visible:ring-blue-500"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  aria-label="Send message"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
  </Motion.div>

        <Motion.div
          className="flex justify-center gap-6 mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
        >
          <Motion.a
            href="https://wa.me/252613328355"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400"
            title="WhatsApp"
            aria-label="Contact me on WhatsApp"
            variants={socialVariants}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.13 12.13 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.77 0-3.5-.46-5.01-1.33l-.36-.21-3.69.97.99-3.59-.23-.37A9.97 9.97 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
            </svg>
          </Motion.a>
          <Motion.a
            href="https://github.com/Zakariast578"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            title="GitHub"
            aria-label="View my GitHub profile"
            variants={socialVariants}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.012-1.243-.017-2.25-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.334-5.466-5.933 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z" />
            </svg>
          </Motion.a>
        </Motion.div>
      </div>
    </section>
  );
};
