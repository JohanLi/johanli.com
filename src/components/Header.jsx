import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ header, toggle }) => {
  let className = '';

  if (header.active) {
    className += 'active ';
  }

  if (header.transition) {
    className += 'transition ';
  }

  return (
    <header className={className}>
      <div className="navbar">
        <div className="hamburger-menu" onClick={() => toggle(true)}>
          <div className="top" />
          <div className="mid" />
          <div className="bottom" />
        </div>
        <div className="logo">
          <a className="logo" href="/">Johan Li</a>
        </div>
      </div>
      <nav className="items">
        <ul>
          <li>
            <NavLink
              exact to="/"
              activeClassName="active"
              onClick={() => toggle()}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              activeClassName="active"
              onClick={() => toggle()}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/side-projects"
              activeClassName="active"
              onClick={() => toggle()}
            >
              Side Projects
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  header: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Header;
