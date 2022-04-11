import React, { useEffect, useState } from "react";
import parser, { INLUResponse } from "../utils/parser";

export default function NLUPage() {
  const [textArea, setTextArea] = useState("");
  const [nlu, setNLU] = useState<INLUResponse>();

  useEffect(() => {
    const localStorageContent = localStorage.getItem("nlu");
    setTextArea(localStorageContent || "");
    setNLU(parser(localStorageContent, "nlu"));
  }, []);

  const handleSave = () => {
    localStorage.setItem("nlu", textArea);
    setNLU(parser(textArea, "nlu"));
  };

  const handleClear = () => {
    setTextArea("");
    localStorage.removeItem("intents");
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
      <div className="flex gap-4 mx-auto">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
