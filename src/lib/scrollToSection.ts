// lib/scrollToSection.ts
export const SCROLL_EXTRA_GAP = 20;

export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const headerEl = document.querySelector("header, section.fixed") as HTMLElement | null;
  const headerHeight = headerEl?.offsetHeight ?? 90;

  const targetY =
    el.getBoundingClientRect().top + window.scrollY - headerHeight - SCROLL_EXTRA_GAP;

  window.scrollTo({ top: targetY, behavior: "smooth" });
};