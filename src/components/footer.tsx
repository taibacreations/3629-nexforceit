"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const pathname = usePathname();

  const sectionRef = useRef<HTMLElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // --------------------------------------------------
  // GSAP animation
  // --------------------------------------------------

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        quickLinksRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          logoRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
          },
          "-=0.6"
        )
        .fromTo(
          contactRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .fromTo(
          bottomRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --------------------------------------------------
  // Footer section navigation
  // --------------------------------------------------

  const handleFooterLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();

    // Agar current page Home nahi hai
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    // Home page par section find karo
    const element = document.getElementById(id);

    if (!element) return;

    const header = document.querySelector("header");
    const headerHeight =
      header instanceof HTMLElement ? header.offsetHeight : 0;

    const extraGap = 20;

    const targetY =
      element.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      extraGap;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black bg-bottom md:bg-cover md:bg-center 2xl:bg-contain 2xl:bg-bottom bg-no-repeat overflow-hidden md:pt-[80px] 2xl:pt-[18.5vh]"
      style={{
        backgroundImage: "url('/footer-bg.png')",
      }}
    >
      {/* Mobile-only blend overlay */}
      <div className="absolute top-70 left-0 w-full h-30 z-10 md:hidden backdrop-blur-md bg-gradient-to-b from-transparent via-[#010304] to-[#010304] pointer-events-none" />

      <div className="relative max-w-[1480px] z-50 mx-auto px-4 md:px-6 xl:px-10 flex flex-col md:flex-row justify-between items-start gap-10 md:gap-4 lg:gap-6">
        {/* -------------------------------------------------
            Quick Links
        ------------------------------------------------- */}

        <div
          ref={quickLinksRef}
          className="order-2 md:order-1 self-start md:self-auto text-left w-full md:w-auto"
        >
          <h3 className="font-semibold text-[20px] mb-[20px] md:mb-[12px] lg:mb-[20px] xl:text-[24px] text-white">
            Quicklinks
          </h3>

          <div className="flex flex-col lg:flex-row lg:gap-[15px] xl:gap-[30px] items-start">
            {/* First column */}
            <div className="flex flex-col items-start">
              <ul>
                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link
                    href={pathname === "/" ? "#ueber-uns" : "/#ueber-uns"}
                    onClick={(e) => handleFooterLinkClick(e, "ueber-uns")}
                  >
                    Über uns
                  </Link>
                </li>

                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link
                    href={
                      pathname === "/"
                        ? "#dienstleistungen"
                        : "/#dienstleistungen"
                    }
                    onClick={(e) =>
                      handleFooterLinkClick(e, "dienstleistungen")
                    }
                  >
                    Dienstleistungen
                  </Link>
                </li>

                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link href="/datenschutz">Datenschutz</Link>
                </li>
              </ul>
            </div>

            {/* Second column */}
            <div className="flex flex-col items-start">
              <ul>
                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link
                    href={pathname === "/" ? "#warum-wir" : "/#warum-wir"}
                    onClick={(e) => handleFooterLinkClick(e, "warum-wir")}
                  >
                    Warum wir?
                  </Link>
                </li>

                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link
                    href={
                      pathname === "/"
                        ? "#servicegebiet"
                        : "/#servicegebiet"
                    }
                    onClick={(e) => handleFooterLinkClick(e, "servicegebiet")}
                  >
                    Servicegebiet
                  </Link>
                </li>

                <li className="text-[16px] xl:text-[18px] mb-[15px] md:mb-[8px] lg:mb-[15px] text-white/80 hover:text-white transition-colors">
                  <Link
                    href={pathname === "/" ? "#kontakt" : "/#kontakt"}
                    onClick={(e) => handleFooterLinkClick(e, "kontakt")}
                  >
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------
            Logo
        ------------------------------------------------- */}

        <div
          ref={logoRef}
          className="order-1 md:order-2 flex flex-col gap-[10px] md:gap-[5px] lg:gap-[2px] md:items-center"
        >
          {/* Footer logo -> Home */}
          <Link href="/">
            <img
              src="/logo2.png"
              alt="NexForceIT Logo"
              className="w-[170px] md:w-[280px] xl:w-[300px]"
            />
          </Link>

          {/* Social icons */}
          <div className="flex gap-[17px]">
            <a
              href="https://www.linkedin.com/in/nexforce-it-46642843b"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src="/in.svg"
                alt="LinkedIn"
                className="w-[35px] h-[35px] md:w-[36px] md:h-[36px] xl:w-auto xl:h-auto"
              />
            </a>

            <a
              href="https://www.instagram.com/nexforceit?stkn=MW9vbGdvdmhxM3llbQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src="/insta.svg"
                alt="Instagram"
                className="w-[35px] h-[35px] md:w-[36px] md:h-[36px] xl:w-auto xl:h-auto"
              />
            </a>
          </div>
        </div>

        {/* -------------------------------------------------
            Contact Details
        ------------------------------------------------- */}

        <div
          ref={contactRef}
          className="order-3 self-start md:self-auto text-left w-full md:w-auto"
        >
          <h3 className="font-semibold text-[20px] mb-[20px] md:mb-[12px] lg:mb-[20px] xl:text-[24px] text-white">
            Kontaktieren Sie uns
          </h3>

          <div className="flex flex-col gap-[15px] md:gap-[10px] lg:gap-[15px] items-start">
            {/* Email */}
            <div className="flex flex-row gap-[10px] xl:gap-[17px] items-center">
              <img src="/mail.svg" alt="" className="shrink-0" />

              <a
                href="mailto:info@nexforce-it.com"
                className="text-[16px] xl:text-[18px] text-white/80 hover:text-white transition-colors break-words md:max-w-[150px] lg:max-w-none"
              >
                info@nexforce-it.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-row gap-[10px] xl:gap-[17px] items-center">
              <img src="/phone.svg" alt="" />

              <a
                href="tel:+491731704508"
                className="text-[16px] xl:text-[18px] text-white/80 hover:text-white transition-colors"
              >
                +49 6109 9664037
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------
          Bottom Footer
      ------------------------------------------------- */}

      <div ref={bottomRef}>
        <div className="mt-10 sm:mt-14 md:mt-[40px] lg:mt-[60px] border-t border-white/20 pt-7 pb-7 px-4">
          <div className="max-w-[1480px] mx-auto flex flex-col-reverse md:flex-row md:justify-between items-center gap-3 md:gap-4 text-center md:text-left md:px-6 xl:px-10">
            <p className="text-[16px] xl:text-[18px] text-white">
              © 2026 NexForce-IT. Alle Rechte vorbehalten.
            </p>

            <Link
              href="/impressum"
              className="text-[16px] xl:text-[18px] text-white/80 hover:text-white underline underline-offset-2 transition-colors"
            >
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;