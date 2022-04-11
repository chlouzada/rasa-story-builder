import React from "react";
import { NavLink } from "react-router-dom";

export default function AppBar() {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? "underline font-bold" : "";

  return (
    <header className="w-full h-full shadow-md px-4 md:px-0 flex items-center">
      <nav className="container mx-auto flex gap-4 text-xl font-semibold">
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/nlu" className={navLinkStyle}>
          NLU
        </NavLink>
        <NavLink to="/actions" className={navLinkStyle}>
          Actions
        </NavLink>
      </nav>
    </header>
  );
}
