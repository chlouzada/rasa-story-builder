import React, { createRef, useEffect, useId, useRef, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useStoryStore } from '../stores/story';
import { Draggable } from './Draggable';
import autoAnimate from '@formkit/auto-animate';

const AnimatedList: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current &&
      autoAnimate(ref.current, {
        duration: 250,
      });
  }, [ref]);
  return <div ref={ref}>{children}</div>;
};

type DroppableProps = {
  id: string;
  children: React.ReactNode;
};

const Droppable: React.FC<DroppableProps> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  // const style = {
  //   opacity: isOver ? 1 : 0.5,
  // };

  return (
    <div
      ref={setNodeRef}
      // style={{ ...style }}
      className="flex flex-col grow min-h-full"
    >
      <AnimatedList>{props.children}</AnimatedList>
    </div>
  );
};

const StoryItem: React.FC<{ name: string; index: number }> = ({
  name,
  index,
}) => {
  const id = useId();
  return (
    <Draggable id={`${index}-${id}`}>
      <div className="m-2 p-2 border-primary border">
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
        {steps.map((step, index) => (
          <StoryItem {...step} index={index} />
        ))}
        <ScrollToBottom />
      </Droppable>
    </div>
  );
};
