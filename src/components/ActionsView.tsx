import { useEffect, useState } from 'react';
import { useActionsStore, Actions } from '../stores/actions';
import { Draggable } from './Draggable';

const ActionItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Draggable id={name} data={{ name, type: 'ACTION' }}>
      <div className="m-2 p-2 shadow-md">
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

export const ActionsView = ({ className }: { className?: string }) => {
  const { actions } = useActionsStore();
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
