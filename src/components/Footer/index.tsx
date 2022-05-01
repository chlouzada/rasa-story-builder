import React from "react";
import { Footer as MantineFooter } from "@mantine/core";

export default function Footer() {
  return (
    <MantineFooter height={60} p="md" className="bg-secondary">
      <div className=" flex items-center justify-center h-full font-bold text-white">
        2022
      </div>
    </MantineFooter>
  );
}
