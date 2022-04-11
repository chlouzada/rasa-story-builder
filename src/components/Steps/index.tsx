import React, { useState } from "react";
import Action from "../Action";
import Button from "../Button";
import Intent from "../Intent";

export default function Steps({addAction, addIntent, steps, setSteps}: { addAction: () => void, addIntent: () => void, steps: any, setSteps: any }) {
  return (
    <div className="flex flex-col h-full overflow-auto">
      {steps}
    </div>
  );
}
