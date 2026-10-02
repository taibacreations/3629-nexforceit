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
    title: "Entstörung und dringende Serviceeinsätze",
    description:
      "Schnelle technische Unterstützung bei akuten Störungen und Ausfällen in den Bereichen Netzwerk, WLAN, Hardware, Verkabelung und IT Infrastruktur direkt vor Ort.",
    icon: "service1.png",
  },
  {
    id: "02",
    title: "Fieldservice und Vor Ort Support",
    description:
      "Technische Unterstützung bei Störungen, Installationen, Austauschmaßnahmen und geplanten Serviceeinsätzen direkt beim Kunden.",
    icon: "service2.png",
  },
  {
    id: "03",
    title: "Smart Hands und Remote Hands",
    description:
      "Ihre IT steuert zentral, wir übernehmen die technische Umsetzung vor Ort nach Ihren Vorgaben und Prozessen.",
    icon: "service3.svg",
  },
  {
    id: "04",
    title: " Netzwerk und WLAN",
    description:
      "Installation, Erweiterung und Betreuung von Netzwerk und WLAN Infrastrukturen inklusive Access Points, Switches, Verkabelung und technischer Fehleranalyse.",
    icon: "service4.svg",
  },
  {
    id: "05",
    title: "Serverraum und IT Infrastruktur",
    description:
      "Installation, Verkabelung und Austausch von IT Komponenten in Server und Technikräumen inklusive Rack und Patcharbeiten.",
    icon: "service5.png",
  },
  {
    id: "06",
    title: "Rollouts und Workplace",
    description:
      "Strukturierte Umsetzung von Hardware, Software und Arbeitsplatz Rollouts an einzelnen oder mehreren Standorten.",
    icon: "service6.svg",
  },
  {
    id: "07",
    title: "Netzwerkverkabelung und Glasfaser",
    description:
      "Aufbau, Erweiterung und Modernisierung leistungsfähiger Netzwerk und Glasfaser Infrastrukturen für bestehende und neue Standorte.",
    icon: "service7.png",
  },
  {
    id: "08",
    title: "Standortservice und IT Umzüge",
    description:
      "Aufbau, Umbau und Rückbau von IT Infrastruktur bei Standortwechseln, Neueröffnungen und Modernisierungen.",
    icon: "service8.png",
  },
  {
    id: "09",
    title: "Ihre Anforderungen. Unsere Umsetzung.",
    description:
      "Vom einzelnen Serviceeinsatz bis zum standortübergreifenden Rollout unterstützen wir Unternehmen und IT Dienstleister im Rhein Main Gebiet und im bayerischen Wirtschaftsraum.",
    icon: "service9.svg",
  },
];

const CARD_WIDTH_DESKTOP = 400;
const MOBILE_SIDE_PADDING = 16; // px-4 => 16px har taraf
const CARD_GAP = 30;
const CLONE_COUNT = 5;
const AUTOPLAY_DELAY = 3200;
const DOTS_COUNT = 3;
const GROUP_SIZE = Math.ceil(servicesData.length / DOTS_COUNT);
const DRAG_THRESHOLD = 80;
const LG_LEFT_PEEK = CARD_WIDTH_DESKTOP / 2; // 200px

const extendedCards = [
  ...servicesData.slice(-CLONE_COUNT),
  ...servicesData,
  ...servicesData.slice(0, CLONE_COUNT),
];

