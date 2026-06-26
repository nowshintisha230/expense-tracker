export default function Footer() {
  const linkCols = [
    {
      heading: "Navigate",
      links: [
        { label: "Home", href: "/dashboard" },
        { label: "Review", href: "/transactions" },
        { label: "About", href: "/reports" },
      ],
    },
    {
      heading: "Account",
      links: [
        { label: "Sign in", href: "/signin" },
        { label: "Sign up", href: "/signup" },
      ],
    },
  ];

  return (
    <>
      <style>{`
        .ft-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 16px;
        }
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        @media (max-width: 768px) {
          .ft-top { grid-template-columns: 1fr 1fr; gap: 14px 12px; }
        }
        @media (max-width: 480px) {
          .ft-top { grid-template-columns: 1fr 1fr; gap: 14px 10px; }
        }
      `}</style>

      <footer style={s.wrapper}>
        <div className="ft-top" style={s.top}>
          <div>
            <div style={s.brand}>
              Fin<em style={s.brandItalic}>Sight</em>
            </div>
            <p style={s.tagline}>
              Finance & Insights
            </p>
          </div>

          {linkCols.map((col) => (
            <div key={col.heading}>
              <p style={s.colHeading}>{col.heading}</p>
              <ul style={s.linkList}>
                {col.links.map((link) => (
                  <li key={link.label} style={s.linkItem}>
                    <a href={link.href} style={s.link}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={s.divider} />

        <div style={s.bottom}>
          <p style={s.copy}>© {new Date().getFullYear()} FinSight. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrapper: {
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    background: "#1A1A2E",
    borderRadius: 14,
    padding: "22px 20px 16px",
    width: "100%",
    boxSizing: "border-box",
  },
  top: {
    marginBottom: 16,
  },
  brand: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 16,
    fontWeight: 400,
    color: "#F8F9FF",
    marginBottom: 6,
  },
  brandItalic: {
    fontStyle: "italic",
    color: "#7C96FF",
  },
  tagline: {
    fontSize: 11,
    fontWeight: 300,
    color: "#ADADCC",
    maxWidth: 200,
    lineHeight: 1.5,
    margin: 0,
  },
  colHeading: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: "#7C7C9E",
    margin: "0 0 8px",
  },
  linkList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  linkItem: {
    fontSize: 12,
  },
  link: {
    color: "#D6E0FF",
    textDecoration: "none",
  },
  divider: {
    height: 1,
    background: "rgba(214, 224, 255, 0.14)",
    marginBottom: 12,
  },
  bottom: {},
  copy: {
    fontSize: 11,
    fontWeight: 300,
    color: "#7C7C9E",
    margin: 0,
  },
};