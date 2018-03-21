/* eslint react/no-danger: "off" */
/* can't use CSS for svg fill unless inlined */

import React from 'react';

import styles from './footer.scss';
import emailIcon from '../../public/img/email.svg';
import githubIcon from '../../public/img/github.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const email = `
    ${emailIcon}
    <div class="icon-text">johan@johanli.com</div>
  `;
  const github = `
    ${githubIcon}
    <div class="icon-text">JohanLi</div>
  `;

  return (
    <footer className={styles.footer}>
      <div className={styles.details}>
        © 2016 - {currentYear} Johan Li
      </div>
      <div className={styles.links}>
        <a
          href="mailto:johan@johanli.com"
          dangerouslySetInnerHTML={{ __html: email }}
        />
        <a
          href="https://github.com/JohanLi"
          dangerouslySetInnerHTML={{ __html: github }}
        />
      </div>
    </footer>
  );
};

export default Footer;
