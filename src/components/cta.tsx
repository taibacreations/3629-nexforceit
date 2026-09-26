"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/lib/scrollToSection"; // path apne project structure ke hisaab se adjust karein

gsap.registerPlugin(ScrollTrigger);

const Cta = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50, letterSpacing: "0.05em" },
        { opacity: 1, y: 0, letterSpacing: "0em", duration: 1 }
      )
        .fromTo(
          paraRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleButtonEnter = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.killTweensOf(shineRef.current);
    gsap.to(buttonRef.current, { scale: 1.05, duration: 0.35, ease: "power3.out" });
    gsap.fromTo(shineRef.current, { xPercent: -150 }, { xPercent: 150, duration: 0.7, ease: "power2.out" });
  };

  const handleButtonLeave = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.killTweensOf(shineRef.current);
    gsap.to(buttonRef.current, { scale: 1, duration: 0.35, ease: "power3.out" });
    gsap.set(shineRef.current, { xPercent: -150 });
  };

  return (
    <section
      ref={sectionRef}
      className="bg-black relative min-h-[480px] sm:min-h-[550px] lg:min-h-[600px] bg-cover bg-left xl:bg-center bg-no-repeat overflow-hidden "
      style={{ backgroundImage: "url('/cta-bg.png')" }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 w-full h-[80px] sm:h-[100px] bg-gradient-to-b from-black to-transparent z-10" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-[80px] sm:h-[100px] bg-gradient-to-t from-black to-transparent z-10" />

        {/* Dark overlay - only on lg */}
        <div className="block xl:hidden absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-[1480px] mx-auto min-h-[480px] sm:min-h-[550px] lg:min-h-[600px] px-6 sm:px-8 lg:px-4 flex items-center">
        <div className="mx-auto lg:mx-0 lg:ml-auto max-w-[650px] text-center lg:text-left text-white">
          <h2
            ref={headingRef}
            className="font-bold text-[28px] md:text-[36px] xl:text-[40px] leading-[36px] sm:leading-[44px] lg:leading-[50px] uppercase"
          >
            Sie benötigen technische
            <br />
            Unterstützung?
          </h2>

          <p
            ref={paraRef}
            className="mt-5 text-[16px] md:text-[18px] xl:text-[20px] leading-[24px] xl:leading-[25px] font-normal lg:pr-6"
          >
            Sie haben Fragen zu unseren Leistungen oder benötigen
            Unterstützung bei einem IT-Projekt? Kontaktieren Sie uns
            gerne. Wir besprechen Ihre Anforderungen und finden
            gemeinsam eine passende Lösung.
          </p>

          <button
            ref={buttonRef}
            onMouseEnter={handleButtonEnter}
            onMouseLeave={handleButtonLeave}
            onClick={() => scrollToSection("kontakt")}
            className="button relative overflow-hidden text-[18px] md:text-[20px] xl:text-[24px] w-full sm:w-auto px-8 h-[45px] md:h-[55px] xl:h-[69px] mt-6"
            style={{ transform: "scale(1)" }}
          >
            <span
              ref={shineRef}
              className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent z-50"
              style={{ transform: "translateX(-150%)" }}
            />
            <span className="relative z-10">Jetzt Kontakt aufnehmen</span>
          </button>
        </div>
        
      </div>

    </section>
  );
};

export default Cta;