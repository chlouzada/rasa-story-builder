import React, { useState } from 'react';
import { useActionsStore } from '../stores/actions';
import { parser } from '../utils/parser';

const InputView: React.FC<{ className: string; type: 'ACTIONS' | 'NLU' }> = ({
  className,
  type,
}) => {
  const [text, setText] = useState('');
  const [clearInput, setClearInput] = useState(false);
  const { setActions } = useActionsStore();

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
    // if (type === 'NLU' && nlu) setNlu(nlu);
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

export const ConfigPage = () => {
  return (
    <main className="flex h-full pt-[48px]">
      <InputView className="w-1/2" type="ACTIONS" />
      <div className="p-4" />
      <InputView className="w-1/2" type="NLU" />
    </main>
  );
};
