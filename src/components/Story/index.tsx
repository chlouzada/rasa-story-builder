import React, { useEffect, useRef, useState } from "react";
import { useActions } from "../../contexts/ActionsContext";
import { useNlu } from "../../contexts/NluContext";
import { useStoryBuilder } from "../../contexts/StoryBuilderContext";
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

  const { steps, addStep } = useStoryBuilder();

  const stepsRef = useRef<HTMLDivElement>(null);

  const { nlu } = useNlu();
  const { actions } = useActions();

  return (
    <div className="flex flex-col h-full">
      <input
        type="text"
        name="Story Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div ref={stepsRef} className="flex flex-col h-full overflow-auto">
        {steps.map((step, index) => {
          console.log(typeof step);

          console.log("mapping to ", step, index);
          return <div>a</div>;
        })}
        <AlwaysScrollToBottom />
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => addStep(actions.reponses?.[0]!)}
          text="Add Action"
          type="secondary"
        />
        <Button onClick={() => addStep(nlu.intents?.[0]!)} text="Add Intent" />
      </div>
    </div>
  );
}
