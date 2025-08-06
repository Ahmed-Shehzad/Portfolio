import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
  { href: "https://github.com/Ahmed-Shehzad", label: "Github" },
  { href: "https://x.com/AhmedShehzad1", label: "X" },
  { href: "https://www.instagram.com/iahmedshehzad/", label: "Instagram" },
  {
    href: "https://www.linkedin.com/in/muhammad-ahmed-shehzad-66750989/",
    label: "LinkedIn",
  },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-x-clip md:px-24">
      <div className="absolute bottom-0 left-1/2 -z-10 h-[400px] w-[1600px] -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)]"></div>

      <div className="relative z-10 container">
        <div className="flex flex-col items-center gap-8 border-t border-white/15 py-6 text-sm md:flex-row md:justify-between">
          <div>&copy; 2025. All rights reserved.</div>
          <nav className="flex flex-col items-center gap-8 md:flex-row">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                <span className="font-semibold">{link.label}</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
