import React from 'react';
import { observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import classNames from 'classnames';

import header from '../header';
import styles from './header.scss';

const Header = withRouter(observer(() => {
  const headerClass = classNames({
    [styles.header]: true,
    [styles.active]: header.active,
    [styles.transition]: header.transition,
  });

  return (
    <header className={headerClass}>
      <div className={styles.navbar}>
        <button
          className={styles.hamburgerMenu}
          onClick={() => header.toggle()}
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
              onClick={() => header.navigate()}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink
              to="/blog"
              activeClassName={styles.active}
              onClick={() => header.navigate()}
            >
              Blog
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink
              to="/side-projects"
              activeClassName={styles.active}
              onClick={() => header.navigate()}
            >
              Side Projects
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}));

Header.propTypes = {};

export default Header;
