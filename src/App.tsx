import { ReactLocation, Router, Outlet, Link } from '@tanstack/react-location';
import { StoryBuilder } from './pages/StoryBuilder';

const location = new ReactLocation();

const routes = [{ path: '/', element: <StoryBuilder /> }];

export const App = () => {
  return (
    <Router location={location} routes={routes}>
      <Outlet />
    </Router>
  );
};
