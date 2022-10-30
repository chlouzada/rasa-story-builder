import { Dialog, Transition } from '@headlessui/react';
import { Button, Text, TextInput } from '@mantine/core';
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
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setIsOpen}
      >
        <div
          className="flex min-h-screen text-center sm:block sm:px-6 lg:px-8"
          style={{ fontSize: 0 }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-105"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-105"
          >
            <div className="flex text-base text-left transform transition w-full sm:inline-block max-w-3xl sm:my-8 sm:align-middle">
              <form
                onSubmit={onSubmit}
                className="w-full relative flex flex-col bg-white pt-6 pb-8 overflow-hidden sm:pb-6 sm:rounded-lg lg:py-8"
              >
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 mb-8">
                  <h2 className="text-lg font-medium text-gray-900">
                    Add a new user intent
                  </h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    {/* TODO: x icons */}
                    {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}X
                  </button>
                </div>

                <section aria-labelledby="main" className="mt-auto px-4">
                  <div className="bg-gray-50 p-6 sm:p-8 sm:rounded-lg">
                    <div className="flow-root">
                      <TextInput
                        placeholder="User intent name, e.g. 'greet'"
                        label="Name"
                        {...register('name', {
                          required: true,
                          pattern: /^[A-Za-z0-9_-]+$/i,
                        })}
                        error={
                          (errors.name?.type === 'required' &&
                            'This field is required.') ||
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
                    </div>
                  </div>
                </section>

                <div className="mt-8 flex justify-end px-4 sm:px-6 lg:px-8">
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
