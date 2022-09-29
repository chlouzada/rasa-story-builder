import React from 'react';

const ActionsContainer = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <h2>Actions Container</h2>
      <div></div>
    </div>
  );
};

const IntentsContainer = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <h2>Intent Container</h2>
      <div></div>
    </div>
  );
};

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
      <h1>Story Builder</h1>

      <main className="grid grid-cols-10 h-full">
        <ActionsContainer className="col-start-1 col-end-3" />
        <IntentsContainer className="col-start-3 col-end-9 " />
        <StoryContainer className="col-start-9 col-end-11" />
      </main>
    </>
  );
};
