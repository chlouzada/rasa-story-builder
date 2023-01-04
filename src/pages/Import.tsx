import React, { useState, useEffect } from 'react';
import { useActionsStore } from '../stores/actions';
import { useIntentsStore } from '../stores/intents';
import { parser } from '../utils/parser';
import { Button, FileInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { localStorageKeys } from '../constants/localStorageKeys';

const RenderFile: React.FC<{ className: string; text: string }> = ({
  className,
  text,
}) => {
  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex flex-col h-full">
        <textarea
          readOnly
          value={text}
          className="bg-gray-800 text-white h-full"
        />
      </div>
    </div>
  );
};

export const ImportPage = () => {
  const [text, setText] = useState('');
  const { setActions } = useActionsStore();
  const { setIntents } = useIntentsStore();

  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (!file) return;
    const setter = async () => {
      setText(await file.text());
    };
    setter();
  }, [file]);

  const handleSave = (type: 'ACTIONS' | 'NLU') => {
    if (!file) {
      showNotification({
        title: 'Import canceled',
        message: 'Please select a file first.',
      });
      return;
    }

    try {
      console.log(text,type)
      const { actions, nlu } = parser(text, type);
      if (type === 'ACTIONS' && actions) setActions(actions);
      if (type === 'NLU' && nlu && nlu.intents) setIntents(nlu.intents);
    } catch (error) {
      console.log(error)
      showNotification({
        title: 'Import failed!',
        message: 'Could not parse the file, please check the format.',
        color: 'red',
      });
    }
  };

  const deleteStore = (type: 'ACTIONS' | 'NLU') => {
    if (type === 'ACTIONS') {
      localStorage.removeItem(localStorageKeys.ACTIONS);
      setActions({
        responses: [],
        customActions: [],
      });
    }
    if (type === 'NLU') {
      localStorage.removeItem(localStorageKeys.INTENTS);
      setIntents([]);
    }
  };

  return (
    <main className="flex h-full pt-[48px]">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-72 flex flex-col gap-6">
          <FileInput
            label="Select file"
            placeholder="nlu.yaml"
            className="w-full"
            onChange={setFile as any}
          />
          <div className="flex gap-4 justify-between">
            <Button
              color={'primary'}
              variant="subtle"
              onClick={() => handleSave('ACTIONS')}
            >
              Save as Actions
            </Button>
            <Button
              color={'primary'}
              variant="subtle"
              onClick={() => handleSave('NLU')}
            >
              Save as Intents
            </Button>
          </div>
          <div className="flex gap-4 justify-between">
            <Button
              color={'primary'}
              variant="subtle"
              onClick={() => deleteStore('ACTIONS')}
            >
              Delete All Actions
            </Button>
            <Button
              color={'primary'}
              variant="subtle"
              onClick={() => deleteStore('NLU')}
            >
              Delete All Intents
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4" />
      <RenderFile text={text} className="w-1/2" />
    </main>
  );
};
