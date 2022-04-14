import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { NluContextProvider } from "./contexts/NluContext";
import { ActionsContextProvider } from "./contexts/ActionsContext";

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
