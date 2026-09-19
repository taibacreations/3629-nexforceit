"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraOneRef = useRef<HTMLParagraphElement>(null);
  const paraTwoRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
          paraOneRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          paraTwoRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          buttonWrapRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          imageWrapRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 1.2,
            ease: "power4.inOut",
          },
          "-=1.1"
        )
        .fromTo(
          imageRef.current,
          { scale: 1.25 },
          { scale: 1, duration: 1.4, ease: "power3.out" },
          "-=1.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleButtonEnter = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.killTweensOf(shineRef.current);
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.35,
      ease: "power3.out",
    });
    gsap.fromTo(
      shineRef.current,
      { xPercent: -150 },
      { xPercent: 150, duration: 0.7, ease: "power2.out" }
    );
  };

  const handleButtonLeave = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.killTweensOf(shineRef.current);
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
    gsap.set(shineRef.current, { xPercent: -150 });
  };

  return (
    <section
      ref={sectionRef}
      className="pb-[10vh] mt-[-2vh] pt-[8vh] lg:pt-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #00081E 0%, #000000 100%)" }}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-8">
          <div className="max-w-full lg:max-w-[672px] text-center lg:text-left">
            <h2
              ref={headingRef}
              className="font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[36px] sm:leading-[42px] md:leading-[46px] lg:leading-[50px] uppercase"
            >
              IT-Kompetenz, auf die Sie sich verlassen können
            </h2>
            <p
              ref={paraOneRef}
              className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px] sm:leading-[25px] mt-[2.5vh] lg:mt-[2vh]"
            >
              Wir unterstützen Unternehmen bei der Planung, Installation und
              Betreuung moderner IT-Infrastrukturen. Unser Fokus liegt auf
              zuverlässigen Lösungen, sauberer Umsetzung und schneller
              Unterstützung direkt vor Ort.
            </p>
            <p
              ref={paraTwoRef}
              className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px] sm:leading-[25px] mt-[2.5vh] lg:mt-[3vh]"
            >
              Ob Netzwerk, Server, Hardware, Software oder Verkabelung – wir
              verbinden technisches Know-how mit einem praxisorientierten
              Service und passen unsere Leistungen an die individuellen
              Anforderungen unserer Kunden an.
            </p>
            <div ref={buttonWrapRef} className="mt-[3.5vh] lg:mt-[4vh]">
              <button
                ref={buttonRef}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
                className="button relative overflow-hidden text-[18px] sm:text-[20px] lg:text-[24px] w-full sm:w-[280px] lg:w-[308px] h-[52px] sm:h-[55px] lg:h-[59px]"
                style={{ transform: "scale(1)" }}
              >
                <span
                  ref={shineRef}
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{ transform: "translateX(-150%)" }}
                />
                <span className="relative z-10">Kontakt aufnehmen</span>
              </button>
            </div>
          </div>

          <div
            ref={imageWrapRef}
            className="w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[649px]"
          >
            <img
              ref={imageRef}
              src="/about.webp"
              alt="about"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;