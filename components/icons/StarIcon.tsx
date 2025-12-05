const StarIcon = ({ color = "#01BD82", size = 18, stroke = "#FFFFFF", strokeWidth = 0 }: { color?: string, size?: number, stroke?: string, strokeWidth?: number }) => (
    <svg
        height={size}
        width={size}
        stroke={stroke}
        strokeWidth={strokeWidth}
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9.48005 15.0687L13.8145 17.8074C14.6083 18.3093 15.5797 17.5674 15.3708 16.629L14.2219 11.4789L18.055 8.00906C18.7548 7.37621 18.3788 6.17596 17.4597 6.09958L12.415 5.65222L10.441 0.785772C10.0858 -0.0980445 8.87427 -0.0980445 8.51916 0.785772L6.54515 5.64131L1.50044 6.08867C0.581325 6.16505 0.205322 7.36529 0.905105 7.99815L4.73824 11.4679L3.58935 16.6181C3.38046 17.5565 4.3518 18.2984 5.14558 17.7965L9.48005 15.0687Z"
            fill={color}
        />
    </svg>
);

export default StarIcon;
