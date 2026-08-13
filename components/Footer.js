import Logo from "./Logo";

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact Us" },
];

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M14 8.5h2.5V5H14c-2.2 0-4 1.8-4 4v2H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9c0-.6.4-1 1.5-1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sky-dark/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Logo />
          <p className="max-w-xs text-center font-body text-sm text-foreground/70 md:text-left">
            Handcrafted ice creams made fresh daily, for every scoop-loving
            family.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col items-center gap-2 md:items-start">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground/70">
            Quick Links
          </h3>
          <ul className="flex flex-col items-center gap-1.5 font-body md:items-start">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-sky-deep">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-3 md:items-start">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground/70">
            Follow Us
          </h3>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={`Follow us on ${social.name}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-sky-deep transition-colors hover:bg-pink hover:text-[#5a2e3a]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/40 py-5 text-center font-body text-sm text-foreground/70">
        &copy; {year} Surbhi Icecreams. All rights reserved.
      </div>
    </footer>
  );
}
