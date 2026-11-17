/** @format */

import Link from "next/link";
import LocalTime from "./LocalTime";
import styles from "./Footer.module.css";

const EMAIL = "hei.rahmatullah@gmail.com";

const socials = [
  { name: "github", value: "rahmatullah5", href: "https://github.com/rahmatullah5" },
  { name: "linkedin", value: "in/mrahmatullah", href: "https://www.linkedin.com/in/mrahmatullah/" },
  { name: "telegram", value: "@Rahmatullah5", href: "https://t.me/Rahmatullah5" },
  { name: "resume", value: "resume.pdf", href: "/resume.pdf" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className="sec-head">
          <span>
            <b>§99</b>on-call
          </span>
          <span>
            <span className="led" />
            accepting pages
          </span>
        </div>

        <div className={styles.grid}>
          <div>
            <h2 className={styles.title}>
              Got a slow, tangled backend?{" "}
              <span className={styles.dim}>Page me.</span>
            </h2>
            <a href={`mailto:${EMAIL}`} className={styles.email}>
              {EMAIL} <span aria-hidden="true">↗</span>
            </a>
            <div className={styles.ctas}>
              <Link href="/contact" className="btn btn--primary">
                All channels →
              </Link>
            </div>
          </div>

          <dl className={`panel ${styles.channels}`}>
            <div className="panel-bar">
              <span>
                <b>routes</b>
              </span>
              <span>
                <LocalTime />
              </span>
            </div>
            {socials.map((s) => (
              <div key={s.name} className={styles.row}>
                <dt>{s.name}</dt>
                <dd>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line"
                  >
                    {s.value}
                  </a>
                </dd>
              </div>
            ))}
            <div className={styles.row}>
              <dt>tz</dt>
              <dd>Asia/Jakarta, UTC+7</dd>
            </div>
          </dl>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Muhammad Rahmatullah</span>
          <span>built with next.js · static export</span>
          <a href="#top" className="link-line">
            back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
