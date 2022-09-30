import { ReactLocation, Router, Outlet } from '@tanstack/react-location';
import { Header } from './components/Header';
import { StoryBuilderPage } from './pages/StoryBuilder';
import { ConfigPage } from './pages/Config';

const location = new ReactLocation();

const routes = [
  { path: '/', element: <StoryBuilderPage /> },
  { path: '/config', element: <ConfigPage /> },
];

export const App = () => {
  return (
    <Router location={location} routes={routes}>
      <Header />
      <Outlet />
    </Router>
  );
};
