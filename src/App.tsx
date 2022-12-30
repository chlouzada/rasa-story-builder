import { ReactLocation, Router, Outlet } from '@tanstack/react-location';
import { Header } from './components/Header';
import { StoryBuilderPage } from './pages/StoryBuilder';
import { ImportPage } from './pages/Import';

const location = new ReactLocation();

const routes = [
  { path: '/', element: <StoryBuilderPage /> },
  { path: '/story', element: <StoryBuilderPage /> },
  { path: '/import', element: <ImportPage /> },
];

export const App = () => {
  return (
    <Router location={location} routes={routes}>
      <Header />
      <Outlet />
    </Router>
  );
};
