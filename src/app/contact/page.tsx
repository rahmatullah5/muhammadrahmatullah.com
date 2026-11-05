/** @format */

import CopyEmail from "@/components/CopyEmail";
import LocalTime from "@/components/LocalTime";
import Reveal from "@/components/Reveal";
import styles from "../pages.module.css";

export const metadata = {
  title: "Contact | Muhammad Rahmatullah",
  description: "Get in touch with Muhammad Rahmatullah.",
};

const EMAIL = "hei.rahmatullah@gmail.com";

const contacts = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, external: false },
  {
    label: "WhatsApp",
    value: "+62 895 0128 9411",
    href: "https://wa.me/6289501289411",
    external: true,
  },
  {
    label: "Telegram",
    value: "@Rahmatullah5",
    href: "https://t.me/Rahmatullah5",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "in/mrahmatullah",
    href: "https://www.linkedin.com/in/mrahmatullah/",
    external: true,
  },
  {
    label: "Phone",
    value: "+62 895 0128 9411",
    href: "tel:+6289501289411",
    external: false,
  },
];

export default function Contact() {
  return (
    <div className="wrap">
      <header className={styles.head}>
        <div className={`${styles.kicker} fade-in`} style={{ ["--d" as string]: "0ms" }}>
          <span className="label">(Contact)</span>
          <span className="label">
            Jakarta — <LocalTime />
          </span>
        </div>
        <h1 className={styles.title}>
          <span className="mask" style={{ ["--i" as string]: 0 }}>
            <span>Say</span>
          </span>
          <span className="mask" style={{ ["--i" as string]: 1 }}>
            <span>
              <em className="accent">hello</em>.
            </span>
          </span>
        </h1>
        <div className="fade-in" style={{ ["--d" as string]: "500ms" }}>
          <p className={styles.lede}>
            Open to discussing new projects, hard backend problems, or
            opportunities to be part of your vision. Email is fastest.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`mailto:${EMAIL}`} className="pill pill--solid">
              Write an email →
            </a>
            <CopyEmail email={EMAIL} />
          </div>
        </div>
      </header>

      <ul className={styles.channels}>
        {contacts.map((c, i) => (
          <Reveal as="li" key={c.label} delay={i * 70}>
            <a
              href={c.href}
              className={styles.channel}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="label">
                0{i + 1} — {c.label}
              </span>
              <span className={styles.channelValue}>{c.value}</span>
              <span className={styles.channelArrow} aria-hidden="true">
                →
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
