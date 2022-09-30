import React, { useEffect } from 'react';
import { ActionsView } from '../components/ActionsView';
import { IntentsView } from '../components/IntentsView';
import { StoryView } from '../components/StoryView';
import { DndContext } from '../contexts/DndContext';
import { useActionsStore, Actions } from '../stores/actions';

enum LS_KEYS {
  ACTIONS = 'ACTIONS',
  INTENTS = 'INTENTS',
}

// TODO: intent store and sync
const useSync = () => {
  const { setActions, actions } = useActionsStore();

  useEffect(() => {
    const content = localStorage.getItem(LS_KEYS.ACTIONS);
    if (!content) return;
    if (content === 'undefined') return;
    const data = JSON.parse(content) as Actions;
    setActions(data);
  }, []);

  useEffect(() => {
    if (actions.responses.length === 0 && actions.customActions.length === 0)
      return;
    localStorage.setItem(LS_KEYS.ACTIONS, JSON.stringify(actions));
  }, [actions]);
};

export const StoryBuilderPage = () => {
  useSync();

  return (
    <main className="grid grid-cols-10 h-full pt-[48px]">
      <DndContext>
        <ActionsView className="col-start-1 col-end-3 shadow-2xl" />
        <StoryView className="col-start-3 col-end-9 mx-24 my-4" />
        <IntentsView className="col-start-9 col-end-11 shadow-2xl" />
      </DndContext>
    </main>
  );
};
