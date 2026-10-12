"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { portionAmount, type Portion } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import styles from "./counter-scale.module.css";

const scaleCopy = {
  weight: { gu: "વજન કિલો", en: "Weight kg" },
  packs: { gu: "પેકેટ", en: "Packets" },
  rate: { gu: "ભાવ ₹", en: "Rate ₹" },
  amount: { gu: "રકમ ₹", en: "Amount ₹" },
  caption: { gu: "દુકાનના કાંટા જેવું: વજન પસંદ કરો, ભાવ તરત દેખાશે.", en: "Just like the shop scale: pick a weight and the price shows up." },
};

/** Counts smoothly from the last shown value to `target`. */
function useTween(target: number, duration = 550) {
  const [value, setValue] = useState(target);
  const shown = useRef(target);

  useEffect(() => {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const origin = shown.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = instant ? 1 : Math.min(1, (now - start) / duration);
      const next = origin + (target - origin) * (1 - Math.pow(1 - progress, 3));
      shown.current = next;
      setValue(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function Readout({ label, value, ghost, strong = false }: { label: string; value: string; ghost: string; strong?: boolean }) {
  return (
    <div className={styles.window}>
      <span className={styles.label}>{label}</span>
      <span className={styles.digits} data-strong={strong || undefined}>
        <span className={styles.ghost} aria-hidden="true">{ghost}</span>
        <span className={styles.value}>{value}</span>
      </span>
    </div>
  );
}

export function CounterScale({ product, choice, photo }: { product: Product; choice: Portion; photo: string }) {
  const { text } = useLanguage();
  const byPack = product.unit === "pack";
  const amount = portionAmount(product, choice.factor);
  const weight = useTween(choice.factor);
  const total = useTween(amount ?? 0);
  const pile = byPack ? Math.min(1, 0.7 + choice.factor * 0.06) : 0.62 + Math.min(choice.factor, 1) * 0.36;

  return (
    <figure className={styles.scale}>
      <div className={styles.panArea}>
        <div key={choice.id} className={styles.pan}>
          <div className={styles.plate}>
            <div className={styles.pile} style={{ "--pile": pile } as CSSProperties}>
              <Image src={photo} alt={text(product.name)} fill loading="eager" sizes="(max-width: 1024px) 70vw, 24rem" className="object-cover" />
            </div>
          </div>
        </div>
        <div className={styles.platform} aria-hidden="true" />
      </div>

      <div className={styles.body}>
        <div className={styles.display} aria-live="polite">
          <Readout
            label={text(byPack ? scaleCopy.packs : scaleCopy.weight)}
            value={byPack ? String(Math.round(weight)) : weight.toFixed(3)}
            ghost={byPack ? "88" : "8.888"}
          />
          <Readout label={text(scaleCopy.rate)} value={product.price == null ? "----" : String(product.price)} ghost="8888" />
          <Readout label={text(scaleCopy.amount)} value={amount == null ? "----" : String(Math.round(total))} ghost="8888" strong />
        </div>
        <div className={styles.keys} aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} data-tare={index === 7 || undefined} />
          ))}
        </div>
      </div>
      <figcaption className={styles.caption}>{text(scaleCopy.caption)}</figcaption>
    </figure>
  );
}
