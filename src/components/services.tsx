"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "Fieldservice und Vor Ort Support",
    description:
      "Technische Unterstützung bei Störungen, Installationen, Austauschmaßnahmen und geplanten Serviceeinsätzen direkt beim Kunden.",
    icon: "service1.svg",
  },
  {
    id: "02",
    title: "Smart Hands und Remote Hands",
    description:
      "Ihre IT steuert zentral, wir übernehmen die technische Umsetzung vor Ort nach Ihren Vorgaben und Prozessen.",
    icon: "service2.svg",
  },
  {
    id: "03",
    title: "Netzwerk und WLAN",
    description:
      "Installation, Erweiterung und Betreuung von Netzwerk und WLAN Infrastrukturen inklusive Access Points, Switches, Verkabelung und technischer Fehleranalyse.",
    icon: "service3.svg",
  },
  {
    id: "04",
    title: "Serverraum und IT Infrastruktur",
    description:
      "Installation, Verkabelung und Austausch von IT Komponenten in Server und Technikräumen inklusive Rack und Patcharbeiten.",
    icon: "service4.svg",
  },
  {
    id: "05",
    title: "Entstörung und dringende Serviceeinsätze",
    description:
      "Schnelle technische Unterstützung bei akuten Störungen und Ausfällen in den Bereichen Netzwerk, WLAN, Hardware, Verkabelung und IT Infrastruktur direkt vor Ort.",
    icon: "service1.svg",
  },
  {
    id: "06",
    title: "Rollouts und Workplace",
    description:
      "Strukturierte Umsetzung von Hardware, Software und Arbeitsplatz Rollouts an einzelnen oder mehreren Standorten.",
    icon: "service1.svg",
  },
  {
    id: "07",
    title: "Netzwerkverkabelung und Glasfaser",
    description:
      "Aufbau, Erweiterung und Modernisierung leistungsfähiger Netzwerk und Glasfaser Infrastrukturen für bestehende und neue Standorte.",
    icon: "service1.svg",
  },
  {
    id: "08",
    title: "Standortservice und IT Umzüge",
    description:
      "Aufbau, Umbau und Rückbau von IT Infrastruktur bei Standortwechseln, Neueröffnungen und Modernisierungen.",
    icon: "service1.svg",
  },
  {
    id: "09",
    title: "Ihre Anforderungen. Unsere Umsetzung.",
    description:
      "Vom einzelnen Serviceeinsatz bis zum standortübergreifenden Rollout unterstützen wir Unternehmen und IT Dienstleister im Rhein Main Gebiet und im bayerischen Wirtschaftsraum.",
    icon: "service1.svg",
  },
];

const CARD_WIDTH = 400;
const CARD_GAP = 30;
const STEP = CARD_WIDTH + CARD_GAP; // 430
const CLONE_COUNT = 5;
const AUTOPLAY_DELAY = 3200;
const DOTS_COUNT = 3;
const GROUP_SIZE = Math.ceil(servicesData.length / DOTS_COUNT);
const DRAG_THRESHOLD = 80; // px — itna drag karne par slide change hogi
const LG_LEFT_PEEK = CARD_WIDTH / 2; // 200px => lg+ par bilkul "half" card left side peek

