import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="navbar">
      <div className="hamburger-menu">
        <div className="top" />
        <div className="top" />
        <div className="top" />
      </div>
      <div className="logo">
        <a className="logo" href="/">Johan Li</a>
      </div>
    </div>
    <nav className="items">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/blog" activeClassName="active">Blog</NavLink>
        </li>
        <li>
          <NavLink to="/side-projects" activeClassName="active">Side Projects</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
