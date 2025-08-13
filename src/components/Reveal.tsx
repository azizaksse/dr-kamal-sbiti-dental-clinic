"use client";

import { useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { clsx } from "clsx";

type Props = { children: ReactNode; className?: string; delay?: number };

export default function Reveal({ children, className, delay = 0 }: Props): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={clsx(
        "transition duration-700 ease-out will-change-transform will-change-opacity",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}


