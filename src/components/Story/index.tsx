import React, { useEffect, useRef, useState } from "react";
import { ActionTypeEnum, useActions } from "../../contexts/ActionsContext";
import { NluTypeEnum, useNlu } from "../../contexts/NluContext";
import { useStoryBuilder } from "../../contexts/StoryBuilderContext";
import Action from "../Action";
import Button from "../Button";
import Intent from "../Intent";

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

  const handleAddActionStep = () => {
    console.log("action é ", actions);
    addStep(actions.responses?.[0]!);
  };

  const handleAddIntentStep = () => {
    console.log("o intent é", nlu.intents?.[0]!);
    addStep(nlu.intents?.[0]!);
  };

  return (
    <div className="flex flex-col h-full">
      <input
        type="text"
        name="Story Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div ref={stepsRef} className="flex flex-col h-full overflow-auto">
        {steps.map((step) => {
          if (step.type === NluTypeEnum.INTENT)
            return <Intent name={step.name} />;

          return <Action />;
        })}
        <AlwaysScrollToBottom />
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleAddActionStep}
          text="Add Action"
          type="secondary"
        />
        <Button onClick={handleAddIntentStep} text="Add Intent" />
      </div>
    </div>
  );
}
