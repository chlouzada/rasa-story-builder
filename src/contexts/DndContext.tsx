import { useState } from 'react';
import { useStoryStore } from '../stores/story';
import {
  DndContext as DndKitContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';

// TODO: translate initial position to the cursor]
// TODO: style
const Widget = ({ name, x, y }: { name: string; x: number; y: number }) => {
  return (
    <div className="w-12">
      <p>{name}</p>
    </div>
  );
};

export const DndContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useStoryStore();
  const [widget, setWidget] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over: isOver } = event;

    if (String(active.id).split('-').length === 2) {
      if (isOver) {
        // TODO: move step
        return;
      }

      const [index] = String(active.id).split('-');
      store.removeStep(Number(index));
      return;
    }

    if (isOver)
      store.addStep({
        name: event.active.data.current?.name,
        type: event.active.data.current?.type,
      });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setWidget({ name: event.active.data.current?.name, x: 0, y: 0 });
  };

  return (
    <DndKitContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setWidget(null)}
    >
      {children}
      <DragOverlay dropAnimation={null}>
        {widget && <Widget {...widget} />}
      </DragOverlay>
    </DndKitContext>
  );
};
