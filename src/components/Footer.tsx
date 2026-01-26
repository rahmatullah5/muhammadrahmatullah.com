/** @format */

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <p className="text-secondary">
          &copy; {new Date().getFullYear()} Muhammad Rahmatullah. All rights
          reserved.
        </p>
        <div className={styles.socials}>
          <a
            href="https://github.com/rahmatullah"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/muhammadrahmatullah"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
          </a>
          <a href="mailto:hei.rahmatullah@gmail.com" aria-label="Email">
            <FiMail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
