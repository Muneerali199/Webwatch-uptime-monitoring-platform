import { Logo } from "@/components/common/Logo";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Status", "Changelog", "Roadmap"],
    },
    {
      title: "Resources",
      links: ["Documentation", "API Reference", "Guides", "Blog", "Status Page"],
    },
    {
      title: "Company",
      links: ["About", "Customers", "Careers", "Contact", "Media Kit"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Compliance", "Security", "GDPR"],
    },
  ];

  return (
    <footer className="pt-16 pb-8 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      
      <div className="container px-4 mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-border/30"
        >
          <motion.div variants={fadeIn("up")} className="md:col-span-2">
            <Logo className="h-8 w-auto mb-4" />
            <p className="text-muted-foreground mb-6 max-w-md">
              BetterUptime helps you monitor your entire stack, get notified when something goes
              wrong, and communicate better with your users.
            </p>
            <div className="flex space-x-4">
              {["X", "LinkedIn", "GitHub", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeIn("up", 0.1 * (index + 1))}
            >
              <h4 className="font-medium mb-4">{category.title}</h4>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} BetterUptime. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["English", "Support", "Status"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}