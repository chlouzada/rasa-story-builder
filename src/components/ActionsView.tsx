import { useEffect, useState } from 'react';
import { useActionsStore, Actions } from '../stores/actions';
import { Draggable } from './Draggable';

const ActionItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Draggable id={name} data={{ name, type: 'ACTIONS' }}>
      <div className="m-2 p-2 shadow-md">
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

const useActionsSync = () => {
  const { setActions, actions } = useActionsStore();

  useEffect(() => {
    const localStorageContent = localStorage.getItem('actions');
    if (!localStorageContent) return;
    if (localStorageContent === 'undefined') return;
    const data = JSON.parse(localStorageContent) as Actions;
    setActions(data);
  }, []);

  useEffect(() => {
    if (actions.responses.length === 0 && actions.customActions.length === 0)
      return;
    localStorage.setItem('actions', JSON.stringify(actions));
  }, [actions]);
};

export const ActionsView = ({ className }: { className?: string }) => {
  const { actions } = useActionsStore();
  useActionsSync();
  return (
    <div className={className}>
      <h2>Actions View </h2>
      <div>
        {actions.responses.map((action) => (
          <ActionItem {...action} />
        ))}
      </div>
    </div>
  );
};
