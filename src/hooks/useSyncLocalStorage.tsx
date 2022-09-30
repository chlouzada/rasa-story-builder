import { useEffect } from 'react';
import { useActionsStore, Actions } from '../stores/actions';
import { Intent, useIntentsStore } from '../stores/intents';

enum LS_KEYS {
  ACTIONS = 'ACTIONS',
  INTENTS = 'INTENTS',
}

const useSyncActions = () => {
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

const useSyncIntents = () => {
  const { setIntents, intents } = useIntentsStore();

  useEffect(() => {
    const content = localStorage.getItem(LS_KEYS.INTENTS);
    if (!content) return;
    if (content === 'undefined') return;
    const data = JSON.parse(content) as Intent[];
    setIntents(data);
  }, []);

  useEffect(() => {
    if (intents.length === 0) return;
    localStorage.setItem(LS_KEYS.INTENTS, JSON.stringify(intents));
  }, [intents]);
};

export const useSyncLocalStorage = () => {
  useSyncActions();
  useSyncIntents();
};
