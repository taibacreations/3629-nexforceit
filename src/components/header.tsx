"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Über uns", id: "ueber-uns" },
  { label: "Dienstleistungen", id: "dienstleistungen" },
  { label: "Warum wir?", id: "warum-wir" },
  { label: "Servicegebiet", id: "servicegebiet" },
  { label: "Kontakt", id: "kontakt" },
];

const PILL_PADDING_X = 8;
const PILL_HEIGHT = 30;
const SCROLL_EXTRA_GAP = 20;

const KONTAKT_INDEX = navLinks.findIndex(
  (item) => item.id === "kontakt"
);

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

    gsap.to(btnRef.current, {
      scale: 1.05,
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.fromTo(
      shineRef.current,
      { xPercent: -150 },
      {
        xPercent: 150,
        duration: 0.7,
        ease: "power2.out",
      }
    );
  };

  const handleLeave = () => {
    gsap.killTweensOf(btnRef.current);
    gsap.killTweensOf(shineRef.current);

    gsap.to(btnRef.current, {
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.set(shineRef.current, {
      xPercent: -150,
    });
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

      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
};

const Header = () => {
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);

  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const sidebarLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isClickScrolling = useRef(false);

  const displayIndex = hoveredIndex ?? activeIndex;

  // --------------------------------------------------
  // Mounted
  // --------------------------------------------------

  useEffect(() => {
    setMounted(true);
  }, []);

  // --------------------------------------------------
  // Close mobile menu when route changes
  // --------------------------------------------------

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // --------------------------------------------------
  // Scroll background
  // --------------------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll-spy only matters on Home page
      if (pathname !== "/") return;

      const firstSection = document.getElementById("ueber-uns");
      const headerHeight = headerRef.current?.offsetHeight ?? 0;

      if (
        firstSection &&
        window.scrollY <
          firstSection.offsetTop -
            headerHeight -
            SCROLL_EXTRA_GAP
      ) {
        setActiveIndex(-1);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // --------------------------------------------------
  // Move to section
  // --------------------------------------------------

  const scrollToSection = (id: string, index: number) => {
    // If we're on another page, first go to Home
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const el = document.getElementById(id);

    if (!el) {
      return;
    }

    const headerHeight =
      headerRef.current?.offsetHeight ?? 0;

    const targetY =
      el.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      SCROLL_EXTRA_GAP;

    isClickScrolling.current = true;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });

    window.clearTimeout(
      (scrollToSection as any)._t
    );

    (scrollToSection as any)._t =
      window.setTimeout(() => {
        isClickScrolling.current = false;
      }, 900);

    setActiveIndex(index);
  };

  // --------------------------------------------------
  // Desktop nav click
  // --------------------------------------------------

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    index: number
  ) => {
    e.preventDefault();

    scrollToSection(id, index);
  };

  // --------------------------------------------------
  // Mobile nav click
  // --------------------------------------------------

  const handleSidebarNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    index: number
  ) => {
    e.preventDefault();

    closeMenu();

    // Small delay so menu closes first
    setTimeout(() => {
      scrollToSection(id, index);
    }, 300);
  };

  // --------------------------------------------------
  // Contact button
  // --------------------------------------------------

  const handleKontaktClick = () => {
    scrollToSection("kontakt", KONTAKT_INDEX);
  };

  const handleSidebarKontaktClick = () => {
    closeMenu();

    setTimeout(() => {
      scrollToSection("kontakt", KONTAKT_INDEX);
    }, 300);
  };

  // --------------------------------------------------
  // Desktop pill
  // --------------------------------------------------

  const movePill = (index: number) => {
    if (index < 0) return;

    const link = linkRefs.current[index];
    const pill = pillRef.current;
    const nav = navRef.current;

    if (!link || !pill || !nav) return;

    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    gsap.to(pill, {
      x:
        linkRect.left -
        navRect.left -
        PILL_PADDING_X,
      width:
        linkRect.width +
        PILL_PADDING_X * 2,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  // --------------------------------------------------
  // Initial pill position
  // --------------------------------------------------

  useLayoutEffect(() => {
    const link =
      linkRefs.current[displayIndex];

    const pill = pillRef.current;
    const nav = navRef.current;

    if (link && pill && nav) {
      const linkRect =
        link.getBoundingClientRect();

      const navRect =
        nav.getBoundingClientRect();

      gsap.set(pill, {
        x:
          linkRect.left -
          navRect.left -
          PILL_PADDING_X,
        width:
          linkRect.width +
          PILL_PADDING_X * 2,
      });
    }
  }, [displayIndex]);

  // --------------------------------------------------
  // Active pill
  // --------------------------------------------------

  useEffect(() => {
    if (hoveredIndex !== null) return;

    if (activeIndex === -1) {
      gsap.to(pillRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    } else {
      gsap.to(pillRef.current, {
        opacity: 1,
        duration: 0.2,
      });

      movePill(activeIndex);
    }
  }, [activeIndex, hoveredIndex]);

  // --------------------------------------------------
  // Scroll spy
  // Only runs on Home page
  // --------------------------------------------------

  useEffect(() => {
    if (!mounted || pathname !== "/") return;

    const sections = navLinks
      .map((item) =>
        document.getElementById(item.id)
      )
      .filter(
        (el): el is HTMLElement => el !== null
      );

    if (sections.length === 0) return;

    const headerHeight =
      headerRef.current?.offsetHeight ?? 0;

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (isClickScrolling.current) return;

          const visible = entries.filter(
            (entry) => entry.isIntersecting
          );

          if (visible.length === 0) return;

          const closest = visible.reduce(
            (prev, curr) =>
              curr.boundingClientRect.top <
              prev.boundingClientRect.top
                ? curr
                : prev
          );

          const idx = navLinks.findIndex(
            (item) =>
              item.id === closest.target.id
          );

          if (idx !== -1) {
            setActiveIndex(idx);
          }
        },
        {
          root: null,
          rootMargin: `-${
            headerHeight + 30
          }px 0px -65% 0px`,
          threshold: 0,
        }
      );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, [mounted, pathname]);

  // --------------------------------------------------
  // Header entrance animation
  // --------------------------------------------------

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        headerRef.current,
        {
          yPercent: -100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
        }
      )
        .fromTo(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.85,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
          },
          "-=0.6"
        )
        .fromTo(
          linkRefs.current,
          {
            opacity: 0,
            y: -14,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.5"
        )
        .fromTo(
          pillRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 0,
            duration: 0.4,
          },
          "-=0.4"
        )
        .fromTo(
          buttonWrapRef.current,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.5"
        )
        .call(() => {
          gsap.set(headerRef.current, {
            clearProps: "transform",
          });
        });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // --------------------------------------------------
  // Mobile menu animation
  // --------------------------------------------------

  useEffect(() => {
    if (!mounted || !menuOpen) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarLinkRefs.current,
        {
          opacity: 0,
          x: 30,
        },
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

  // --------------------------------------------------
  // Prevent background scrolling when mobile menu open
  // --------------------------------------------------

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // --------------------------------------------------
  // Close menu
  // --------------------------------------------------

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // --------------------------------------------------
  // Mobile sidebar
  // --------------------------------------------------

  const sidebar = (
    <>
      {/* Overlay */}
      <div
        onClick={closeMenu}
        className={`xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ease-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`xl:hidden fixed top-0 right-0 h-full w-[78%] max-w-[340px] bg-[#011750] z-[9999] flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <Link
            href="/"
            onClick={closeMenu}
          >
            <Image
              src="/logo2.png"
              width={140}
              height={70}
              alt="NEXFORCEIT"
              className="w-[130px] h-auto"
            />
          </Link>

          <button
            aria-label="Close menu"
            onClick={closeMenu}
            className="relative w-9 h-9 flex items-center justify-center"
          >
            <span className="absolute w-6 h-[2px] bg-white rotate-45" />
            <span className="absolute w-6 h-[2px] bg-white -rotate-45" />
          </button>
        </div>

        {/* Mobile nav */}
        <nav className="flex flex-col gap-1 px-6 py-8 overflow-y-auto">
          {navLinks.map((item, index) => (
            <Link
              key={item.label}
              href={
                pathname === "/"
                  ? `#${item.id}`
                  : `/#${item.id}`
              }
              ref={(el) => {
                sidebarLinkRefs.current[index] =
                  el;
              }}
              onClick={(e) =>
                handleSidebarNavClick(
                  e,
                  item.id,
                  index
                )
              }
              className="text-white text-[18px] font-extralight py-3 border-b border-white/5 hover:text-[#b9c8ff] transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile contact button */}
        <div className="mt-auto px-6 pb-10 pt-4">
          <AnimatedButton
            className="text-[16px] w-full h-[50px]"
            onClick={
              handleSidebarKontaktClick
            }
          >
            Kontakt aufnehmen
          </AnimatedButton>
        </div>
      </div>
    </>
  );

  // --------------------------------------------------
  // Header
  // --------------------------------------------------

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
        {/* ------------------------------------------------
            Logo
        ------------------------------------------------ */}

        <div ref={logoRef}>
          <Link href="/">
            <Image
              src="/logo2.png"
              width={216}
              height={100}
              alt="NEXFORCEIT"
              className="w-[140px] sm:w-[170px] lg:w-[216px] h-auto"
              priority
            />
          </Link>
        </div>

        {/* ------------------------------------------------
            Desktop Navigation
        ------------------------------------------------ */}

        <nav
          ref={navRef}
          className="relative hidden xl:flex items-center gap-3 2xl:gap-5 rounded-full px-6 py-5 xl:px-7 xl:py-5 bg-[url(/nav.png)] bg-center bg-cover"
          onMouseLeave={() => {
            setHoveredIndex(null);

            if (activeIndex >= 0) {
              movePill(activeIndex);
            } else {
              gsap.to(pillRef.current, {
                opacity: 0,
                duration: 0.2,
              });
            }
          }}
        >
          {/* Active pill */}
          <div
            ref={pillRef}
            className="absolute top-1/2 left-0 -translate-y-1/2 rounded-[13px] bg-white pointer-events-none"
            style={{
              height: `${PILL_HEIGHT}px`,
            }}
          />

          {navLinks.map((item, index) => (
            <Link
              key={item.label}
              href={
                pathname === "/"
                  ? `#${item.id}`
                  : `/#${item.id}`
              }
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);

                gsap.to(pillRef.current, {
                  opacity: 1,
                  duration: 0.2,
                });

                movePill(index);
              }}
              onClick={(e) =>
                handleNavClick(
                  e,
                  item.id,
                  index
                )
              }
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

        {/* ------------------------------------------------
            Desktop Contact Button
        ------------------------------------------------ */}

        <div
          ref={buttonWrapRef}
          className="hidden xl:block"
        >
          <AnimatedButton
            className="text-[16px] xl:text-[18px] w-[180px] xl:w-[223px] h-[46px] xl:h-[51px]"
            onClick={handleKontaktClick}
          >
            Kontakt aufnehmen
          </AnimatedButton>
        </div>

        {/* ------------------------------------------------
            Mobile Menu Button
        ------------------------------------------------ */}

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

      {/* Mobile sidebar portal */}
      {mounted &&
        createPortal(sidebar, document.body)}
    </section>
  );
};

export default Header;