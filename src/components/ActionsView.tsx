import { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { Draggable } from './Draggable';

const ActionItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Draggable id={name}>
      <div className="m-2 p-2 shadow-md">
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

export const ActionsView = ({ className }: { className?: string }) => {
  const { actions, setActions } = useActions();
  return (
    <div className={className}>
      <div className='flex'><h2>Actions View </h2> <button>Upload</button></div>
      <div>
        {actions.responses.map((action) => (
          <ActionItem {...action} />
        ))}
      </div>
    </div>
  );
};
