export default function Reviews() {
  const reviews: never[] = [];

  return (
    <>
      <style>{`
        .rv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 768px) {
          .rv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .rv-grid { grid-template-columns: 1fr; }
          .rv-head { flex-direction: column !important; align-items: flex-start !important; gap: 4px; }
        }
      `}</style>

      <div style={s.wrapper}>
        <div className="rv-head" style={s.head}>
          <div style={s.title}>
            What people are <em style={s.titleItalic}>saying</em>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div style={s.empty}>
            <div style={s.emptyIcon}>✦</div>
            <p style={s.emptyTitle}>No reviews yet</p>
            <p style={s.emptyText}>Reviews will appear here once customers share their experience.</p>
          </div>
        ) : (
          <div className="rv-grid">
            {/* dynamic cards will go here */}
          </div>
        )}
      </div>
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrapper: {
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    background: "#F8F9FF",
    borderRadius: 16,
    padding: "32px 28px",
    width: "100%",
    boxSizing: "border-box",
  },
  head: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 24,
    fontWeight: 400,
    color: "#1A1A2E",
    lineHeight: 1.1,
  },
  titleItalic: {
    fontStyle: "italic",
    color: "#2251CC",
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "34px 20px",
    border: "1px dashed #D6E0FF",
    borderRadius: 12,
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: 20,
    color: "#D6E0FF",
    marginBottom: 10,
  },
  emptyTitle: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 15,
    fontWeight: 400,
    color: "#1A1A2E",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 12,
    fontWeight: 300,
    color: "#ADADCC",
    maxWidth: 220,
    lineHeight: 1.6,
    margin: 0,
  },
};