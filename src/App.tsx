import { AppShell, MediaQuery, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import AsideBar from "./components/AsideBar";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import ActionsPage from "./pages/ActionsPage";
import HomePage from "./pages/HomePage";
import NluPage from "./pages/NluPage";

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<NavigationBar opened={opened} />}
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <AsideBar />
        </MediaQuery>
      }
      footer={<Footer />}
      header={<AppBar opened={opened} setOpened={setOpened} />}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nlu" element={<NluPage />} />
        <Route path="/actions" element={<ActionsPage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
