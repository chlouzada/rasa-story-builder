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

  function handleDragEnd({ over }: DragEndEvent) {
    if (over) store.addStep({ name: 'action1' });
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

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
