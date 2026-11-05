/** @format */

import styles from "./Marquee.module.css";

/** Infinite horizontal ticker. Content is duplicated for a seamless loop. */
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span>{item}</span>
          <span className={styles.star}>✳</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
