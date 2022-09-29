import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type Data = {
  type: 'ACTIONS' | 'NLU';
  name: string;
};

type DraggableProps = {
  id: string;
  children: React.ReactNode;
  data: Data;
};

export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    ...props,
  });
  // const style = {
  //   // Outputs `translate3d(x, y, 0)`
  //   transform: CSS.Translate.toString(transform),
  // };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}
