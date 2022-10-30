import { Dialog, Transition } from '@headlessui/react';
import { Button, Modal, Text, TextInput } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useIntentsStore } from '../stores/intents';
// import {} from '@heroicons/react/solid'

export const NewIntentModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
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
    <Modal
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
            {fields.map((field, index) => (
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

      <div className="flex justify-end mt-4">
        <button
          className="btn"
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};
