import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Inbox
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="active">
            New Message
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
