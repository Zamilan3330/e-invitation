"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [flipped, setFlipped] = useState(false);
  const [showPeek, setShowPeek] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const toggle = () => {
    setShowPeek(false);
    setFlipped((v) => !v);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x, y, active: true });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0, active: false });

  return (
    <div className="page-wrapper">
      <div className="page-bg" aria-hidden="true" />

      <main className="invitation-main">
        <div className="ornament" aria-hidden="true">
          <div className="ornament-line" />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M7 0L8.3 5.7L14 7L8.3 8.3L7 14L5.7 8.3L0 7L5.7 5.7L7 0Z" opacity="0.75" />
          </svg>
          <div className="ornament-line ornament-line--right" />
        </div>

        <div
          className="flip-card-wrapper"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            transform: `rotateX(${(-tilt.x * 14).toFixed(2)}deg) rotateY(${(tilt.y * 14).toFixed(2)}deg)`,
            transition: tilt.active
              ? "transform 80ms linear"
              : "transform 600ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={toggle}
            onKeyDown={onKeyDown}
            className="flip-card"
            aria-pressed={flipped}
            aria-label={flipped ? "Урд талыг харах" : "Арийн талыг харах"}
          >
            <div className={`flip-inner${flipped ? " is-flipped" : ""}${showPeek ? " peek-hint" : ""}`}>
              <div className="flip-sizer" aria-hidden="true" />
              <div className="flip-face">
                <Image
                  src="/Front_Side.png"
                  alt="Урилгын урд тал"
                  fill
                  style={{ objectFit: "contain" }}
                  draggable={false}
                  priority
                />
              </div>
              <div className="flip-face flip-back">
                <Image
                  src="/Back_side.png"
                  alt="Урилгын арийн тал"
                  fill
                  style={{ objectFit: "contain" }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="tap-hint">
          <span className="tap-dot" />
          <span>{flipped ? "Дахин дараад эргүүлнэ үү" : "Дараад эргүүлнэ үү"}</span>
          <span className="tap-dot" />
        </p>

        <div className="ornament" aria-hidden="true">
          <div className="ornament-line" />
          <span className="ornament-diamonds">◆ ◆ ◆</span>
          <div className="ornament-line ornament-line--right" />
        </div>
      </main>
    </div>
  );
}
