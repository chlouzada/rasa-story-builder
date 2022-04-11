import React from "react";
import { NavLink } from "react-router-dom";

export default function AppBar() {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? "underline font-bold" : "";

  return (
    <header className="w-full py-4 shadow-md ">
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
