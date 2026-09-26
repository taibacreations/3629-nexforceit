"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50, letterSpacing: "0.05em" },
        { opacity: 1, y: 0, letterSpacing: "0em", duration: 1 }
      )
        .fromTo(paraRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(formWrapRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.9 }, "-=0.4")
        .fromTo(
          imageWrapRef.current,
          { clipPath: "inset(0 0 0 100%)", opacity: 0 },
          { clipPath: "inset(0 0 0 0%)", opacity: 1, duration: 1.2, ease: "power4.inOut" },
          "-=0.8"
        )
        .fromTo(imageRef.current, { scale: 1.15 }, { scale: 1, duration: 1.4, ease: "power3.out" }, "-=1.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject) {
      setStatus("error");
      setErrorMsg("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    if (!formData.consent) {
      setStatus("error");
      setErrorMsg("Bitte akzeptieren Sie die Datenschutzerklärung.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        consent: false,
      });
    } catch (err) {
      console.error("Contact form submit error:", err);
      setStatus("error");
      setErrorMsg("Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.");
    }
  };

  const handleButtonEnter = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.killTweensOf(shineRef.current);
    gsap.to(buttonRef.current, { scale: 1.05, duration: 0.35, ease: "power3.out" });
    gsap.fromTo(shineRef.current, { xPercent: -150 }, { xPercent: 150, duration: 0.7, ease: "power2.out" });
  };

  const handleButtonLeave = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.killTweensOf(shineRef.current);
    gsap.to(buttonRef.current, { scale: 1, duration: 0.35, ease: "power3.out" });
    gsap.set(shineRef.current, { xPercent: -150 });
  };

  return (
    <section id="kontakt" ref={sectionRef} className="bg-black xl:pb-10 2xl:pb-16 2xl:pt-20">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10">
        <h2 ref={headingRef} className="font-bold text-[28px] md:text-[36px] xl:text-[40px] leading-[36px] sm:leading-[44px] lg:leading-[50px] text-center text-white pb-[1.5vh] uppercase">
          Lassen Sie uns sprechen
        </h2>
        <p ref={paraRef} className="font-normal text-[16px] md:text-[18px] xl:text-[20px] leading-[24px] xl:leading-[25px] text-center max-w-[824px] mx-auto text-white/80">
          Gemeinsam finden wir die passende IT-Lösung für Ihr Unternehmen. Wir
          freuen uns auf Ihre Nachricht und beraten Sie gerne unverbindlich.
        </p>

        {/* Height ab har breakpoint pe explicit hai; items-stretch se dono children usi height tak stretch hote hain */}
        <div className="flex flex-col md:flex-row overflow-hidden justify-around items-stretch gap-8 mt-[3vh] md:mt-[5vh] h-auto md:max-h-[830px] lg:max-h-[790px] xl:max-h-[777px]">
          {/* Left: Form card — width ab md aur lg dono par explicit hai */}
          <div
            ref={formWrapRef}
            className="relative overflow-hidden w-full md:w-[344px] lg:w-[456px] xl:w-[680px] shrink-0 bg-[#03060F] border border-white/50 rounded-[24px]"
          >
            {/* Blur decorative images — corners se absolute pin, resize pe bhi position fix rehti hai */}
            <img
              src="/bg-glow-top.svg"
              alt=""
              aria-hidden
              className="pointer-events-none select-none absolute -top-10 -left-10 w-[280px] h-[280px] z-0"
            />
            <img
              src="/bg-glow-right.svg"
              alt=""
              aria-hidden
              className="pointer-events-none select-none absolute bottom-30 -right-10 w-[320px] h-[320px] z-0"
            />

            <div className="relative z-10 h-full p-7 sm:p-[35px]">
              <div className="flex items-center gap-2 mb-[20px]">
                <span className="w-4 h-[5px] rounded-2xl bg-[#0066FF]" />
                <span className="text-[#0066FF] font-bold text-[10px] xl:text-[12px] tracking-[1.5px] uppercase">
                  Kontaktformular
                </span>
              </div>
              <h3 className="font-bold text-[25px] xl:text-[32px] text-white leading-[40px]">
                Jetzt unverbindlich anfragen
              </h3>
              <p className="text-[#94A3B8] text-[12px] xl:text-[14px] mt-2 mb-3">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                  <div>
                    <label className="block text-white text-[14px] xl:text-[16px] font-semibold mb-1.5">Vorname *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Ihr Vorname"
                      className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-[#475569] text-[12px] xl:text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-[14px] xl:text-[16px] font-semibold mb-1.5">Nachname *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Ihr Nachname"
                      className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-[#475569] text-[12px] xl:text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                  <div>
                    <label className="block text-white text-[14px] xl:text-[16px] font-semibold mb-1.5">E-Mail-Adresse *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre@email.de"
                      className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-[#475569] text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-[14px] xl:text-[16px] font-semibold mb-1.5">Telefonnummer</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+49 123 456 7890"
                      className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-[#475569] text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-[14px] xl:text-[16px] font-semibold mb-1.5">Unternehmen</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Name Ihres Unternehmens"
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-[#475569] text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white text-[14px] xl:text-[16px] font-semibold mb-1.5">Betreff *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-[#E2E8F0] text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="" className="bg-[#060B1F]">Bitte auswählen</option>
                    <option value="fieldservice" className="bg-[#060B1F]">Fieldservice und Vor Ort Support</option>
                    <option value="netzwerk" className="bg-[#060B1F]">Netzwerk und WLAN</option>
                    <option value="rollout" className="bg-[#060B1F]">Rollouts und Workplace</option>
                    <option value="sonstiges" className="bg-[#060B1F]">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-[14px] xl:text-[16px] font-semibold mb-1.5">Ihre Nachricht</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Schreiben Sie uns Ihr Anliegen ..."
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-[#475569] text-[14px] focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <label className="flex items-start gap-3 text-[#94A3B8] text-[10px] xl:text-[12px] cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#0066FF]"
                  />
                  <span>
                    Ich habe die{" "}
                    <a href="/datenschutz" className="text-[#0066FF] underline">Datenschutzerklärung</a>{" "}
                    gelesen und stimme der Verarbeitung meiner Daten zu. *
                  </span>
                </label>

                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={status === "loading"}
                  onMouseEnter={handleButtonEnter}
                  onMouseLeave={handleButtonLeave}
                  className="button relative overflow-hidden font-semibold text-[14px] xl:text-[16px] w-full h-[40px] xl:h-[56px] mt-1 disabled:opacity-60"
                  style={{ transform: "scale(1)" }}
                >
                  <span
                    ref={shineRef}
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{ transform: "translateX(-150%)" }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "loading" ? "Wird gesendet..." : "Nachricht senden"}
                    {status !== "loading" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    )}
                  </span>
                </button>

                {status === "success" && (
                  <p className="text-green-400 text-[10px] xl:text-[12px] text-center -mt-1.5">
                    Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-400 text-[10px] xl:text-[12px] text-center -mt-1.5">{errorMsg}</p>
                )}
              </form>
            </div>
          </div>

          {/* Right: Image — width ab md/lg pe explicit hai (form ke barabar), xl pe flex-1 se remaining space fill karta hai */}
          <div
            ref={imageWrapRef}
            className="w-full md:w-[344px] lg:w-[456px] xl:w-auto xl:flex-1 rounded-[24px] overflow-hidden"
          >
            <img
              ref={imageRef}
              src="/contact.png"
              alt="Kontakt Team"
              className="w-full h-full min-h-[300px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;