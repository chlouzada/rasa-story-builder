import React, { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { ActionsView } from './components/ActionsView';
import { IntentsView } from './components/IntentsView';
import { StoryView } from './components/StoryView';
import { useStoryStore } from './stores/story';

export const App = () => {
  const store = useStoryStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragEnd(props: any) {
    console.log(props);

    const { over, active } = props;

    if (over) {
      store.addStep({ name: 'action1' });
    }
  }

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  return (
    <>
      <main className="grid grid-cols-10 h-full">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <ActionsView className="col-start-1 col-end-3 shadow-2xl" />
          <StoryView className="col-start-3 col-end-9 mx-36" />
          <IntentsView className="col-start-9 col-end-11 shadow-2xl" />
          <DragOverlay dropAnimation={null}>
            {/* TODO: render item */}
            {activeId ? <div>Item ${activeId}</div> : null}  
          </DragOverlay>
        </DndContext>
      </main>
    </>
  );
};
