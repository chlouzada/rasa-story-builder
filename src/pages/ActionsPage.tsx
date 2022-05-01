import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Story from "../components/Story";
import { useActions } from "../contexts/ActionsContext";
import parser from "../utils/parser";

export default function ActionsPage() {
  const [textArea, setTextArea] = useState("");
  const [fileInputClearButton, setFileInputClearButton] = useState(false);

  const { actions, setActions } = useActions();

  const handleSave = () => {
    const parsedData = parser(textArea, "actions");
    setActions(parsedData.actions);
  };

  const handleClear = () => {
    setTextArea("");
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
