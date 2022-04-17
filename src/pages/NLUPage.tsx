import React, { useEffect, useState } from "react";
import { useNlu } from "../contexts/NluContext";
import parser, { INluResponse } from "../utils/parser";

export default function NluPage() {
  const [textArea, setTextArea] = useState("");
  const [fileInputClearButton, setFileInputClearButton] = useState(false);

  const { nlu, setNlu } = useNlu();

  // useEffect(() => {
  //   const localStorageContent = localStorage.getItem("nlu");
  //   if (!localStorageContent) return;
  //   setTextArea(localStorageContent || "");
  //   setNlu(parser(localStorageContent, "nlu") as INluResponse);
  // },[]);

  const handleSave = () => {
    localStorage.setItem("nlu", textArea);
    setNlu(parser(textArea, "nlu") as INluResponse);
  };

  const handleClear = () => {
    setTextArea("");
    localStorage.removeItem("nlu");
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.item(0)) return;
    const text = await fileList.item(0)!.text();
    setTextArea(text);
    setFileInputClearButton(!fileInputClearButton);
  };

  const handleFileInputClear = () => {
    const input = document.getElementById("fileInput") as HTMLInputElement;
    input.value = "";
    setFileInputClearButton(!fileInputClearButton);
  };

  return (
    <div className="flex flex-col">
      <div>
        {nlu?.intents.map((intent, index) => (
          <div key={intent.name + index}>{intent.name}</div>
        ))}
      </div>

      <textarea
        cols={100}
        rows={20}
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <div className="flex items-center">
        <input
          id="fileInput"
          type="file"
          multiple={false}
          onChange={(e) => {
            handleFileInput(e);
          }}
        />
        {fileInputClearButton && (
          <button
            id="fileInputClear"
            className="p-2 rounded-full"
            onClick={handleFileInputClear}
          >
            X
          </button>
        )}
      </div>
      <div className="flex gap-4 mx-auto">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
