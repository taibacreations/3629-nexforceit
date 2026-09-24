"use client";

import React, { useEffect, useRef } from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Choose = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
      ).fromTo(
        ".choose-card",
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12 },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id='warum-wir' ref={sectionRef} className='bg-black'>
    <div className='relative pt-[50px] md:pb-[20px] 2xl:pb-[38px]'>
      {/* lg+ line — original, full width, unchanged structure */}
      <div className="hidden lg:block absolute top-[58%] left-0 w-full h-[1px] bg-white/30" />

      <div className='max-w-[1480px] mx-auto '>
        <h2 ref={headingRef} className="font-bold text-[28px] md:text-[36px] xl:text-[40px] leading-[36px] sm:leading-[44px] lg:leading-[50px] text-center text-white pb-[25px] md:pb-[40px] uppercase px-4 md:px-6 lg:px-8">
          Warum Sie uns wählen sollten
        </h2>

        {/* -----------------------------------cards wrapper----------------------------------- */}
        {/* relative => lines ka positioning-context; z-10 cards ki row/grid par hai taake lines ke upar dikhein */}
        <div className="relative px-10 md:px-0 xl:px-8 lg:px-6">

          {/* Mobile-only vertical line — card1 ke bottom se card4 ke top tak, centered */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-[210px] h-[492px] w-px bg-white/30 z-0" />

          {/* md-only: 2 horizontal lines, har row ke vertical-center se guzarti hui */}
          <div className="hidden md:block lg:hidden absolute left-0 w-full h-px bg-white/30 z-0 top-[113px]" />
          <div className="hidden md:block lg:hidden absolute left-0 w-full h-px bg-white/30 z-0 top-[370px]" />

          <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row justify-center justify-items-center items-center gap-6 md:gap-8 lg:gap-10 xl:gap-17">

            {/* card 1 */}
            <div className="choose-card p-[3px] w-full h-[210px] md:w-[260px] md:h-[225px] lg:w-[270px] lg:h-[250px] xl:w-[290px] xl:h-[275px] rounded-[46px] bg-[linear-gradient(180deg,#081DFF_10%,#1980FB_35%,#000000_75%)]">
              <div className="w-full h-full px-[24px] py-[28px] md:px-[28px] md:py-[32px] lg:px-[32px] lg:py-[38px] xl:px-[38px] xl:py-[50px] flex flex-col items-center justify-center gap-3 md:gap-4 rounded-[43px] bg-black">
                <span className='flex items-center justify-center'>
                  <img src="choose1.svg" alt="" className="w-9 md:w-10 lg:w-11 xl:w-12 h-auto" />
                </span>
                <h4 className='font-semibold text-[20px] md:text-[20px] xl:text-[25px] leading-[30px] xl:leading-[38px] text-center text-white'>
                  Schnelle Unterstützung
                </h4>
              </div>
            </div>

            {/* card 2 */}
            <div className="choose-card p-[3px] w-full h-[210px] md:w-[260px] md:h-[225px] lg:w-[270px] lg:h-[250px] xl:w-[290px] xl:h-[275px] rounded-[46px] bg-[linear-gradient(180deg,#081DFF_10%,#1980FB_35%,#000000_75%)]">
              <div className="w-full h-full px-[24px] py-[28px] md:px-[28px] md:py-[32px] lg:px-[32px] lg:py-[38px] xl:px-[38px] xl:py-[50px] flex flex-col items-center justify-center gap-3 md:gap-4 rounded-[43px] bg-black">
                <span className='flex items-center justify-center'>
                  <img src="choose2.svg" alt="" className="w-9 md:w-10 lg:w-11 xl:w-12 h-auto" />
                </span>
                <h4 className='font-semibold text-[20px] md:text-[20px] xl:text-[25px] leading-[30px] xl:leading-[38px] text-center text-white'>
                  Professionelle Umsetzung
                </h4>
              </div>
            </div>

            {/* card 3 */}
            <div className="choose-card p-[3px] w-full h-[210px] md:w-[260px] md:h-[225px] lg:w-[270px] lg:h-[250px] xl:w-[290px] xl:h-[275px] rounded-[46px] bg-[linear-gradient(180deg,#081DFF_10%,#1980FB_35%,#000000_75%)]">
              <div className="w-full h-full px-[24px] py-[28px] md:px-[28px] md:py-[32px] lg:px-[32px] lg:py-[38px] xl:px-[38px] xl:py-[50px] flex flex-col items-center justify-center gap-3 md:gap-4 rounded-[43px] bg-black">
                <span className='flex items-center justify-center'>
                  <img src="choose3.svg" alt="" className="w-9 md:w-10 lg:w-11 xl:w-12 h-auto" />
                </span>
                <h4 className='font-semibold text-[20px] md:text-[20px] xl:text-[25px] leading-[30px] xl:leading-[38px] text-center text-white'>
                  Technisches Know-How
                </h4>
              </div>
            </div>

            {/* card 4 */}
            <div className="choose-card p-[3px] w-full h-[210px] md:w-[260px] md:h-[225px] lg:w-[270px] lg:h-[250px] xl:w-[290px] xl:h-[275px] rounded-[46px] bg-[linear-gradient(180deg,#081DFF_10%,#1980FB_35%,#000000_75%)]">
              <div className="w-full h-full px-[24px] py-[28px] md:px-[28px] md:py-[32px] lg:px-[32px] lg:py-[38px] xl:px-[38px] xl:py-[50px] flex flex-col items-center justify-center gap-3 md:gap-4 rounded-[43px] bg-black">
                <span className='flex items-center justify-center'>
                  <img src="choose3.svg" alt="" className="w-9 md:w-10 lg:w-11 xl:w-12 h-auto" />
                </span>
                <h4 className='font-semibold text-[20px] md:text-[20px] xl:text-[25px] leading-[30px] xl:leading-[38px] text-center text-white'>
                  Flexible Lösungen
                </h4>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    </section>
  )
}

export default Choose