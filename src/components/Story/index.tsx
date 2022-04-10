import React, { useState } from "react";
import Steps from "../Steps";

export default function Story() {
  const [name, setName] = useState("");

  return (
    <div className="bg-red-50">
      <input type="text" name="Story Name" value={name} onChange={(e) => setName(e.target.value)}/>
      <Steps />
    </div>
  );
}
