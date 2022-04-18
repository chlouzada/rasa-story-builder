import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { ActionsContextProvider } from "./contexts/ActionsContext";
import { NluContextProvider } from "./contexts/NluContext";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <NluContextProvider>
        <ActionsContextProvider>
          <App />
        </ActionsContextProvider>
      </NluContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
