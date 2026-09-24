"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Area = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraOneRef = useRef<HTMLParagraphElement>(null);
  const paraTwoRef = useRef<HTMLParagraphElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
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
        // Mobile + md: shared image wrapper wipe
        .fromTo(
          imageWrapRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 1.2, ease: "power4.inOut" },
          "-=1"
        )
        .fromTo(
          imageRef.current,
          { scale: 1.15 },
          { scale: 1, duration: 1.4, ease: "power3.out" },
          "-=1.2"
        )
        // lg+: absolute bleed background image wipe
        .fromTo(
          bgImageRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 1.2, ease: "power4.inOut" },
          "<"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicegebiet"
      ref={sectionRef}
      className="relative bg-black py-11 md:py-18 xl:py-[110px] 2xl:py-50 w-full overflow-hidden"
    >
      {/* Container: right padding md par 0 hai taake image screen edge tak bleed kar sake;
          lg par wapas symmetric padding, kyunke lg apna alag absolute-bleed image use karta hai */}
      <div className="max-w-[1480px] mx-auto md:pl-6 md:pr-0 2xl:px-17">
        <div className="flex flex-col md:flex-row lg:grid lg:grid-cols-2 items-center md:items-stretch lg:items-center gap-10 md:gap-8 lg:gap-16">

          {/* Text column — mobile: full width; md: half, flex-stretch se height apni content ke hisaab se;
              lg: grid column, original max-w-500 wapas */}
          <div className="relative z-10 w-full md:w-1/2 lg:w-auto flex flex-col justify-center px-4 2xl:px-0">
            <h2
              ref={headingRef}
              className=" font-bold text-center md:text-left text-[28px] md:text-[36px] xl:text-[40px] leading-[36px] sm:leading-[44px] lg:leading-[50px] uppercase text-white lg:max-w-[500px]"
            >
              IT-Service direkt bei Ihnen vor Ort
            </h2>

            <p
              ref={paraOneRef}
              className="text-white text-center md:text-left text-[16px] md:text-[18px] xl:text-[20px] font-normal leading-[25px] mt-4 md:max-w-[715px] lg:max-w-[615px]"
            >
              Wir unterstützen Unternehmen und Privatkunden mit
              professionellen IT- und Installationsleistungen direkt vor
              Ort. Unser Service ist auf eine zuverlässige und flexible
              Zusammenarbeit ausgelegt – unabhängig davon, ob es sich
              um einen einzelnen Einsatz oder ein umfangreicheres Projekt
              handelt.
            </p>

            <p
              ref={paraTwoRef}
              className="text-white text-center md:text-left text-[16px] md:text-[18px] xl:text-[20px] leading-[25px] mt-5 lg:max-w-[615px] font-semibold"
            >
              Ihr Standort. Ihre Anforderungen. Unsere technische
              Unterstützung.
            </p>
          </div>

          {/* Image column — mobile: normal stacked block; md: flex-1, height text ke barabar (stretch),
              right edge bleed (container ki right padding 0 hai isliye); lg: hidden (asal image neeche absolute se aati hai) */}
          <div ref={imageWrapRef} className="w-full md:flex-1 md:hidden">
            <img
              ref={imageRef}
              src="/world-map.png"
              alt="IT Service weltweit"
              className="w-full h-auto md:h-full object-contain"
            />
          </div>

          {/* Placeholder — sirf lg par dikhta hai, grid ka 2nd column reserve karne ke liye
              (asal image neeche absolute bg se aati hai) */}
          <div aria-hidden className="hidden lg:block" />

        </div>
      </div>

      {/* lg aur upar: original absolute bleed background image — bilkul unchanged */}
      <div
        ref={bgImageRef}
        className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 w-[67%] lg:w-[57%] h-full bg-[url('/world-map.png')] bg-contain bg-right bg-no-repeat"
      />
    </section>
  );
};

export default Area;