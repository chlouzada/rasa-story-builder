import React, { useState, useEffect } from 'react';
import { useActionsStore } from '../stores/actions';
import { useIntentsStore } from '../stores/intents';
import { parser } from '../utils/parser';
import { Button, FileInput } from '@mantine/core';

const InputView: React.FC<{ className: string; type: 'ACTIONS' | 'NLU' }> = ({
  className,
  type,
}) => {
  const [text, setText] = useState('');
  const [clearInput, setClearInput] = useState(false);
  const { setActions } = useActionsStore();
  const { setIntents } = useIntentsStore();

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.item(0)) return;
    const text = await fileList.item(0)!.text();
    setText(text);
    setClearInput(!clearInput);
  };

  // const handleFileInputClear = () => {
  //   const input = document.getElementById('fileInput') as HTMLInputElement;
  //   input.value = '';
  //   setClearInput(!clearInput);
  // };

  const handleSave = () => {
    const { actions, nlu } = parser(text, type);
    if (type === 'ACTIONS' && actions) setActions(actions);
    if (type === 'NLU' && nlu && nlu.intents) setIntents(nlu.intents);
  };

  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex">
        <button className="flex items-center gap-2">
          {type === 'ACTIONS' ? 'Upload Actions' : 'Upload NLU'}
          <input
            id={`file-input-${type}`}
            type="file"
            multiple={false}
            onChange={handleFileInput}
          />
          {/* {clearInput && (
            <button
              className="p-2 rounded-full"
              onClick={() => {
                const input = document.getElementById(
                  `file-input-${type}`
                ) as HTMLInputElement;
                input.value = '';
                setClearInput(!clearInput);
              }}
            >
              X
            </button>
          )} */}
        </button>
        <button className="p-2" onClick={handleSave}>
          SAVE
        </button>
      </div>
      <div className="flex flex-col h-full">
        <label>YAML</label>
        <textarea
          value={text}
          className="bg-gray-800 text-white h-full"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

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

  const [value, setValue] = useState<File>();

  useEffect(() => {
    if (!value) return;
    const setter = async () => {
      setText(await value.text());
    };
    setter();
  }, [value]);

  const handleSave = (type: 'ACTIONS' | 'NLU') => {
    try {
      const { actions, nlu } = parser(text, type);
      if (type === 'ACTIONS' && actions) setActions(actions);
      if (type === 'NLU' && nlu && nlu.intents) setIntents(nlu.intents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex h-full pt-[48px]">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-72">
          {' '}
          <FileInput
            label="Select file"
            placeholder="nlu.yaml"
            className="w-full"
            onChange={setValue as any}
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
              onClick={() => handleSave('ACTIONS')}
            >
              Save as Intents
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4" />
      <RenderFile text={text} className="w-1/2" />
    </main>
  );
};
