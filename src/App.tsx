import React from 'react';
import { ActionsView } from './components/ActionsView';
import { IntentsView } from './components/IntentsView';
import { DndContext } from '@dnd-kit/core';
import { StoryView } from './components/StoryView';



export const App = () => {
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


function handleDragEnd(props:any) {
 console.log(props)
}