import { useIntentsStore } from '../stores/intents';
import { Draggable } from './Draggable';
import { useEffect, useState } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';
import { useFieldArray, useForm } from 'react-hook-form';

import userIntent from '../assets/user_intent.svg';

const IntentItem: React.FC<{ name: string; examples: string[] }> = ({
  name,
}) => {
  return (
    <Draggable id={name} data={{ name, type: 'INTENT' }}>
      <div className="m-2 p-2 shadow-md">
        <p>{name}</p>

        <img src={userIntent} alt="user intent" className="w-6 h-6" />
      </div>
    </Draggable>
  );
};

export const NewIntent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addIntent } = useIntentsStore();
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,

    formState: { errors },
  } = useForm<{ name: string; examples: { value: string }[] }>({
    defaultValues: {
      name: '',
      examples: [{ value: '' }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'examples',
  });

  const toggle = () => setIsOpen((prev) => !prev);

  const addExample = () => {
    append({ value: '' });
  };

  useEffect(reset, [isOpen]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    addIntent({
      name: data.name,
      examples: data.examples.map((e) => e.value),
      type: 'INTENT',
    });
    setIsOpen(false);
  });

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        centered
        size="40%"
        title={<h1 className="text-xl font-bold">New User Intent</h1>}
      >
        <form onSubmit={onSubmit} className="p-4 bg-gray-100">
          <h3 className="font-bold text-sm my-2">Name</h3>
          <TextInput
            placeholder="User intent name, e.g. 'greet'"
            {...register('name', {
              required: true,
              pattern: /^[A-Za-z0-9_-]+$/i,
            })}
            error={
              (errors.name?.type === 'required' && 'This field is required.') ||
              (errors.name?.type === 'pattern' &&
                'Invalid characters. Only letters, numbers, underscores and dashes are allowed.')
            }
          />

          <div>
            <h3 className="font-bold text-sm my-2">Examples</h3>
            <div className="flex flex-col gap-2">
              {fields.map((_, index) => (
                <TextInput
                  placeholder="Type here a message that the user might send"
                  {...register(`examples.${index}.value`, {
                    required: true,
                    // az number and accent
                    pattern: /^[A-Za-z0-9\u00C0-\u017F\s]+$/i,
                  })}
                />
              ))}
            </div>
            <div className="flex justify-center text-2xl">
              <button type="button" onClick={addExample}>
                +
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-between mt-4 gap-12">
          <Button color="primary" variant="subtle" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={onSubmit}>
            Save
          </Button>
        </div>
      </Modal>
      <Button color="primary" onClick={toggle}>
        New
      </Button>
    </>
  );
};

export const IntentsView = () => {
  const { intents } = useIntentsStore();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">User Intents</h2>
        <NewIntent />
      </div>
      <div>
        {intents.map((intent, index) => (
          <IntentItem key={`${intent.name}-${index}}`} {...intent} />
        ))}
      </div>
    </>
  );
};
