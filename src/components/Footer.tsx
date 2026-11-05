/** @format */

import Link from "next/link";
import LocalTime from "./LocalTime";
import styles from "./Footer.module.css";

const socials = [
  { name: "GitHub", href: "https://github.com/rahmatullah5" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mrahmatullah/" },
  { name: "Telegram", href: "https://t.me/Rahmatullah5" },
  { name: "Résumé", href: "/resume.pdf" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <p className="label">(Next step)</p>
        <Link href="/contact" className={styles.cta} data-cursor="Say hi">
          <span>Let&rsquo;s</span> <em>talk</em>
          <span className={styles.ctaArrow} aria-hidden="true">
            ↗
          </span>
        </Link>

        <div className={styles.grid}>
          <div>
            <p className="label">Email</p>
            <a
              href="mailto:hei.rahmatullah@gmail.com"
              className={`${styles.big} link-line`}
            >
              hei.rahmatullah@gmail.com
            </a>
          </div>
          <div>
            <p className="label">Elsewhere</p>
            <ul className={styles.socials}>
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Local time — Jakarta</p>
            <p className={styles.big}>
              <LocalTime />
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Muhammad Rahmatullah</span>
          <a href="#top" className="link-line">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
