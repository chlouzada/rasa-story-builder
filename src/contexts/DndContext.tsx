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

  function handleDragEnd(event: DragEndEvent) {
    console.log(event,event.active.data.current?.name)
    if (event.over) store.addStep({ name: event.active.data.current?.name });
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
