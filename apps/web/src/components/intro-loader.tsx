"use client";

import { useEffect, useState } from "react";

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const started = performance.now();
    const duration = 4400;
    let raf = 0;
    let leaveTimer: number | undefined;

    function tick(now: number) {
      const elapsed = now - started;
      const eased = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3);
      setProgress(Math.round(eased * 100));

      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        leaveTimer = window.setTimeout(onDone, 700);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (leaveTimer !== undefined) {
        window.clearTimeout(leaveTimer);
      }
    };
  }, [onDone]);

  return (
    <div className={`intro ${leaving ? "intro--leaving" : ""}`}>
      <div className="intro-bg" aria-hidden>
        <div className="intro-blob intro-blob--a" />
        <div className="intro-blob intro-blob--b" />
        <div className="intro-blob intro-blob--c" />
      </div>

      <div className="intro-content">
        <p className="intro-eyebrow">Premium technology</p>

        <h1 className="intro-title" aria-label="Tachyon">
          Tachyon
        </h1>

        <div className="intro-rule" aria-hidden />

        <p className="intro-sub">Webstore</p>

        <div className="intro-progress">
          <div className="intro-progress-track">
            <div
              className="intro-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="intro-progress-value">{progress}</span>
        </div>
      </div>
    </div>
  );
}
