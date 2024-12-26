import { Droplet } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "horizontal" | "vertical";
}

const SIZES = {
  sm: {
    icon: "w-8 h-8",
    text: "text-lg",
    subtext: "text-sm",
  },
  md: {
    icon: "w-12 h-12",
    text: "text-2xl",
    subtext: "text-lg",
  },
  lg: {
    icon: "w-16 h-16",
    text: "text-4xl",
    subtext: "text-xl",
  },
};

export function Logo({ className = "", size = "md", variant = "horizontal" }: LogoProps) {
  const sizeClasses = SIZES[size];
  const isVertical = variant === "vertical";

  return (
    <div className={`flex ${isVertical ? "flex-col" : "flex-row"} items-center gap-3 ${className}`}>
      <div className={`relative ${sizeClasses.icon}`}>
        <div className="absolute inset-0 rotate-[15deg]">
          <Droplet className="w-full h-full" />
        </div>
      </div>
      <div className={`flex flex-col ${isVertical ? "text-center" : ""}`}>
        <span className={`font-medium leading-none ${sizeClasses.text}`}>
          Ink is Better
        </span>
        <span className={`text-gray-500 leading-tight ${sizeClasses.subtext}`}>
          than therapy
        </span>
      </div>
    </div>
  );
} 