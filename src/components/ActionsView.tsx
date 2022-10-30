import { Button, Modal, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useActionsStore, Actions, ActionTypeEnum } from '../stores/actions';
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

export const NewAction: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addAction } = useActionsStore();
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,

    formState: { errors },
  } = useForm<{ name: string; texts: { value: string }[] }>({
    defaultValues: {
      name: '',
      texts: [{ value: '' }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'texts',
  });

  const toggle = () => setIsOpen((prev) => !prev);

  const addExample = () => {
    append({ value: '' });
  };

  useEffect(reset, [isOpen]);

  const onSubmit = handleSubmit((data) => {
    addAction({
      name: data.name,
      texts: data.texts.map((e) => e.value),
      type: ActionTypeEnum.RESPONSE,
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
        title={
          <h1 className="text-xl font-bold">Add a new assistant action</h1>
        }
      >
        <form onSubmit={onSubmit} className="p-4 bg-gray-100">
          <h3 className="font-bold text-sm my-2">Name</h3>
          <TextInput
            placeholder="Assitant action name, e.g. 'utter_greet'"
            {...register('name', {
              required: true,
              pattern: /^utter_[a-zA-Z0-9_-]+$/,
            })}
            error={
              (errors.name?.type === 'required' && 'This field is required.') ||
              (errors.name?.type === 'pattern' &&
                'Name must start with utter_ and only contain letters, numbers, underscores and dashes.')
            }
          />

          <div>
            <h3 className="font-bold text-sm my-2">Texts</h3>
            <div className="flex flex-col gap-2">
              {fields.map((_, index) => (
                <TextInput
                  placeholder="Type here a text that the assistant will say"
                  {...register(`texts.${index}.value`, {
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
          <Button variant='outline'  color="dark" onClick={toggle}>
            Cancel
          </Button>
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

export const ActionsView = ({ className }: { className?: string }) => {
  const { actions } = useActionsStore();
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">User Intents</h2>
        <NewAction />
      </div>
      <div>
        {actions.responses.map((action, index) => (
          <ActionItem key={`${action.name}-${index}}`} {...action} />
        ))}
      </div>
    </div>
  );
};
