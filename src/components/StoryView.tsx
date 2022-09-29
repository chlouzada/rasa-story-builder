import React from 'react';
import { useDroppable } from '@dnd-kit/core';

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

export const StoryView = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={className}>
      <h2>Story Container</h2>
      <Droppable id="story-container">a</Droppable>
    </div>
  );
};
