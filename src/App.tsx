import React from 'react';
import { ActionsView } from './components/ActionsView';
import { IntentsView } from './components/IntentsView';
import { DndContext } from '@dnd-kit/core';
import { StoryView } from './components/StoryView';
import { useStoryStore } from './stores/story';

export const App = () => {
  const store = useStoryStore();

  function handleDragEnd(props: any) {
    console.log(props);

    const { over, active } = props;

    if (over) {
      store.addStep({ name: 'action1' });
    }
  }

  return (
    <>
      <main className="grid grid-cols-10 h-full">
        <DndContext onDragEnd={handleDragEnd}>
          <ActionsView className="col-start-1 col-end-3 shadow-2xl" />
          <StoryView className="col-start-3 col-end-9 " />
          <IntentsView className="col-start-9 col-end-11 shadow-2xl" />
        </DndContext>
      </main>
    </>
  );
};
