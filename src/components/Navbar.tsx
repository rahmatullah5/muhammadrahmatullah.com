/** @format */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Work", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 140 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <>
      <header
        className={`${styles.nav} ${hidden && !isOpen ? styles.hidden : ""} ${
          scrolled ? styles.scrolled : ""
        }`}
      >
        <div className={`wrap ${styles.inner}`}>
          <Link href="/" className={styles.logo} aria-label="Home">
            <span className={styles.mark}>M</span>
            <span className={styles.name}>
              Muhammad <em>Rahmatullah</em>
            </span>
          </Link>

          <nav className={styles.desktop} aria-label="Main">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${isActive(link.href) ? styles.active : ""}`}
              >
                <sup>0{i + 1}</sup>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              onClick={toggleTheme}
              className={styles.theme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <span className={styles.dot} />
              <span className={styles.themeText}>
                {theme === "dark" ? "Dark" : "Light"}
              </span>
            </button>
            <button
              className={styles.menuBtn}
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        aria-hidden={!isOpen}
      >
        <nav className="wrap" aria-label="Mobile">
          {[{ name: "Home", href: "/" }, ...navLinks].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.bigLink}
              style={{ ["--i" as string]: i }}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              <span className="label">0{i + 1}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
