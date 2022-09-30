import React, { useId } from 'react';
import { useStoryStore } from '../stores/story';
import { Draggable } from './Draggable';
import classNames from 'classnames';
import { Droppable } from './Droppable';
import { ScrollToBottom } from './ScrollToBottom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';


const StepItem: React.FC<{
  index: number;
  name: string;
  type: 'INTENT' | 'ACTION';
}> = ({ index, name, type }) => {
  const id = useId();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Item
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className={classNames('m-2 p-2 border-primary border', {
        'text-end': type === 'INTENT',
      })}
    >
      <p>{name}</p>
    </Item>
  );
};

export const StoryView = ({ className }: { className?: string }) => {
  const { steps } = useStoryStore();
  return (
    <div className={`${className} overflow-auto`}>
      <Droppable id="story-container">
        {steps.map((step, index) => {
          return <StepItem key={`step-${index}}`} {...step} index={index} />;
        })}
        <ScrollToBottom />
      </Droppable>
    </div>
  );
};
