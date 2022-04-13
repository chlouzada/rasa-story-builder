import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { NluContextProvider } from "./contexts/NluContext";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <NluContextProvider>
        <App />
      </NluContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
