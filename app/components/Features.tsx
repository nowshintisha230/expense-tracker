"use client";

type IconProps = { d: string };

function FeatureIcon({ d }: IconProps) {
  return (
    <div style={s.iconBox}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={d} stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const FEATURES = [
  {
    icon: "M4 17l4-4 3 3 6-8 3 3",
    title: "Expense tracking",
    text: "Log a purchase in seconds. It's sorted, categorized, and added to your totals automatically.",
  },
  {
    icon: "M12 3v4M12 17v4M3 12h4M17 12h4M7 7l2.5 2.5M14.5 14.5 17 17M17 7l-2.5 2.5M9.5 14.5 7 17",
    title: "Smart budgets",
    text: "Set a monthly limit per category and get a gentle nudge before you're close to going over.",
  },
  {
    icon: "M4 21V10M4 10l8-7 8 7M4 10h16v11H4z",
    title: "Savings goals",
    text: "Name what you're saving for, set a target, and watch your progress fill in as you go.",
  },
  {
    icon: "M3 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3zM16 12h4",
    title: "Multi-account",
    text: "Bank, mobile wallet, or cash — bring every account into one balance you can trust.",
  },
  {
    icon: "M4 19V13M10 19V5M16 19v-9M22 19h-1",
    title: "Visual insights",
    text: "Monthly trends, category breakdowns, and totals — laid out clearly, never overwhelming.",
  },
  {
    icon: "M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Z",
    title: "Private by default",
    text: "Your data is encrypted and never sold. No ads, no trackers — it's just for you.",
  },
];

export default function Features() {
  return (
    <div style={s.wrapper}>
      {/* Header */}
      <div style={s.head}>
        <div style={s.title}>
          Everything you need,{" "}
          <em style={s.italic}>nothing you don't.</em>
        </div>
        <p style={s.subtext}>
          FinSight keeps the essentials close and the noise away — six tools
          that cover how people actually manage money day to day.
        </p>
      </div>

      {/* Grid */}
      <div style={s.grid}>
        {FEATURES.map((f) => (
          <div key={f.title} style={s.card}>
            <FeatureIcon d={f.icon} />
            <div style={s.cardTitle}>{f.title}</div>
            <p style={s.cardText}>{f.text}</p>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={s.row}>
        <div style={s.pills}>
          {["Web & mobile", "Bank-level encryption", "Free forever plan"].map((p) => (
            <span key={p} style={s.pill}>{p}</span>
          ))}
        </div>
        <div style={s.stats}>
          {[
            { val: "6", lbl: "Core tools" },
            { val: "0", lbl: "Ads, ever" },
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
    padding: "32px 32px 28px",
    width: "100%",
    boxSizing: "border-box",
  },
  head: {
    marginBottom: 28,
    maxWidth: 520,
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 20,
    fontWeight: 400,
    color: "#1A1A2E",
    marginBottom: 10,
    lineHeight: 1.35,
  },
  italic: {
    fontStyle: "italic",
    color: "#2251CC",
  },
  subtext: {
    fontSize: 13,
    fontWeight: 300,
    lineHeight: 1.75,
    color: "#8888AA",
    margin: 0,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 16,
    marginBottom: 24,
  },
  card: {
    flex: "1 1 260px",
    minWidth: 220,
    background: "#F8F9FF",
    border: "1px solid #E8EAF6",
    borderRadius: 12,
    padding: "18px 18px 16px",
    boxSizing: "border-box",
    transition: "border-color .2s ease, background .2s ease",
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    background: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 13.5,
    fontWeight: 500,
    color: "#1A1A2E",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 12.5,
    fontWeight: 300,
    lineHeight: 1.65,
    color: "#8888AA",
    margin: 0,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap" as const,
    paddingTop: 20,
    borderTop: "1px solid #E8EAF6",
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