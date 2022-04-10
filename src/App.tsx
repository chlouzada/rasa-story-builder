import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import Story from "./components/Story";
import ActionsPage from "./pages/ActionsPage";
import HomePage from "./pages/HomePage";
import IntentsPage from "./pages/IntentsPage";
import parser from "./utils/parser";

function App() {
  return (
    <main className="grid grid-rows-14 h-screen">
      <header className="row-start-1 row-end-2">
        <AppBar />
      </header>
      <section className="row-start-2 row-end-15 container mx-auto overflow-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intents" element={<IntentsPage />} />
          <Route path="/actions" element={<ActionsPage />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
