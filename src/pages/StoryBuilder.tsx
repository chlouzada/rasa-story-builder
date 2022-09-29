import React from 'react';
import { ActionsView } from '../components/ActionsView';
import { IntentsView } from '../components/IntentsView';
import { StoryView } from '../components/StoryView';
import { DndContext } from '../contexts/DndContext';

export const StoryBuilder = () => {
  return (
    <main className="grid grid-cols-10 h-full pt-[56px]">
      <DndContext>
        <ActionsView className="col-start-1 col-end-3 shadow-2xl" />
        <StoryView className="col-start-3 col-end-9 mx-24 my-4" />
        <IntentsView className="col-start-9 col-end-11 shadow-2xl" />
      </DndContext>
    </main>
  );
};
