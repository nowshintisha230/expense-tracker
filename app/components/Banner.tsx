"use client";

import { useEffect, useRef, useState } from "react";

const STATES = [
  { val: "$842", delta: "↑ 23% vs last month", tip: "On track this week" },
  { val: "$910", delta: "↑ 31% vs last month", tip: "Best month yet!" },
  { val: "$764", delta: "↑ 18% vs last month", tip: "$42 under budget" },
];

export default function Banner() {
  const [idx, setIdx] = useState(0);
  const [valColor, setValColor] = useState("#1A1A2E");

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % STATES.length;
        setValColor("#2251CC");
        setTimeout(() => setValColor("#1A1A2E"), 500);
        return next;
      });
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const current = STATES[idx];

  return (
    <>
      <style>{`
        .banner-wrapper {
          font-family: 'DM Sans', 'Inter', sans-serif;
          background: #F8F9FF;
          border-radius: 16px;
          padding: 28px 32px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 32px;
          width: 100%;
          box-sizing: border-box;
        }
        .banner-left {
          flex: 1;
          min-width: 0;
        }
        .banner-headline {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 28px;
          line-height: 1.15;
          font-weight: 400;
          color: #1A1A2E;
          margin-bottom: 10px;
        }
        .banner-blue {
          font-style: italic;
          color: #2251CC;
        }
        .banner-yellow {
          color: #C8920A;
        }
        .banner-sub {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.7;
          color: #8888AA;
          max-width: 280px;
          margin: 0;
        }
        .banner-right {
          width: 190px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .banner-card {
          background: #fff;
          border: 1px solid #E8EAF6;
          border-radius: 14px;
          padding: 14px 16px;
        }
        .banner-card-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #BCBCD8;
          margin-bottom: 6px;
        }
        .banner-card-value {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 26px;
          font-weight: 400;
          margin-bottom: 3px;
          transition: color 0.4s;
        }
        .banner-card-delta {
          font-size: 11px;
          font-weight: 500;
          color: #2251CC;
        }
        .banner-tip {
          background: #FFFBEC;
          border: 1px solid #F0DF97;
          border-radius: 14px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .banner-tip-text {
          font-size: 11px;
          font-weight: 500;
          color: #9A7A10;
        }
        .banner-tip-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #F7C948;
          flex-shrink: 0;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .banner-wrapper {
            padding: 24px 24px;
            gap: 20px;
          }
          .banner-headline {
            font-size: 24px;
          }
          .banner-right {
            width: 170px;
          }
        }

        /* Mobile */
        @media (max-width: 520px) {
          .banner-wrapper {
            flex-direction: column;
            align-items: flex-start;
            padding: 22px 20px;
            gap: 18px;
            border-radius: 14px;
          }
          .banner-left { width: 100%; }
          .banner-headline { font-size: 22px; margin-bottom: 8px; }
          .banner-sub { font-size: 12px; max-width: 100%; }
          .banner-right {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 8px;
          }
          .banner-card { flex: 1; min-width: 130px; }
          .banner-tip  { flex: 1; min-width: 130px; }
        }
      `}</style>

      <div className="banner-wrapper">
        <div className="banner-left">
          <div className="banner-headline">
            <span>Know where your money </span>
            <span className="banner-blue">goes.</span>
            <br />
            <span className="banner-yellow">Keep more of it.</span>
          </div>
          <p className="banner-sub">
            Simple expense tracking for real life — no clutter, just clarity.
          </p>
        </div>

        <div className="banner-right">
          <div className="banner-card">
            <div className="banner-card-label">Saved this month</div>
            <div className="banner-card-value" style={{ color: valColor }}>
              {current.val}
            </div>
            <div className="banner-card-delta">{current.delta}</div>
          </div>

          <div className="banner-tip">
            <PulsingDot />
            <span className="banner-tip-text">{current.tip}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function PulsingDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dotRef.current;
    if (!el) return;
    let frame: number;
    let start: number | null = null;

    function animate(ts: number) {
      if (!start) start = ts;
      const t = ((ts - start) % 2000) / 2000;
      const scale = 1 + 0.5 * Math.sin(t * Math.PI * 2);
      const opacity = 0.5 + 0.5 * Math.abs(Math.cos(t * Math.PI));
      if (el) {
        el.style.transform = `scale(${scale})`;
        el.style.opacity = String(opacity);
      }
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div ref={dotRef} className="banner-tip-dot" />;
}