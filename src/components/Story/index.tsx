import React, { useEffect, useRef, useState } from "react";
import { useNlu } from "../../contexts/NluContext";
import Action from "../Action";
import Button from "../Button";
import Intent from "../Intent";
// import Steps from "../Steps";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => elementRef.current!.scrollIntoView());
  return <div ref={elementRef} />;
};

export default function Story() {
  const [name, setName] = useState("");
  const [steps, setSteps] = useState<JSX.Element[]>([]);

  const stepsRef = useRef<HTMLDivElement>(null);

  const { nlu } = useNlu();

  const addIntent = () => {
    const randomIntent =
      nlu.intents[Math.floor(Math.random() * nlu.intents.length)];

    setSteps([...steps, <Intent name={randomIntent.name} />]);
  };
  const addAction = () => {
    setSteps([...steps, <Action />]);
  };

  // useEffect(() => {
  //   // stepsRef.current!.scrollTop = stepsRef.current!.scrollHeight;
  // }, [steps]);

  return (
    <div className="flex flex-col h-full">
      <input
        type="text"
        name="Story Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div ref={stepsRef} className="flex flex-col h-full overflow-auto">
        {steps}
        <AlwaysScrollToBottom />
      </div>

      <div className="flex justify-center">
        <Button onClick={addAction} text="Add Action" />
        <Button onClick={addIntent} text="Add Intent" type="secondary" />
      </div>
    </div>
  );
}
