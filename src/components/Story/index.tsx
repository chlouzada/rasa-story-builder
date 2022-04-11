import React, { useState } from "react";
import Action from "../Action";
import Button from "../Button";
import Intent from "../Intent";
import Steps from "../Steps";

export default function Story() {
  const [name, setName] = useState("");
  const [steps, setSteps] = useState<JSX.Element[]>([]);

  const addIntent = () => {
    setSteps([...steps, <Intent />]);
  };
  const addAction = () => {
    console.log(12312);
    setSteps([...steps, <Action />]);
  };

  return (
    <div className="flex flex-col h-full">
      <input
        type="text"
        name="Story Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Steps
        addAction={addAction}
        addIntent={addIntent}
        steps={steps}
        setSteps={setSteps}
      />
      <div className="flex justify-center ">
        <Button onClick={addAction} text="Add Action" />
        <Button onClick={addIntent} text="Add Intent" type="secondary" />
      </div>
    </div>
  );
}
