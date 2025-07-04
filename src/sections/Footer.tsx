import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
  { href: "#YouTube", label: "YouTube" },
  { href: "#X", label: "X" },
  { href: "#Instagram", label: "Instagram" },
  { href: "#LinkedIn", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer className="relative -z-10 md:px-24 overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>

      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row  md:justify-between items-center gap-8">
          <div>&copy; 2025. All rights reserved.</div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
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
