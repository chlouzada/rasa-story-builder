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
  data?: Data;
  shrink?: true;
};

export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform,isDragging } = useDraggable({
    ...props,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    // transform: CSS.Translate.toString(transform),
    width: props.shrink && isDragging ? 'fit-content' : '100%',
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {props.children}
    </div>
  );
}
