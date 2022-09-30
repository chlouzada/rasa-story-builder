import React from 'react';
import { useDraggable } from '@dnd-kit/core';
1;
type Data = {
  type: 'ACTIONS' | 'NLU';
  name: string;
};

type DraggableProps = {
  id: string;
  children: React.ReactNode;
  data?: Data;
};

export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    ...props,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}
