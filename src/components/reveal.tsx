"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
};

/** Fades its children up the first time they scroll into view. */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.setAttribute("data-shown", "");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={delay ? ({ "--delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** Malai dripping from the block above; `color` should match that block. */
export function Drip({ color = "var(--surface)", up = false, className = "" }: { color?: string; up?: boolean; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`drip ${up ? "drip-up" : ""} ${className}`}
      style={{ "--drip": color } as CSSProperties}
    />
  );
}
