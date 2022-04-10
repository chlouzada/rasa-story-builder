import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Story from "../components/Story";
import parser from "../utils/parser";

export default function IntentsPage() {
  const [textArea, setTextArea] = useState("");

  useEffect(() => {
    setTextArea(localStorage.getItem("intents") || "");
  }, []);


  const handleSave = () => {
    const intents = parser(textArea, 'nlu');
    console.log('os itentnes são',intents);
    localStorage.setItem("intents", textArea);
  };

  const handleClear = () => {
    // clear content of textarea and remove from localstore
    setTextArea("");
    localStorage.removeItem("intents");
  };

  return (
    <div className="flex flex-col">
      <textarea cols={100} rows={30} value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
      <div className="flex gap-4 mx-auto">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
