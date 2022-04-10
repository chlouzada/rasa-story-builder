import React, { useState } from "react";
import Action from "../Action";
import Intent from "../Intent";

export default function Steps() {
  const [steps, setSteps] = useState<JSX.Element[]>([]);

  const addIntent = () => {
    setSteps([...steps, <Intent />]);
  };
  const addAction = () => {
    setSteps([...steps, <Action />]);
  };

  return (
    <div>
      <div>
        <button onClick={addAction}>Action</button>
        <button onClick={addIntent}>Intent</button>
      </div>
      <div>{steps}</div>
    </div>
  );
}
