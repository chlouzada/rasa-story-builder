import React from 'react';
import { useStoryStore } from '../stores/story';
import { Droppable } from './Droppable';
import { ScrollToBottom } from './ScrollToBottom';
import userIntentSvg from '../assets/user_intent.svg';
import assistantActionSvg from '../assets/assistant_action.svg';
import { useIntentsStore } from '../stores/intents';
import { useActionsStore } from '../stores/actions';

const StepItem: React.FC<{
  index: number;
  name: string;
  type: 'INTENT' | 'ACTION';
}> = ({ index, name, type }) => {
  const { removeStep, showContent } = useStoryStore();
  const { intents } = useIntentsStore();
  const { actions } = useActionsStore();

  let text = name;

  if (showContent) {
    if (type === 'INTENT') {
      const intent = intents.find((intent) => intent.name === name);
      if (intent) {
        text =
          intent.examples[Math.floor(Math.random() * intent.examples.length)];
      }
    } else {
      const isCustomAction = !!actions.customActions.find(
        (action) => action.name === name
      );
      if (!isCustomAction) {
        const responses = actions.responses;
        const action = responses.find((action) => action.name === name);
        if (action) {
          const random =
            action.texts[Math.floor(Math.random() * action.texts.length)];
          if (typeof random === 'string') text = random;
          else text = (random as any).text as string;
        }
      }
    }
  }

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
        {text}
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
