import React from "react";
import { Navbar } from "@mantine/core";
import { NavLink } from "react-router-dom";

export default function NavigationBar({ opened }: { opened: boolean }) {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? "underline font-bold" : "";
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <NavLink to="/" className={navLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/nlu" className={navLinkStyle}>
        NLU
      </NavLink>
      <NavLink to="/actions" className={navLinkStyle}>
        Actions
      </NavLink>
    </Navbar>
  );
}
