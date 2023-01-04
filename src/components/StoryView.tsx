import React from 'react';
import { useStoryStore } from '../stores/story';
import { Droppable } from './Droppable';
import { ScrollToBottom } from './ScrollToBottom';
import userIntentSvg from '../assets/user_intent.svg';
import assistantActionSvg from '../assets/assistant_action.svg';

const StepItem: React.FC<{
  index: number;
  name: string;
  type: 'INTENT' | 'ACTION';
}> = ({ index, name, type }) => {
  const { removeStep } = useStoryStore();

  const getImageSrc = (type: any) => {
    const map: any = {
      INTENT: userIntentSvg,
      ACTION: assistantActionSvg,
    };
    return map[type];
  };

  return (
    <div
      className="relative flex justify-center"
      onClick={() => removeStep(index)}
    >
      <img src={getImageSrc(type)} alt="step" />
      <p className="absolute h-full flex flex-col justify-center text-2xl font">
        {name}
      </p>
    </div>
  );
};

export const StoryView = () => {
  const { steps } = useStoryStore();

  return (
    <Droppable id="story-container">
      {steps.map((step, index) => {
        return <StepItem key={`step-${index}}`} {...step} index={index} />;
      })}
      <ScrollToBottom />
    </Droppable>
  );
};
