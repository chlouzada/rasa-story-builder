import { ActionsView } from '../components/ActionsView';
import { IntentsView } from '../components/IntentsView';
import { StoryView } from '../components/StoryView';
import { DndContext } from '../contexts/DndContext';
import { useSyncLocalStorage } from '../hooks/useSyncLocalStorage';

export const StoryBuilderPage = () => {
  useSyncLocalStorage();
  return (
    <main className="grid grid-cols-10 h-full pt-[48px]">
      <DndContext>
        <div className="col-start-1 col-end-3 shadow-2xl">
          <ActionsView />
        </div>
        <div className="col-start-3 col-end-9 mx-24 my-4 overflow-auto">
          <StoryView />
        </div>
        <div className="col-start-9 col-end-11 shadow-2xl">
          <IntentsView />
        </div>
      </DndContext>
    </main>
  );
};
