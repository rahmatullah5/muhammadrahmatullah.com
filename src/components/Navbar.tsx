/** @format */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LocalTime from "./LocalTime";
import Uptime from "./Uptime";
import { useTheme } from "./ThemeProvider";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "work", href: "/blog" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className={styles.header}>
      {/* Status strip */}
      <div className={styles.status}>
        <div className={`wrap ${styles.statusInner}`}>
          <span>
            <span className="led" />
            all systems operational
          </span>
          <span className={styles.hideSm}>
            uptime <Uptime short />
          </span>
          <span className={styles.hideXs}>
            jakarta <LocalTime />
          </span>
        </div>
      </div>

      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <span className={styles.mark}>MR</span>
          <span className={styles.name}>muhammad rahmatullah</span>
        </Link>

        <nav className={styles.desktop} aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${
                isActive(link.href) ? styles.active : ""
              }`}
            >
              /{link.name}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            className={styles.theme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={theme === "dark" ? "Return to the light side" : "Join the dark side"}
          >
            <span className={theme === "light" ? styles.on : ""}>light</span>
            <span className={theme === "dark" ? styles.on : ""}>dark</span>
          </button>
          <button
            className={styles.menuBtn}
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        aria-hidden={!isOpen}
      >
        <nav className="wrap" aria-label="Mobile">
          {[{ name: "home", href: "/" }, ...navLinks].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.bigLink}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              <span className="label">0{i + 1}</span>
              <span>/{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
