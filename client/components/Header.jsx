import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      transition: true,
    };
  }

  toggle() {
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
          <button
            className="hamburger-menu"
            onClick={event => this.toggle()}
          >
            <div className="top" />
            <div className="mid" />
            <div className="bottom" />
          </button>
          <div className="logo">
            <Link to="/" className="logo">Johan Li</Link>
          </div>
        </div>
        <nav className="link-menu">
          <ul className="links">
            <li className="link">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                onClick={() => this.navigate()}
              >
                Home
              </NavLink>
            </li>
            <li className="link">
              <NavLink
                to="/blog"
                activeClassName="active"
                onClick={() => this.navigate()}
              >
                Blog
              </NavLink>
            </li>
            <li className="link">
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
