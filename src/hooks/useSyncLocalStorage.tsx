import { useEffect } from 'react';
import { localStorageKeys } from '../constants/localStorageKeys';
import { useActionsStore, Actions } from '../stores/actions';
import { Intent, useIntentsStore } from '../stores/intents';

const useSyncActions = () => {
  const { setActions, actions } = useActionsStore();

  useEffect(() => {
    const content = localStorage.getItem(localStorageKeys.ACTIONS);
    if (!content) return;
    if (content === 'undefined') return;
    const data = JSON.parse(content) as Actions;
    setActions(data);
  }, []);

  useEffect(() => {
    if (actions.responses.length === 0 && actions.customActions.length === 0)
      return;
    localStorage.setItem(localStorageKeys.ACTIONS, JSON.stringify(actions));
  }, [actions]);
};

const useSyncIntents = () => {
  const { setIntents, intents } = useIntentsStore();

  useEffect(() => {
    const content = localStorage.getItem(localStorageKeys.INTENTS);
    if (!content) return;
    if (content === 'undefined') return;
    const data = JSON.parse(content) as Intent[];
    setIntents(data);
  }, []);

  useEffect(() => {
    if (intents.length === 0) return;
    localStorage.setItem(localStorageKeys.INTENTS, JSON.stringify(intents));
  }, [intents]);
};

export const useSyncLocalStorage = () => {
  useSyncActions();
  useSyncIntents();
};
