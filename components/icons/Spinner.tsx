const Spinner = ({
    size = 24,
    stroke = "#FFFFFF",
    strokeWidth = 2,
    speed = 1.2,
}: {
    size?: number;
    stroke?: string;
    strokeWidth?: number;
    speed?: number;
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            animation: `spin ${speed}s linear infinite`,
        }}
    >
        <circle
            cx="12"
            cy="12"
            r="10"
            strokeOpacity="0.25"
        />
        <path
            d="M22 12a10 10 0 0 1-10 10"
            strokeOpacity="0.75"
        />
        <style>
            {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        svg {
          transform-origin: center;
        }
      `}
        </style>
    </svg>
);

export default Spinner;

