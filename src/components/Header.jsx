import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './header.scss';

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
      [styles.header]: true,
      [styles.active]: this.state.active,
      [styles.transition]: this.state.transition,
    });

    return (
      <header className={headerClass}>
        <div className={styles.navbar}>
          <button
            className={styles.hamburgerMenu}
            onClick={() => this.toggle()}
          >
            <div className={styles.top} />
            <div className={styles.mid} />
            <div className={styles.bottom} />
          </button>
          <div className={styles.logo}>
            <Link to="/" className={styles.logo}>Johan Li</Link>
          </div>
        </div>
        <nav className={styles.linkMenu}>
          <ul className={styles.links}>
            <li className={styles.link}>
              <NavLink
                exact
                to="/"
                activeClassName={styles.active}
                onClick={() => this.navigate()}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.link}>
              <NavLink
                to="/blog"
                activeClassName={styles.active}
                onClick={() => this.navigate()}
              >
                Blog
              </NavLink>
            </li>
            <li className={styles.link}>
              <NavLink
                to="/side-projects"
                activeClassName={styles.active}
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
