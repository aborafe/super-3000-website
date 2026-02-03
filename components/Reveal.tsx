'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 12,
  once = true
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className || ''}`}
      style={{
        transitionDelay: `${delay}ms`,
        // @ts-expect-error CSS var for reveal offset
        '--reveal-y': `${y}px`
      }}
    >
      {children}
    </div>
  );
}
