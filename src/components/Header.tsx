import React from 'react';
import { Link } from '@tanstack/react-location';

const Navigation = () => {
  return (
    <div>
      <Link to="/" activeOptions={{ exact: true }}>
        Home
      </Link>
      <Link to="posts">Actions</Link>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="p-2 py-4 bg-primary flex w-full absolute">
      <p className="mr-auto font-extrabold text-white">Rasa Story Builder</p>
      <Navigation />
    </div>
  );
};
