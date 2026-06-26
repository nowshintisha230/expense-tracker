"use client";

function CashflowLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 116 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="110" height="110" rx="28" fill="white" stroke="#1D4ED8" strokeWidth="6"/>
      <rect x="8" y="8" width="100" height="100" rx="22" fill="#2563EB"/>
      <polyline
        points="24,76 40,76 52,84 68,40 92,28"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M82,22 L92,28 L86,38"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function About() {
  return (
    <div style={s.wrapper}>
      {/* Top */}
      <div style={s.top}>
        <CashflowLogo size={22} />
        <div style={s.title}>
          Simple finance tracking,{" "}
          <em style={s.italic}>built for real life.</em>
        </div>
      </div>

      {/* Body */}
      <p style={s.text}>
        FinSight helps you see where your money goes — no jargon, no clutter.
        Just calm, clear insights to help you spend smarter and save more.
      </p>

      {/* Bottom row */}
      <div style={s.row}>
        <div style={s.pills}>
          {["Expense tracking", "Budgets", "Savings goals", "No ads"].map((p) => (
            <span key={p} style={s.pill}>{p}</span>
          ))}
        </div>
        <div style={s.stats}>
          {[
            { val: "12k+", lbl: "Users" },
            { val: "4.9★", lbl: "Rating" },
          ].map((stat) => (
            <div key={stat.lbl} style={s.stat}>
              <div style={s.statVal}>{stat.val}</div>
              <div style={s.statLbl}>{stat.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrapper: {
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    background: "#fff",
    border: "1px solid #E8EAF6",
    borderRadius: 16,
    padding: "28px 32px",
    width: "100%",
    boxSizing: "border-box",
  },
  top: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 18,
    fontWeight: 400,
    color: "#1A1A2E",
  },
  italic: {
    fontStyle: "italic",
    color: "#2251CC",
  },
  text: {
    fontSize: 13,
    fontWeight: 300,
    lineHeight: 1.75,
    color: "#8888AA",
    marginBottom: 20,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap" as const,
  },
  pills: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 7,
  },
  pill: {
    fontSize: 11,
    fontWeight: 400,
    color: "#5A5A7A",
    background: "#F8F9FF",
    border: "1px solid #E8EAF6",
    borderRadius: 100,
    padding: "4px 12px",
  },
  stats: {
    display: "flex",
    gap: 20,
    flexShrink: 0,
  },
  stat: {
    textAlign: "right" as const,
  },
  statVal: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 17,
    fontWeight: 400,
    color: "#2251CC",
  },
  statLbl: {
    fontSize: 10,
    color: "#ADADCC",
    letterSpacing: 0.3,
  },
};