import { ActionsView } from './components/ActionsView';
import { IntentsView } from './components/IntentsView';
import { StoryView } from './components/StoryView';
import { DndContext } from './contexts/DndContext';
import { useActions } from './hooks/useActions';

export const App = () => {
  return (
    <main className="grid grid-cols-10 h-full">
      <DndContext>
        <ActionsView className="col-start-1 col-end-3 shadow-2xl" />
        <StoryView className="col-start-3 col-end-9 mx-24 my-12" />
        <IntentsView className="col-start-9 col-end-11 shadow-2xl" />
      </DndContext>
    </main>
  );
};
