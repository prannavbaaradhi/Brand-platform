"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./storefront-intro.module.css";

const shirt = "M86 36 L46 49 L14 104 L57 129 L72 104 L72 241 Q72 248 79 248 L181 248 Q188 248 188 241 L188 104 L203 129 L246 104 L214 49 L174 36 Q169 62 130 64 Q91 62 86 36 Z";
const colours = ["#527491", "#91abc0", "#ac575e", "#d99a9e"];

export function StorefrontIntro({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"fill" | "logo" | "exit" | "done">("fill");
  const [active, setActive] = useState(false);
  const waves = useRef<SVGGElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const clipId = useId();
  const done = phase === "done";

  useEffect(() => {
    if (done) return;
    setActive(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ready = document.readyState === "complete";
    const loaded = () => { ready = true; };
    window.addEventListener("load", loaded, { once: true });
    let frame = 0;
    let fill = 0;
    let logoAt: number | undefined;
    let logoShown = false;
    let exiting = false;
    const started = performance.now();
    let previous = started;
    const duration = reduced ? 250 : 3200;
    const paths = Array.from(waves.current?.querySelectorAll("path") ?? []);

    function tick(now: number) {
      const elapsed = now - started;
      const delta = now - previous;
      previous = now;
      // Hold below full until the document loads; never trap the visitor on slow assets.
      const target = ready || elapsed >= 8000 ? 1 : 0.9;
      fill = Math.min(target, fill + delta / duration);
      paths.forEach((path, index) => {
        const level = 270 - fill * 245 + index * 62;
        let d = `M -10 ${level}`;
        for (let x = -10; x <= 270; x += 4) {
          const y = level + (reduced ? 0 : 4 * Math.sin(x / 36 + elapsed / 650 + index * 0.9));
          d += ` L ${x} ${y.toFixed(2)}`;
        }
        path.setAttribute("d", `${d} L 270 290 L -10 290 Z`);
      });
      if (fill === 1 && logoAt === undefined) {
        logoAt = now + (reduced ? 0 : 250);
      }
      if (logoAt !== undefined && now >= logoAt) {
        if (!logoShown) {
          logoShown = true;
          setPhase("logo");
        }
        if (now >= logoAt + (reduced ? 350 : 1200) && !exiting) {
          exiting = true;
          setPhase("exit");
        }
        if (now >= logoAt + (reduced ? 350 : 1800)) {
          restoreFocus.current = document.activeElement === skip.current;
          setPhase("done");
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", loaded);
      document.body.style.overflow = previousOverflow;
    };
  }, [done]);

  useEffect(() => {
    if (done && restoreFocus.current) {
      content.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
    }
  }, [done]);

  return <>
    <noscript><style>{`.${styles.overlay}{display:none!important}`}</style></noscript>
    <div ref={content} inert={active && !done}>{children}</div>
    {!done && <div className={styles.overlay} data-phase={phase} aria-label="NO LABEL introduction">
      <div className={styles.fill} aria-hidden="true">
        <svg viewBox="0 0 260 280" className={styles.shirt}>
          <defs><clipPath id={clipId}><path d={shirt}/></clipPath></defs>
          <path d={shirt} fill="#3c3c35"/>
          <g ref={waves} clipPath={`url(#${clipId})`}>
            {colours.map(colour => <path key={colour} fill={colour} d="M0 280H260V290H0Z"/>)}
          </g>
        </svg>
        <span className={styles.caption}>COMING TO LIFE</span>
      </div>
      <div className={styles.logo} role="img" aria-label="NO LABEL — bracket and slash logo" aria-hidden={phase === "fill"}>
        <svg viewBox="0 0 292 218" className={styles.symbol} aria-hidden="true">
          <path fill="currentColor" d="M0 0H86V39H41V178H86V218H0ZM206 0H292V218H206V178H250V39H206ZM156 49H191L126 169H93Z"/>
        </svg>
        <span className={styles.wordmark}>NO LABEL</span>
      </div>
      <span className="sr-only" role="status">{phase === "fill" ? "Preparing the storefront" : "NO LABEL. Welcome."}</span>
      <button ref={skip} type="button" className={styles.skip} onClick={() => { restoreFocus.current = true; setPhase("done"); }}>Skip intro</button>
    </div>}
  </>;
}