type GoToOpts = { duration?: number; ease?: string };

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentIndex = useRef(CLONE_COUNT);
  const isAnimating = useRef(false);
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const offsetRef = useRef(0);
  const stepRef = useRef(CARD_WIDTH_DESKTOP + CARD_GAP);
  const isHovering = useRef(false);

  // Drag tracking refs
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTranslateX = useRef(0);
  const quickXRef = useRef<((value: number) => void) | null>(null);
  const lastDelta = useRef(0);
  const lastMoveX = useRef(0);
  const lastMoveTime = useRef(0);
  const velocity = useRef(0); // px/ms (smoothed)

  const [activeDot, setActiveDot] = useState(0);

  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return CARD_WIDTH_DESKTOP;
    if (window.innerWidth < 768) {
      return window.innerWidth - MOBILE_SIDE_PADDING * 2;
    }
    return CARD_WIDTH_DESKTOP;
  }, []);

  const getOffset = useCallback((cardWidth: number) => {
    if (typeof window === "undefined") return 0;
    const w = window.innerWidth;
    if (w >= 1024) {
      return LG_LEFT_PEEK;
    }
    return Math.round((w - cardWidth) / 2);
  }, []);

  const xForIndex = useCallback((index: number) => {
    return -index * stepRef.current + offsetRef.current;
  }, []);

  const updateActiveDot = useCallback(() => {
    const realIndex =
      (((currentIndex.current - CLONE_COUNT) % servicesData.length) +
        servicesData.length) %
      servicesData.length;
    setActiveDot(Math.min(Math.floor(realIndex / GROUP_SIZE), DOTS_COUNT - 1));
  }, []);

  // Track ki asal position se index nikalo, aur clone zone se bahar ho to wrap karo
  const syncIndexFromPosition = useCallback(() => {
    if (!trackRef.current) return;
    const x = Number(gsap.getProperty(trackRef.current, "x"));
    let idx = Math.round((offsetRef.current - x) / stepRef.current);

    if (idx >= CLONE_COUNT + servicesData.length) {
      idx -= servicesData.length;
      gsap.set(trackRef.current, {
        x: x + servicesData.length * stepRef.current,
      });
    } else if (idx < CLONE_COUNT) {
      idx += servicesData.length;
      gsap.set(trackRef.current, {
        x: x - servicesData.length * stepRef.current,
      });
    }
    currentIndex.current = idx;
  }, []);

  const goToIndex = useCallback(
    (targetIndex: number, opts?: GoToOpts) => {
      if (!trackRef.current || isAnimating.current) return;
      isAnimating.current = true;

      gsap.to(trackRef.current, {
        x: xForIndex(targetIndex),
        duration: opts?.duration ?? 0.9,
        ease: opts?.ease ?? "power3.inOut",
        force3D: true,
        onComplete: () => {
          let finalIndex = targetIndex;

          if (finalIndex >= CLONE_COUNT + servicesData.length) {
            finalIndex -= servicesData.length;
            gsap.set(trackRef.current, {
              x: xForIndex(finalIndex),
              force3D: true,
            });
          } else if (finalIndex < CLONE_COUNT) {
            finalIndex += servicesData.length;
            gsap.set(trackRef.current, {
              x: xForIndex(finalIndex),
              force3D: true,
            });
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
    if (isHovering.current) return;
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      goToIndex(currentIndex.current + 1);
    }, AUTOPLAY_DELAY);
  }, [goToIndex]);

  const handleDotClick = (dotIndex: number) => {
    goToIndex(CLONE_COUNT + dotIndex * GROUP_SIZE);
    startAutoplay();
  };

  // Hover sirf mouse ke liye (touch par isHovering atakta tha)
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    isHovering.current = true;
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    isHovering.current = false;
    if (!isDragging.current) startAutoplay();
  };

  // Initial position + offset/step setup + resize listener
  useEffect(() => {
    if (!trackRef.current) return;

    const applyOffset = () => {
      const cardWidth = getCardWidth();
      stepRef.current = cardWidth + CARD_GAP;
      offsetRef.current = getOffset(cardWidth);
      gsap.set(trackRef.current, {
        x: xForIndex(currentIndex.current),
        force3D: true,
      });
    };

    applyOffset();
    startAutoplay();

    let lastWidth = window.innerWidth;

    const handleResize = () => {
      // Phone par address bar show/hide hone se sirf height badalti hai,
      // us par slider ko bilkul nahi chhedna
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      // Drag chal raha ho to beech mein na chhedo
      if (isDragging.current) return;

      gsap.killTweensOf(trackRef.current);
      isAnimating.current = false;
      syncIndexFromPosition(); // purani step/offset se hi index nikalo
      applyOffset(); // phir nayi step/offset lagao
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [startAutoplay, getOffset, getCardWidth, xForIndex, syncIndexFromPosition]);

  // ---------------- Drag / Grab handlers ----------------
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    if (!e.isPrimary) return; // multi-touch ignore
    if (e.pointerType === "mouse" && e.button !== 0) return;

    gsap.killTweensOf(trackRef.current);
    isAnimating.current = false;
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);

    // Tween beech mein kata ho to index asal position se sync karo
    syncIndexFromPosition();

    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartTranslateX.current = Number(
      gsap.getProperty(trackRef.current, "x")
    );
    lastDelta.current = 0;
    lastMoveX.current = e.clientX;
    lastMoveTime.current = performance.now();
    velocity.current = 0;

    quickXRef.current = gsap.quickSetter(trackRef.current, "x", "px") as (
      v: number
    ) => void;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;

    const delta = e.clientX - dragStartX.current;
    lastDelta.current = delta;

    const now = performance.now();
    const dt = now - lastMoveTime.current;
    if (dt > 0) {
      const instant = (e.clientX - lastMoveX.current) / dt;
      // Smoothing: ek chhota ulta jhatka direction ko na bigaade
      velocity.current = velocity.current * 0.6 + instant * 0.4;
    }
    lastMoveX.current = e.clientX;
    lastMoveTime.current = now;

    quickXRef.current?.(dragStartTranslateX.current + delta);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    quickXRef.current = null;

    const delta = lastDelta.current;

    // Agar ungli release se pehle ruk gayi thi to purani velocity ignore karo
    const restedMs = performance.now() - lastMoveTime.current;
    const v = restedMs > 80 ? 0 : velocity.current;

    // Drag distance + thoda momentum = projected distance
    const projected = delta + v * 150;
    const distThreshold = Math.min(DRAG_THRESHOLD, stepRef.current * 0.15);

    if (Math.abs(projected) > distThreshold) {
      const dir = projected < 0 ? 1 : -1;
      goToIndex(currentIndex.current + dir, {
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      goToIndex(currentIndex.current, { duration: 0.4, ease: "power3.out" });
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
    <section
      id="dienstleistungen"
      ref={sectionRef}
      className="relative bg-black overflow-x-hidden pt-[48px] md:pt-[65px] md:pb-[30px] 2xl:py-[8vh]"
    >
      <div className="max-w-[930px] relative z-10 mx-auto px-4">
        <h2
          ref={headingRef}
          className="font-bold text-[28px] md:text-[36px] xl:text-[40px] leading-[36px] sm:leading-[44px] lg:leading-[50px] pb-4 uppercase text-center text-white"
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

      {/* Slider wrapper */}
      <div
        ref={wrapperRef}
        className="relative w-screen left-1/2 -translate-x-1/2 overflow-x-hidden pb-2 mt-[4vh] select-none cursor-grab active:cursor-grabbing z-10"
        style={{ touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <div
          ref={trackRef}
          className="flex gap-[30px]"
          style={{ willChange: "transform" }}
        >
          {extendedCards.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className="service-card shrink-0 p-8 w-[calc(100vw-32px)] md:w-[400px] h-auto min-h-[400px] bg-[#020B26] border border-white/40 rounded-[20px] flex flex-col"
            >
              <div className="flex justify-between">
                <span className="font-bold text-[55px] text-white/15">
                  {service.id}
                </span>
                <span>
                  <img
                    src={service.icon}
                    alt="service-logo"
                    draggable={false}
                    decoding="async"
                  />
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
      <div className="flex justify-center items-center gap-2 mt-7">
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