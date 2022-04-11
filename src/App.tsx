import { Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import ActionsPage from "./pages/ActionsPage";
import HomePage from "./pages/HomePage";
import NLUPage from "./pages/NLUPage";

function App() {
  return (
    <main className="grid grid-rows-14 h-screen">
      <header className="row-start-1 row-end-2">
        <AppBar />
      </header>
      <section className="row-start-2 row-end-15 container mx-auto overflow-auto py-6 px-4 md:px-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nlu" element={<NLUPage />} />
          <Route path="/actions" element={<ActionsPage />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
