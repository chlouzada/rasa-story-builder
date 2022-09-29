import React, { useState } from 'react';

const InputView: React.FC<{ className: string }> = ({ className }) => {
  const [text, setText] = useState('');
  const [clearInput, setClearInput] = useState(false);

  const handleFileInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
    mode: 'ACTIONS'
  ) => {
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

  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex">
        <button className="btn btn-secondary flex items-center gap-2">
          Actions
          <input
            id="file-input-actions"
            type="file"
            multiple={false}
            onChange={(e) => {
              handleFileInput(e, 'ACTIONS');
            }}
          />
          {/* {clearInput && (
            <button
              className="p-2 rounded-full"
              onClick={() => {
                const input = document.getElementById(
                  'file-input-actions'
                ) as HTMLInputElement;
                input.value = '';
                setClearInput(!clearInput);
              }}
            >
              X
            </button>
          )} */}
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
    <main className="grid grid-cols-10 h-full pt-[48px]">
      <InputView className="col-start-1 col-end-11" />
    </main>
  );
};
