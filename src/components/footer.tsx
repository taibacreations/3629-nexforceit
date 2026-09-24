"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        quickLinksRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          logoRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          contactRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          bottomRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bottom md:bg-cover md:bg-center bg-no-repeat overflow-hidden mt-10 pt-10 sm:pt-12 md:pt-[50px] xl:mt-[12.5vh]"
      style={{ backgroundImage: "url('/footer-bg.png')" }}
    >
      {/* Mobile-only blend overlay: bg image ko page ke black background ke sath merge karta hai */}
      <div className="absolute top-90 left-0 w-full h-30 -z-10 md:hidden backdrop-blur-md bg-gradient-to-b from-transparent via-[#010304] to-[#010304] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-4 lg:gap-6">

        {/* -------------------------------------------------quick links-------------------------------------- */}
        {/* self-start => mobile pe parent ke items-center ko ignore kar ke left edge pe rehta hai */}
        <div
          ref={quickLinksRef}
          className="order-2 md:order-1 self-start md:self-auto text-left w-full md:w-auto"
        >
          <h3 className="font-semibold text-[20px] mb-[20px] md:mb-[12px] lg:mb-[20px] xl:text-[24px] text-white">
            Quick Links
          </h3>
          <div className="flex flex-col lg:flex-row lg:gap-[15px] xl:gap-[30px] items-start">
            <div className="flex flex-col items-start">
              <ul>
                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link href="/#home">Home</Link>
                </li>
                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link href="/#about">About Us</Link>
                </li>
                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link href="/#services">Our Services</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start">
              <ul>
                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link href="/#why-choose-us">Why Choose Us</Link>
                </li>
                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link href="/#service-area">Service Area</Link>
                </li>
                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link href="/#contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------logo--------------------------------------------------------- */}
        {/* md:self-center => md par logo vertically Quick Links/Contact ke beech mein center ho jata hai */}
        <div
          ref={logoRef}
          className="order-1 md:order-2 flex flex-col gap-[20px] md:gap-[12px] lg:gap-[20px] md:items-center"
        >
          <Link href="/">
            <img
              src="/footer-logo.svg"
              alt="NexForceIT Logo"
              className="md:w-[290px] xl:w-auto"
            />
          </Link>
          <div className="flex gap-[17px]">
            <a 
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src="/fb.svg"
                alt="Facebook"
                className="md:w-[36px] md:h-[36px] xl:w-auto xl:h-auto"
              />
            </a>
            <a 
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src="/insta.svg"
                alt="Instagram"
                className="md:w-[36px] md:h-[36px] xl:w-auto xl:h-auto"
              />
            </a>
          </div>
        </div>

        {/* --------------------------------------------------------------contact details------------------------------------------------- */}
        <div
          ref={contactRef}
          className="order-3 self-start md:self-auto text-left w-full md:w-auto"
        >
          <h3 className="font-semibold text-[20px] mb-[20px] md:mb-[12px] lg:mb-[20px] xl:text-[24px] text-white">
            Contact Us
          </h3>
          <div className="flex flex-col gap-[15px] md:gap-[10px] lg:gap-[15px] items-start">
            {/* items-start + icon mt-1 => email 2 lines mein wrap ho sake, icon top-aligned rahe */}
            <div className="flex flex-row gap-[10px] xl:gap-[17px] items-center">
              <img src="/mail.svg" alt="" className="shrink-0" />
              <a 
                href="mailto:nomerahmadmalik@gmail.com"
                className="text-[16px] xl:text-[18px] text-white/80 hover:text-white transition-colors break-words md:max-w-[150px] lg:max-w-none"
              >
                nomerahmadmalik@gmail.com
              </a>
            </div>
            <div className="flex flex-row gap-[10px] xl:gap-[17px] items-center">
              <img src="/phone.svg" alt="" />
             <a 
                href="tel:+491731704508"
                className="text-[16px] xl:text-[18px] text-white/80 hover:text-white transition-colors"
              >
                +491731704508
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------------bottom footer-------------------------------------------------------- */}
      <div ref={bottomRef}>
        <div className="mt-10 sm:mt-14 md:mt-[40px] lg:mt-[60px] border-t border-white/20 pt-7 pb-7">
          <p className="text-center text-[16px] xl:text-[18px] text-white px-4">
            © 2026 NEXFORCEIT. All rights reserved.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Footer;