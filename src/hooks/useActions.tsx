import { useEffect } from 'react';
import { Actions, useActionsStore } from '../stores/actions';

export const useActions = () => {
  const { setActions, actions } = useActionsStore();

  useEffect(() => {
    const localStorageContent = localStorage.getItem('actions');
    if (!localStorageContent) return;
    if (localStorageContent === 'undefined') return;
    const data = JSON.parse(localStorageContent) as Actions;
    setActions(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('actions', JSON.stringify(actions));
  }, [actions]);

  return { actions, setActions };
};