const extendedCards = [
  ...servicesData.slice(-CLONE_COUNT),
  ...servicesData,
  ...servicesData.slice(0, CLONE_COUNT),
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentIndex = useRef(CLONE_COUNT);
  const isAnimating = useRef(false);
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const offsetRef = useRef(0); // center/peek offset, breakpoint ke hisaab se

  // Drag tracking refs
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTranslateX = useRef(0);

  const [activeDot, setActiveDot] = useState(0);

  // Breakpoint ke hisaab se offset: lg+ => fixed left-peek; mobile/md => dynamic center
  const getOffset = useCallback(() => {
    if (typeof window === "undefined") return 0;
    const w = window.innerWidth;
    if (w >= 1024) {
      return LG_LEFT_PEEK;
    }
    return Math.round((w - CARD_WIDTH) / 2);
  }, []);

  const xForIndex = useCallback((index: number) => {
    return -index * STEP + offsetRef.current;
  }, []);

  const updateActiveDot = useCallback(() => {
    const realIndex =
      ((currentIndex.current - CLONE_COUNT) % servicesData.length +
        servicesData.length) %
      servicesData.length;
    setActiveDot(Math.min(Math.floor(realIndex / GROUP_SIZE), DOTS_COUNT - 1));
  }, []);

  const goToIndex = useCallback(
    (targetIndex: number) => {
      if (!trackRef.current || isAnimating.current) return;
      isAnimating.current = true;

      gsap.to(trackRef.current, {
        x: xForIndex(targetIndex),
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => {
          let finalIndex = targetIndex;

          if (finalIndex >= CLONE_COUNT + servicesData.length) {
            finalIndex -= servicesData.length;
            gsap.set(trackRef.current, { x: xForIndex(finalIndex) });
          } else if (finalIndex < CLONE_COUNT) {
            finalIndex += servicesData.length;
            gsap.set(trackRef.current, { x: xForIndex(finalIndex) });
          }

          currentIndex.current = finalIndex;
          isAnimating.current = false;
          updateActiveDot();
        },
      });
    },
    [updateActiveDot, xForIndex]
  );

  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      goToIndex(currentIndex.current + 1);
    }, AUTOPLAY_DELAY);
  }, [goToIndex]);

  const handleDotClick = (dotIndex: number) => {
    goToIndex(CLONE_COUNT + dotIndex * GROUP_SIZE);
    startAutoplay();
  };

  // Initial position + offset setup + resize listener
  useEffect(() => {
    if (!trackRef.current) return;

    const applyOffset = (animate: boolean) => {
      offsetRef.current = getOffset();
      const x = xForIndex(currentIndex.current);
      if (animate) {
        gsap.to(trackRef.current, { x, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.set(trackRef.current, { x });
      }
    };

    applyOffset(false); // pehli dafa, bina animation ke
    startAutoplay();

    const handleResize = () => applyOffset(true);
    window.addEventListener("resize", handleResize);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [startAutoplay, getOffset, xForIndex]);

  // ---------------- Drag / Grab handlers ----------------
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    isAnimating.current = false; // kabhi stuck na ho agar autoplay tween beech mein interrupt ho
    dragStartX.current = e.clientX;
    dragStartTranslateX.current = Number(gsap.getProperty(trackRef.current, "x"));

    gsap.killTweensOf(trackRef.current);
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const delta = e.clientX - dragStartX.current;
    gsap.set(trackRef.current, { x: dragStartTranslateX.current + delta });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const delta = e.clientX - dragStartX.current;

    if (Math.abs(delta) > DRAG_THRESHOLD) {
      if (delta < 0) {
        goToIndex(currentIndex.current + 1); // left ki taraf drag => next
      } else {
        goToIndex(currentIndex.current - 1); // right ki taraf drag => previous
      }
    } else {
      goToIndex(currentIndex.current); // threshold se kam => wapas snap
    }

    startAutoplay();
  };

  // Entrance animation
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
          paraRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".service-card",
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[8vh] overflow-hidden">
      <div className="max-w-[900px] mx-auto px-4">
        <h2
          ref={headingRef}
          className="font-bold text-[28px] md:text-[36px] xl:text-[40px] leading-[36px] sm:leading-[44px] lg:leading-[50px] text-center text-white"
        >
          Unsere IT-Leistungen
        </h2>
        <p
          ref={paraRef}
          className="font-normal text-[16px] md:text-[18px] xl:text-[20px] leading-[24px] xl:leading-[25px] text-center text-white/80"
        >
          Von der einzelnen Installation bis zur umfassenden technischen
          Umsetzung – wir bieten zuverlässigen IT-Service für Unternehmen und
          Privatkunden.
        </p>
      </div>

      {/* Slider wrapper — pointer handlers yahan, cursor-grab class bhi yahan */}
      <div
        ref={wrapperRef}
        className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-[4vh] select-none cursor-grab active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div ref={trackRef} className="flex gap-[30px]">
          {extendedCards.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className="service-card shrink-0 p-8 w-[400px] h-[400px] bg-[#020B26] border border-white/40 rounded-[20px] flex flex-col"
            >
              <div className="flex justify-between">
                <span className="font-bold text-[55px] text-white/15">{service.id}</span>
                <span>
                  <img src={service.icon} alt="service-logo" draggable={false} />
                </span>
              </div>
              <div className="max-w-[314px]">
                <h3 className="font-bold text-[20px] xl:text-[24px] pt-[5px] pb-3.5 uppercase max-w-[290px] leading-[28px] text-white">
                  {service.title}
                </h3>
                <p className="font-normal text-[16px] xl:text-[18px] leading-[28px] text-white/70">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-9">
        {Array.from({ length: DOTS_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-[8px] rounded-full transition-all duration-300 ${
              activeDot === i ? "w-[73px] bg-[#0C3AFD]" : "w-[35px] bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;