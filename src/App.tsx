import React from 'react';
import { ActionsView } from './components/ActionsView';
import { IntentsView } from './components/IntentsView';


const StoryContainer = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <h2>Story Container</h2>
      <div></div>
    </div>
  );
};

export const App = () => {
  return (
    <>
      <main className="grid grid-cols-10 h-full">
        <ActionsView className="col-start-1 col-end-3 shadow-2xl" />
        <StoryContainer className="col-start-3 col-end-9 " />
        <IntentsView className="col-start-9 col-end-11 shadow-2xl" />
      </main>
    </>
  );
};
