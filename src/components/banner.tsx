"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Banner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
  
  return (
    <section ref={sectionRef} className="bg-[url(/banner.webp)] bg-cover bg-no-repeat min-h-[135vh]">
        <div className="pt-[23.7vh]">
            <div className="text-center max-w-[1180px] mx-auto">
              <h1 ref={headingRef} className="font-bold text-[75px] leading-[85px] uppercase">Zuverlässiger IT-Service für Unternehmen</h1>
              <p ref={paraRef} className="text-[20px] leading-[25px] max-w-[1007px] mx-auto mt-[2vh]">Von der schnellen Entstörung bis zur professionellen Installation und standortübergreifenden Umsetzung – wir sorgen dafür, dass Ihre IT zuverlässig funktioniert.</p>
              <button ref={buttonRef} className="text-[24px] button w-[308px] h-[59px] mt-[3.5vh]">Unsere Leistungen</button>
            </div>
        </div>
    </section>
  )
}

export default Banner