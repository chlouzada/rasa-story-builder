import React, {useEffect, useId, useRef } from 'react';
import { useStoryStore } from '../stores/story';
import { Draggable } from './Draggable';
import classNames from 'classnames';
import { Droppable } from './Droppable';

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

const ScrollToBottom = () => {
  const { steps } = useStoryStore();
  const ref = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'auto' });
  }, []);
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [steps]);
  return <div ref={ref} />;
};

export const StoryView = ({ className }: { className?: string }) => {
  const { steps } = useStoryStore();
  return (
    <div className={`${className} overflow-auto`}>
      <Droppable id="story-container">
        {steps.map((step, index) => {
          return <StepItem {...step} index={index} />;
        })}
        <ScrollToBottom />
      </Droppable>
    </div>
  );
};
