'use client';

import type { ReactNode } from 'react';

export default function HeroSection({ children }: { children: ReactNode }) {
  return (
    <section className="hero-shell relative min-h-[80vh] overflow-hidden">
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
        src="/super3000oil.mp4"
        aria-hidden="true"
        controls={false}
        disablePictureInPicture
      >
        <source src="/super3000oil.mp4" type="video/mp4" />
      </video>
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
        aria-hidden="true"
      />
      <div className="section-pad relative z-20 pb-16 pt-24 sm:pb-20 sm:pt-28">{children}</div>
    </section>
  );
}
