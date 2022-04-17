import React from "react";

export default function ButtonOverlay({
  left,
  right,
}: {
  left: () => void;
  right: () => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.id === "left") {
      left();
    } else {
      right();
    }
  };

  return (
    <div className="flex absolute inset-0 z-30" onClick={(e) => handleClick(e)}>
      <div className="bg-red-200 w-1/2 opacity-10"></div>
      <div className="bg-blue-200 w-1/2  opacity-10">a</div>
    </div>
  );
}
