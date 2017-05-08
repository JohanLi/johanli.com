import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ state, toggle, navigate }) => {
  let className = '';

  if (state.active) {
    className += 'active ';
  }

  if (state.transition) {
    className += 'transition ';
  }

  return (
    <header className={className}>
      <div className="navbar">
        <a
          className="hamburger-menu"
          onClick={toggle}
          onKeyPress={toggle}
          tabIndex="0"
        >
          <div className="top" />
          <div className="mid" />
          <div className="bottom" />
        </a>
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
              onClick={navigate}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              activeClassName="active"
              onClick={navigate}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/side-projects"
              activeClassName="active"
              onClick={navigate}
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
  state: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  toggle: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default Header;
