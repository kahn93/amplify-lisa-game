import React from "react";

interface ProgressBarProps {
  value: number; // Progress value as a percentage (0-100)
  color?: string; // Optional color for the progress bar
  animated?: boolean; // Optional animation flag for smooth transitions
  label?: boolean; // Optional flag to display progress percentage as a label
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "bg-green-500",
  animated = false,
  label = false,
}) => {
  return (
    <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden relative">
      <div
        className={`${color} h-full ${animated ? "transition-all duration-500" : ""
          }`}
        style={{ width: `${value}%` }}
        aria-label={`Progress: ${value}%`}
      ></div>
      {label && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
          {value}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
