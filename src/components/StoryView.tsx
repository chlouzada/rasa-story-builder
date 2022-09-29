import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useStoryStore } from '../stores/story';

type DroppableProps = {
  id: string;
  children: React.ReactNode;
};

const Droppable: React.FC<DroppableProps> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style} className="w-full h-full bg-red-400">
      {props.children}
    </div>
  );
};

const StoryItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="m-2 p-2 shadow-md">
      <p>{name}</p>
    </div>
  );
};

export const StoryView = ({ className }: { className?: string }) => {
  const { steps } = useStoryStore();

  return (
    <div className={className}>
      <h2>Story Container</h2>
      <Droppable id="story-container">
        {steps.map((step) => (
          <StoryItem {...step} />
        ))}
      </Droppable>
    </div>
  );
};
