import React from 'react';

import styles from './footer.scss';
import EmailIcon from '../../public/img/email.svg';
import GithubIcon from '../../public/img/github.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.details}>
        © 2016 - {currentYear} Johan Li
      </div>
      <div className={styles.links}>
        <a
          href="mailto:johan@johanli.com"
        >
          <EmailIcon />
          <div className={styles['icon-text']}>johan@johanli.com</div>
        </a>
        <a
          href="https://github.com/JohanLi"
        >
          <GithubIcon />
          <div className={styles['icon-text']}>JohanLi</div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
