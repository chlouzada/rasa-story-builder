import { useIntentsStore } from '../stores/intents';
import { Draggable } from './Draggable';
import { useEffect, useState } from 'react';
import { Modal, TextInput } from '@mantine/core';
import { useFieldArray, useForm } from 'react-hook-form';

const IntentItem: React.FC<{ name: string; examples: string[] }> = ({
  name,
}) => {
  return (
    <Draggable id={name} data={{ name, type: 'INTENT' }}>
      <div className="m-2 p-2 shadow-md">
        <p>{name}</p>
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

  const addExample = () => {
    append({ value: '' });
  };

  useEffect(reset, [isOpen]);

  const onSubmit = handleSubmit((data) => {
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
        title={<h1 className="text-xl font-bold">Add a new user intent</h1>}
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
                    pattern: /^[A-Za-z0-9_-]+$/i,
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

        <div className="flex justify-between mt-4">
          <button className="btn" onClick={onSubmit}>
            Cancel
          </button>
          <button className="btn" onClick={onSubmit}>
            Save
          </button>
        </div>
      </Modal>
      <button className="btn" onClick={() => setIsOpen(true)}>
        New
      </button>
    </>
  );
};

export const IntentsView = ({ className }: { className?: string }) => {
  const { intents } = useIntentsStore();

  return (
    <>
      <div className={className}>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">User Intents</h2>
          <NewIntent />
        </div>
        <div>
          {intents.map((intent, index) => (
            <IntentItem key={`${intent.name}-${index}}`} {...intent} />
          ))}
        </div>
      </div>
    </>
  );
};
