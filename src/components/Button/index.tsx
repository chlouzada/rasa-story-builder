import React from "react";

export default function Button({
  text,
  onClick,
  className,
  disabled,
  type,
}: {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: "primary" | "secondary";
}) {
  const typeClass = () => {
    switch (type) {
      case "primary":
        return "text-white bg-blue-700 hover:bg-blue-800";
      case "secondary":
        return "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700";
      default:
        return "text-white bg-blue-700 hover:bg-blue-800";
    }
  };

  return (
    <button
      type="button"
      className={
        `font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ` +
        typeClass() +
        ` ` +
        className
      }
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
