import React, { useEffect, useState } from "react";
import { useNlu } from "../contexts/NluContext";
import parser, { INluResponse } from "../utils/parser";

export default function NluPage() {
  const [textArea, setTextArea] = useState("");

  const { nlu, setNlu } = useNlu();

  useEffect(() => {
    const localStorageContent = localStorage.getItem("nlu");
    setTextArea(localStorageContent || "");
    setNlu(parser(localStorageContent, "nlu"));
  }, []);

  const handleSave = () => {
    localStorage.setItem("nlu", textArea);
    setNlu(parser(textArea, "nlu"));
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
