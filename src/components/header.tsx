"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "heim", href: "#" },
  { label: "Über uns", href: "#" },
  { label: "Dienstleistungen", href: "#" },
  { label: "Warum wir?", href: "#" },
  { label: "Servicegebiet", href: "#" },
  { label: "Kontakt", href: "#" },
];

const PILL_PADDING_X = 8;
const PILL_HEIGHT = 30;

const AnimatedButton = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    gsap.killTweensOf(btnRef.current);
    gsap.killTweensOf(shineRef.current);
    gsap.to(btnRef.current, { scale: 1.05, duration: 0.35, ease: "power3.out" });
    gsap.fromTo(
      shineRef.current,
      { xPercent: -150 },
      { xPercent: 150, duration: 0.7, ease: "power2.out" }
    );
  };

  const handleLeave = () => {
    gsap.killTweensOf(btnRef.current);
    gsap.killTweensOf(shineRef.current);
    gsap.to(btnRef.current, { scale: 1, duration: 0.35, ease: "power3.out" });
    gsap.set(shineRef.current, { xPercent: -150 });
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`button relative overflow-hidden ${className}`}
      style={{ transform: "scale(1)" }}
    >
      <span
        ref={shineRef}
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style={{ transform: "translateX(-150%)" }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sidebarLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const displayIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    setMounted(true);
  }, []);

  const movePill = (index: number) => {
    const link = linkRefs.current[index];
    const pill = pillRef.current;
    const nav = navRef.current;
    if (!link || !pill || !nav) return;
    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    gsap.to(pill, {
      x: linkRect.left - navRect.left - PILL_PADDING_X,
      width: linkRect.width + PILL_PADDING_X * 2,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  useLayoutEffect(() => {
    const link = linkRefs.current[displayIndex];
    const pill = pillRef.current;
    const nav = navRef.current;
    if (link && pill && nav) {
      const linkRect = link.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      gsap.set(pill, {
        x: linkRect.left - navRect.left - PILL_PADDING_X,
        width: linkRect.width + PILL_PADDING_X * 2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        headerRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          linkRefs.current,
          { opacity: 0, y: -14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.5"
        )
        .fromTo(pillRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.4")
        .fromTo(
          buttonWrapRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .call(() => {
          // Once entrance is done, remove the transform so this section
          // never acts as a containing block for fixed-position children.
          gsap.set(headerRef.current, { clearProps: "transform" });
        });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Only animate the LINKS with GSAP when sidebar opens — container
  // visibility/position is handled purely by Tailwind classes below,
  // so there is no fight between React's static styles and GSAP.
  useEffect(() => {
    if (!mounted || !menuOpen) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarLinkRefs.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.07,
          delay: 0.15,
          ease: "power3.out",
        }
      );
    });
    return () => ctx.revert();
  }, [menuOpen, mounted]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const sidebar = (
    <>
      {/* Sidebar overlay (backdrop) — always mounted, just fades via classes */}
      <div
        onClick={closeMenu}
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar panel — always mounted, slides via classes */}
      <div
        className={`xl:hidden fixed top-0 right-0 h-full w-[78%] max-w-[340px] bg-[#011750] z-[9999] flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <Image
            src="/logo.svg"
            width={140}
            height={70}
            alt="logo"
            className="w-[130px] h-auto"
          />
          <button
            aria-label="Close menu"
            onClick={closeMenu}
            className="relative w-9 h-9 flex items-center justify-center"
          >
            <span className="absolute w-6 h-[2px] bg-white rotate-45" />
            <span className="absolute w-6 h-[2px] bg-white -rotate-45" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6 py-8 overflow-y-auto">
          {navLinks.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              ref={(el) => {
                sidebarLinkRefs.current[index] = el;
              }}
              onClick={() => {
                setActiveIndex(index);
                closeMenu();
              }}
              className="text-white text-[18px] font-extralight py-3 border-b border-white/5 hover:text-[#b9c8ff] transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 pb-10 pt-4">
          <AnimatedButton className="text-[16px] w-full h-[50px]">
            Kontakt aufnehmen
          </AnimatedButton>
        </div>
      </div>
    </>
  );

  return (
    <section ref={headerRef} className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1480px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 pt-[3vh] lg:pt-[4.5vh]">
        <div ref={logoRef}>
          <Link href={"#"}>
            <Image
              src="/logo.svg"
              width={216}
              height={100}
              alt="logo"
              className="w-[140px] sm:w-[170px] lg:w-[216px] h-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav
          ref={navRef}
          className="relative hidden xl:flex items-center gap-3 2xl:gap-5 rounded-full px-6 py-5 xl:px-7 xl:py-5 bg-[url(/nav.png)] bg-center bg-cover"
          onMouseLeave={() => {
            setHoveredIndex(null);
            movePill(activeIndex);
          }}
        >
          <div
            ref={pillRef}
            className="absolute top-1/2 left-0 -translate-y-1/2 rounded-[13px] bg-white pointer-events-none"
            style={{ height: `${PILL_HEIGHT}px` }}
          />
          {navLinks.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                movePill(index);
              }}
              onClick={() => setActiveIndex(index)}
              className={`relative z-10 text-[14px] xl:text-[16px] py-1 px-3.5 whitespace-nowrap transition-colors duration-300 ${
                index === displayIndex
                  ? "text-[#011750] font-normal"
                  : "text-white font-extralight"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div ref={buttonWrapRef} className="hidden xl:block">
          <AnimatedButton className="text-[16px] xl:text-[18px] w-[180px] xl:w-[223px] h-[46px] xl:h-[51px]">
            Kontakt aufnehmen
          </AnimatedButton>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(true)}
          className="xl:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
        >
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
        </button>
      </div>

      {mounted && createPortal(sidebar, document.body)}
    </section>
  );
};

export default Header;