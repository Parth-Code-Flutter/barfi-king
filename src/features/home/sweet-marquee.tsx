"use client";

import { products } from "@/features/catalog/data";
import { useLanguage } from "@/features/i18n/language-provider";
import styles from "./sweet-marquee.module.css";

/** Two counter-running ribbons of every sweet on the rate card. */
export function SweetMarquee() {
  const { text } = useLanguage();
  const names = products.filter((product) => product.unit === "kg").map((product) => text(product.name));
  const half = Math.ceil(names.length / 2);
  const rows = [names.slice(0, half), names.slice(half)];

  return (
    <div className={styles.band} aria-hidden="true">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row} data-reverse={rowIndex === 1 || undefined}>
          <div className={styles.track}>
            {[...row, ...row].map((name, index) => (
              <span key={index} className={styles.item}>
                {name}
                <span className={styles.star}>✿</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
