import React from 'react';
import { Link } from '@tanstack/react-location';

const NavItem = ({
  to,
  children,
  exact,
}: {
  to: string;
  children: React.ReactNode;
  exact?: true;
}) => {
  const activeProps = () => {
    return {
      style: {
        fontWeight: 'bold',
      },
    };
  };

  return (
    <Link
      to={to}
      activeOptions={{ exact }}
      className="py-1 px-2 text-white"
      getActiveProps={activeProps}
    >
      {children}
    </Link>
  );
};

const Navigation = () => {
  return (
    <div className="flex md:gap-3">
      <NavItem to="/" exact>
        Builder
      </NavItem>
      <NavItem to="/config">Config</NavItem>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="p-2 bg-[#3c0ba7] flex items-center w-full absolute shadow-md">
      <p className="mr-auto font-extrabold text-white md:text-xl">
        Rasa Story Builder
      </p>
      <Navigation />
    </div>
  );
};
