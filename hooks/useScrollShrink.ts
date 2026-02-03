'use client';

import { useEffect, useRef, useState } from 'react';

type Options = {
  enter?: number;
  exit?: number;
};

export function useScrollShrink(options: Options = {}) {
  const { enter = 30, exit = 10 } = options;
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const y = window.scrollY || 0;
      let next = scrolledRef.current;
      if (!next && y > enter) next = true;
      if (next && y < exit) next = false;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, [enter, exit]);

  return scrolled;
}
