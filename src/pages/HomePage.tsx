import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Story from "../components/Story";
import parser from "../utils/parser";

export default function HomePage() {
  return (
    <div className="h-full">
      <Story />
    </div>
  );
}
