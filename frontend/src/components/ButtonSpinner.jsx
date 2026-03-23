export default function ButtonSpinner({ size = 5, color = "white" }) {
  const h = `${size}rem`;
  const w = `${size}rem`;
  return (
    <svg
      className="animate-spin"
      style={{ height: h, width: w }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}