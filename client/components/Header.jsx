import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      transition: true,
    };
  }

  toggle(event) {
    if (event.key && event.key !== 'Enter') {
      return;
    }

    if (event.type === 'click') {
      event.target.blur();
    }

    this.setState({
      active: !this.state.active,
      transition: true,
    });
  }

  navigate() {
    this.setState({
      active: false,
      transition: false,
    });
  }

  render() {
    const headerClass = classNames({
      active: this.state.active,
      transition: this.state.transition,
    });

    return (
      <header className={headerClass}>
        <div className="navbar">
          <a
            className="hamburger-menu"
            onClick={(event) => this.toggle(event)}
            onKeyPress={(event) => this.toggle(event)}
            tabIndex="0"
            role="button"
          >
            <div className="top" />
            <div className="mid" />
            <div className="bottom" />
          </a>
          <div className="logo">
            <Link to="/" className="logo">Johan Li</Link>
          </div>
        </div>
        <nav className="items">
          <ul>
            <li>
              <NavLink
                exact
                to="/"
                activeClassName="active"
                onClick={() => this.navigate()}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                activeClassName="active"
                onClick={() => this.navigate()}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/side-projects"
                activeClassName="active"
                onClick={() => this.navigate()}
              >
                Side Projects
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {};

export default Header;
