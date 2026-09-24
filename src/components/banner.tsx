"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Banner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, letterSpacing: "0.06em" },
        { opacity: 1, y: 0, letterSpacing: "0em", duration: 1.1 }
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
    <section ref={sectionRef} className="bg-[url(/banner.webp)] bg-[(50% 20%)] bg-cover bg-no-repeat min-h-[100vh] lg:min-h-[135vh]">
        <div className="pt-[23.7vh]">
            <div className="text-center max-w-[1180px] mx-auto px-4 md:px-6 xl:px-8">
              <h1 ref={headingRef} className="font-bold text-[35px] md:text-[50px] lg:text-[60px] xl:text-[75px] xl:leading-[85px] uppercase">Zuverlässiger IT-Service für Unternehmen</h1>
              <p ref={paraRef} className="text-[16px] md:text-[18px] xl:text-[20px] leading-[25px] max-w-[1007px] mx-auto mt-[2vh] ">Von der schnellen Entstörung bis zur professionellen Installation und standortübergreifenden Umsetzung – wir sorgen dafür, dass Ihre IT zuverlässig funktioniert.</p>
              <button
                ref={buttonRef}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
                className="relative overflow-hidden text-[24px] button w-[308px] h-[59px] mt-[3.5vh]"
                style={{ transform: "scale(1)" }}
              >
                <span
                  ref={shineRef}
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{ transform: "translateX(-150%)" }}
                />
                <span className="relative z-10">Unsere Leistungen</span>
              </button>
            </div>
        </div>
    </section>
  )
}

export default Banner