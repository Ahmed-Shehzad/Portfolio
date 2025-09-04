import Link from "next/link";
import GitHubIcon from "@/assets/icons/github.svg";
import LinkedInIcon from "@/assets/icons/linkedin.svg";
import WebsiteIcon from "@/assets/icons/website.svg";

interface LinkItem {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  external?: boolean;
}

interface LinksProps {
  locale: string;
}

// Ensure we always use a valid locale
const normalizeLocale = (locale: string): string => {
  return locale === "de" || locale === "en" ? locale : "en";
};

const getLinksData = (locale: string): LinkItem[] => [
  {
    icon: WebsiteIcon,
    href: `/${locale}`,
    label: "Portfolio",
    external: false,
  },
  {
    icon: GitHubIcon,
    href: "https://github.com/Ahmed-Shehzad",
    label: "GitHub",
    external: true,
  },
  {
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/muhammad-ahmed-shehzad-66750989/",
    label: "LinkedIn",
    external: true,
  },
];

function LinkItem({ icon: Icon, href, label, external }: Readonly<LinkItem>) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <div className="flex items-center gap-2">
      <Icon className="size-8 flex-shrink-0 text-gray-600" />
      <Link href={href} className="text-md text-blue-500 hover:underline" {...linkProps}>
        {label}
      </Link>
    </div>
  );
}

export function Links({ locale }: Readonly<LinksProps>) {
  const normalizedLocale = normalizeLocale(locale);
  const linksData = getLinksData(normalizedLocale);

  return (
    <>
      <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
        <span>🔗</span> Links
      </h4>
      <div className="mt-2 space-y-1">
        {linksData.map((link) => (
          <LinkItem key={link.label} {...link} />
        ))}
      </div>
    </>
  );
}
