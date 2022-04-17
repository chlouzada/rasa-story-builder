import React, { useRef, useState } from "react";
import { useNlu } from "../../contexts/NluContext";
import Action from "../Action";
import Button from "../Button";
import Intent from "../Intent";
import Steps from "../Steps";

export default function Story() {
  const [name, setName] = useState("");
  const [steps, setSteps] = useState<JSX.Element[]>([]);

  const stepsRef = React.useRef<HTMLDivElement>(null);

  const { nlu } = useNlu();

  const addIntent = () => {
    const randomIntent =
      nlu.intents[Math.floor(Math.random() * nlu.intents.length)];

    setSteps([...steps, <Intent name={randomIntent.name} />]);

    stepsRef.current!.scrollTop = stepsRef.current!.scrollHeight - 1 || 0;
  };
  const addAction = () => {
    setSteps([...steps, <Action />]);
    const story = document.getElementById("steps-div");
    story!.scrollTop = story!.scrollHeight + 1;
  };

  return (
    <div className="flex flex-col h-full">
      <input
        type="text"
        name="Story Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div
        ref={stepsRef}
        id="steps-div"
        className="flex flex-col h-full overflow-auto"
      >
        {steps}
      </div>

      <div className="flex justify-center">
        <Button onClick={addAction} text="Add Action" />
        <Button onClick={addIntent} text="Add Intent" type="secondary" />
      </div>
    </div>
  );
}
