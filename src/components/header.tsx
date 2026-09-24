"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Heim", id: "heim" },
  { label: "Über uns", id: "ueber-uns" },
  { label: "Dienstleistungen", id: "dienstleistungen" },
  { label: "Warum wir?", id: "warum-wir" },
  { label: "Servicegebiet", id: "servicegebiet" },
  { label: "Kontakt", id: "kontakt" },
];

const PILL_PADDING_X = 8;
const PILL_HEIGHT = 30;
const SCROLL_EXTRA_GAP = 20;
const KONTAKT_INDEX = navLinks.findIndex((item) => item.id === "kontakt");

const AnimatedButton = ({
  className = "",
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
      onClick={onClick}
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
  const [scrolled, setScrolled] = useState(false);
  const isClickScrolling = useRef(false); // click-scroll ke dauran observer ko temporarily ignore karne ke liye

  const sidebarLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const displayIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, index: number) => {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const targetY =
        el.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        SCROLL_EXTRA_GAP;

      // Click ke dauran observer ko rokte hain taake beech mein galat section active na ho jaye
      isClickScrolling.current = true;
      window.scrollTo({ top: targetY, behavior: "smooth" });

      // Smooth-scroll khatam hone ka andaza — thora buffer time ke sath observer wapas chalu
      window.clearTimeout((scrollToSection as any)._t);
      (scrollToSection as any)._t = window.setTimeout(() => {
        isClickScrolling.current = false;
      }, 900);
    }
    setActiveIndex(index);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    index: number
  ) => {
    e.preventDefault();
    scrollToSection(id, index);
  };

  const handleSidebarNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    index: number
  ) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => scrollToSection(id, index), 300);
  };

  const handleKontaktClick = () => {
    scrollToSection("kontakt", KONTAKT_INDEX);
  };

  const handleSidebarKontaktClick = () => {
    closeMenu();
    setTimeout(() => scrollToSection("kontakt", KONTAKT_INDEX), 300);
  };

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

  // Jab bhi activeIndex change ho (scroll-spy ya click se) — agar koi hover nahi ho raha,
  // pill ko us naye active link par smoothly move karo. Hover hamesha priority leta hai.
  useEffect(() => {
    if (hoveredIndex === null) {
      movePill(activeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // ---------------- Scroll-spy: manual scroll par bhi sahi section active ho ----------------
  useEffect(() => {
    if (!mounted) return;

    const sections = navLinks
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 0;

    const observer = new IntersectionObserver(
      (entries) => {
        // Click-triggered smooth-scroll ke dauran observer ko ignore karo,
        // taake beech-raste ka koi section galti se active na ho jaye
        if (isClickScrolling.current) return;

        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        // Jo section header ke sabse qareeb (viewport ke top ke sabse nazdeek) hai, wahi "active" hai
        const closest = visible.reduce((prev, curr) =>
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
        );

        const idx = navLinks.findIndex((item) => item.id === closest.target.id);
        if (idx !== -1) setActiveIndex(idx);
      },
      {
        root: null,
        // Header ke neeche ek patli "active zone" banati hai — jo section is zone ko chhue, wahi active
        rootMargin: `-${headerHeight + 30}px 0px -65% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [mounted]);

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
          gsap.set(headerRef.current, { clearProps: "transform" });
        });
    }, headerRef);

    return () => ctx.revert();
  }, []);

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
      <div
        onClick={closeMenu}
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

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
              href={`#${item.id}`}
              ref={(el) => {
                sidebarLinkRefs.current[index] = el;
              }}
              onClick={(e) => handleSidebarNavClick(e, item.id, index)}
              className="text-white text-[18px] font-extralight py-3 border-b border-white/5 hover:text-[#b9c8ff] transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 pb-10 pt-4">
          <AnimatedButton
            className="text-[16px] w-full h-[50px]"
            onClick={handleSidebarKontaktClick}
          >
            Kontakt aufnehmen
          </AnimatedButton>
        </div>
      </div>
    </>
  );

  return (
    <section
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#011750]/70 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-[1480px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 transition-all duration-300 ${
          scrolled
            ? "pt-[1.2vh] lg:pt-[1.5vh] pb-[1.2vh]"
            : "pt-[3vh] lg:pt-[4.5vh] pb-[1.5vh] lg:pb-0"
        }`}
      >
        <div ref={logoRef}>
          <Link href="#heim" onClick={(e) => handleNavClick(e, "heim", 0)}>
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
              href={`#${item.id}`}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                movePill(index);
              }}
              onClick={(e) => handleNavClick(e, item.id, index)}
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
          <AnimatedButton
            className="text-[16px] xl:text-[18px] w-[180px] xl:w-[223px] h-[46px] xl:h-[51px]"
            onClick={handleKontaktClick}
          >
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