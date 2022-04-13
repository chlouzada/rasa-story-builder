import React from "react";

export default function Intent({ name }: { name: string }) {
  return (
    <div className="w-full">
      <div className="float-right w-fit z-50">Intent - {name}</div>
    </div>
  );
}
