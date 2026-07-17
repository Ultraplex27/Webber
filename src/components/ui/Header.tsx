"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/technology", label: "Technology" },
  { href: "/company", label: "Company" },
  { href: "/contact#careers", label: "Careers" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.08);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? // frosted glass over the drafting paper: the grid stays legible
            // through the bar rather than being covered by it
            "border-b border-grey-200 bg-white/60 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Webber Electro Corp home"
        >
          <Image
            src="/logos/webber-masthead.png"
            alt="Webber Electro Corp"
            width={520}
            height={109}
            className="h-9 w-auto transition-opacity duration-300"
            priority
            data-hero-logo-target
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.9375rem] font-[480] transition-colors hover:text-ink ${
                pathname.startsWith(item.href.split("#")[0]) &&
                item.href !== "/contact#careers"
                  ? "text-ink"
                  : "text-grey-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary">
            Talk to engineering
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-200 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-ink transition-transform duration-200 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Full-screen white index: mobile */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="fixed inset-0 top-16 z-40 flex flex-col bg-white/85 backdrop-blur-xl md:hidden"
        >
          <div className="wrap flex flex-1 flex-col gap-2 pt-10">
            <p className="micro-label mb-4">INDEX</p>
            {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="type-h3 border-b border-grey-100 py-4"
              >
                <span className="micro-label mr-4">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-8 self-start"
            >
              Talk to engineering
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
