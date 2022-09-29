import React, { createRef, useEffect, useRef, useState } from 'react';
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
    <div ref={setNodeRef} style={{ ...style }} className="flex flex-col grow">
      {props.children}
    </div>
  );
};

const StoryItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="m-2 p-2 border-primary border">
      <p>{name}</p>
    </div>
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
        {steps.map((step) => (
          <StoryItem {...step} />
        ))}
        <ScrollToBottom />
      </Droppable>
    </div>
  );
};