import { type ReactElement } from "react";

interface OneSmileLabLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function OneSmileLabLogo({ 
  className = "", 
  size = "md" 
}: OneSmileLabLogoProps): ReactElement {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`${sizeClasses[size]} ${className} one-smile-logo`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle - light yellow with golden border */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="#FFFACD"
          stroke="#FFD700"
          strokeWidth="1.5"
        />
        
        {/* Straw Hat */}
        <g transform="translate(15, 12)">
          {/* Hat Crown - golden yellow */}
          <ellipse
            cx="35"
            cy="18"
            rx="28"
            ry="14"
            fill="#FFD700"
            stroke="#DAA520"
            strokeWidth="1"
          />
          {/* Hat Brim */}
          <ellipse
            cx="35"
            cy="28"
            rx="32"
            ry="6"
            fill="#FFFACD"
            stroke="#FFD700"
            strokeWidth="1"
          />
          {/* Hat Band - darker brown */}
          <ellipse
            cx="35"
            cy="22"
            rx="25"
            ry="2"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="0.5"
          />
        </g>

        {/* Tooth Body - white with subtle shading */}
        <g transform="translate(35, 35)">
          {/* Main Tooth Shape - white with beige shading */}
          <ellipse
            cx="15"
            cy="15"
            rx="12"
            ry="18"
            fill="#FFFFFF"
            stroke="#F5F5DC"
            strokeWidth="1"
          />
          
          {/* Tooth shading for 3D effect */}
          <ellipse
            cx="15"
            cy="15"
            rx="10"
            ry="16"
            fill="#FFFACD"
            opacity="0.3"
          />
          
          {/* Happy Eyes - small black ovals, slightly upturned */}
          <ellipse
            cx="12"
            cy="10"
            rx="1.5"
            ry="1"
            fill="#000000"
            transform="rotate(-10 12 10)"
          />
          <ellipse
            cx="18"
            cy="10"
            rx="1.5"
            ry="1"
            fill="#000000"
            transform="rotate(10 18 10)"
          />
          
          {/* Happy Smile - simple black line */}
          <path
            d="M10 16 Q15 19 20 16"
            stroke="#000000"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Tooth Roots - short, stubby legs */}
        <g transform="translate(35, 53)">
          <ellipse
            cx="12"
            cy="8"
            rx="3"
            ry="6"
            fill="#696969"
            stroke="#2F2F2F"
            strokeWidth="0.5"
          />
          <ellipse
            cx="18"
            cy="8"
            rx="3"
            ry="6"
            fill="#696969"
            stroke="#2F2F2F"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    </div>
  );
}
