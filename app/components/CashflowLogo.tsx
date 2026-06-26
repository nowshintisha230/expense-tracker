export default function CashflowLogo({ size = 28 }: { size?: number }) {
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