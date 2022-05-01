import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { ActionsContextProvider } from "./contexts/ActionsContext";
import { NluContextProvider } from "./contexts/NluContext";
import { StoryBuilderContextProvider } from "./contexts/StoryBuilderContext";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <NluContextProvider>
        <ActionsContextProvider>
          <StoryBuilderContextProvider>
            <App />
          </StoryBuilderContextProvider>
        </ActionsContextProvider>
      </NluContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
