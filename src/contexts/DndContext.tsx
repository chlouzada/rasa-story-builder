import { useState } from 'react';
import { useStoryStore } from '../stores/story';
import {
  DndContext as DndKitContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';

export const DndContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useStoryStore();
  const [activeId, setActiveId] = useState<string | null>(null);

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

    if (isOver) store.addStep({ name: event.active.data.current?.name });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  return (
    <DndKitContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {children}
      <DragOverlay dropAnimation={null}>
        {/* TODO: render item */}
        {activeId ? <div>Item ${activeId}</div> : null}
      </DragOverlay>
    </DndKitContext>
  );
};
