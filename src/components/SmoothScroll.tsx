"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    // Lenis aur GSAP ScrollTrigger ko sync karo
    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Page ki height badle (content load, fonts, images) to Lenis ko batao
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Route change par: top par jao aur height dobara naapo
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Hash wale links (/#diensten) apna scroll khud handle karte hain
    if (!window.location.hash) {
      lenis.scrollTo(0, { immediate: true });
    }

    const t = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(t);
  }, [pathname]);

  return <>{children}</>;
}