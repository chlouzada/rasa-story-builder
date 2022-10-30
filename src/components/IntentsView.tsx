import { useIntentsStore } from '../stores/intents';
import { Draggable } from './Draggable';
import { Dialog, Transition } from '@headlessui/react';
// import { XIcon } from '@heroicons/react/outline'
import { Fragment, useState } from 'react';
import { NewIntentModal } from './NewIntentModal';

const IntentItem: React.FC<{ name: string; examples: string[] }> = ({
  name,
  examples,
}) => {
  return (
    <Draggable id={name} data={{ name, type: 'INTENT' }}>
      <div className="m-2 p-2 shadow-md">
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

export const IntentsView = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { intents } = useIntentsStore();

  return (
    <>
      <div className={className}>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">User Intents</h2>
          <button className="btn" onClick={() => setIsOpen(true)}>
            New
          </button>
        </div>
        <div>
          {intents.map((intent, index) => (
            <IntentItem key={`${intent.name}-${index}}`} {...intent} />
          ))}
        </div>
      </div>
      <NewIntentModal {...{ setIsOpen, isOpen }} />
    </>
  );
};
