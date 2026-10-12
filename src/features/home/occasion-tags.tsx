"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappHref } from "@/config/site";
import { occasionCopy, type Occasion } from "@/features/home/home-copy";
import { useLanguage } from "@/features/i18n/language-provider";
import styles from "./occasion-tags.module.css";

function OccasionIcon({ icon }: { icon: Occasion["icon"] }) {
  const shapes: Record<Occasion["icon"], ReactNode> = {
    diya: (
      <>
        <path d="M16 3c-4 6-3.5 9.5 0 12 3.5-2.5 4-6 0-12Z" fill="#f59e0b" />
        <path d="M3 17h26c-1.5 7-6.5 11-13 11S4.5 24 3 17Z" fill="currentColor" />
      </>
    ),
    rakhi: (
      <>
        <path d="M1 16h30" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 8 }, (_, index) => {
          const angle = (index * Math.PI) / 4;
          return <circle key={index} cx={16 + Math.cos(angle) * 7.5} cy={16 + Math.sin(angle) * 7.5} r="3.6" fill="currentColor" />;
        })}
        <circle cx="16" cy="16" r="5" fill="#f59e0b" />
      </>
    ),
    kalash: (
      <>
        <circle cx="16" cy="6" r="4.5" fill="#a16207" />
        <path d="M9 8c2 2 4 3 7 3s5-1 7-3" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M11 11h10v2c4 2 6 5 6 8.5C27 26 22 29 16 29S5 26 5 21.5C5 18 7 15 11 13v-2Z" fill="currentColor" />
      </>
    ),
    matki: (
      <>
        <path d="M8 3l8 7 8-7" stroke="#a16207" strokeWidth="2" fill="none" />
        <path d="M11 10h10v2c4 1.5 7 5 7 9 0 5-5.5 8-12 8S4 26 4 21c0-4 3-7.5 7-9v-2Z" fill="currentColor" />
        <path d="M6 19h20" stroke="#fde68a" strokeWidth="2" />
      </>
    ),
    home: (
      <>
        <path d="M16 3 2 15h4v13h20V15h4L16 3Z" fill="currentColor" />
        <path d="M13 28v-8h6v8" fill="#fde68a" />
      </>
    ),
    gift: (
      <>
        <rect x="4" y="12" width="24" height="16" rx="2" fill="currentColor" />
        <rect x="2" y="8" width="28" height="6" rx="2" fill="currentColor" />
        <path d="M16 8v20" stroke="#fde68a" strokeWidth="3" />
        <path d="M16 8c-3-6-9-5-7-1 1 1.5 4 1 7 1Zm0 0c3-6 9-5 7-1-1 1.5-4 1-7 1Z" fill="#f59e0b" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 32 32" className={styles.icon} aria-hidden="true">
      {shapes[icon]}
    </svg>
  );
}

/** Occasion tags hung from a toran of mango leaves and marigolds; each opens WhatsApp with a ready message. */
export function OccasionTags() {
  const { lang, text } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.setAttribute("data-shown", "");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={root} className={styles.section} aria-labelledby="occasion-title">
      <div className={styles.head}>
        <p className="section-kicker">{text(occasionCopy.kicker)}</p>
        <h2 id="occasion-title" className={styles.title}>{text(occasionCopy.title)}</h2>
        <p className={styles.hint}>{text(occasionCopy.hint)}</p>
      </div>

      <div className={styles.scroller}>
        <div className={styles.line}>
          <div className={styles.toran} aria-hidden="true">
            <span className={styles.rope} />
            <span className={styles.garland}>
              {Array.from({ length: 30 }, (_, index) => (
                <span key={index} className={index % 3 === 1 ? styles.marigold : styles.leaf} />
              ))}
            </span>
          </div>

          <ul className={styles.tags}>
            {occasionCopy.occasions.map((occasion, index) => (
              <li key={occasion.id} className={styles.hang} style={{ "--string": `${2.2 + (index % 3) * 1.1}rem`, "--i": index } as CSSProperties}>
                <a
                  href={whatsappHref(occasionCopy.message(text(occasion.name), lang))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.tag}
                >
                  <span className={styles.hole} aria-hidden="true" />
                  <OccasionIcon icon={occasion.icon} />
                  <span className={styles.name}>{text(occasion.name)}</span>
                  <span className={styles.note}>{text(occasion.note)}</span>
                  <span className={styles.ask}><WhatsAppIcon className={styles.askIcon} />{text(occasionCopy.ask)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
