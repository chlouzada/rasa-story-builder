import React, { useId } from 'react';
import { useStoryStore } from '../stores/story';
import { Draggable } from './Draggable';
import classNames from 'classnames';
import { Droppable } from './Droppable';
import { ScrollToBottom } from './ScrollToBottom';

const StepItem: React.FC<{
  index: number;
  name: string;
  type: 'INTENT' | 'ACTION';
}> = ({ index, name, type }) => {
  const id = useId();
  return (
    <Draggable id={`${index}-${id}`} data={{ name, type }}>
      <div
        className={classNames('m-2 p-2 border-primary border', {
          'text-end': type === 'INTENT',
        })}
      >
        <p>{name}</p>
      </div>
    </Draggable>
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
