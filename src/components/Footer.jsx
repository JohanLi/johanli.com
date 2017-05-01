/* eslint react/no-danger: "off" */
/* can't use CSS for svg fill unless inlined */

import React from 'react';

import emailIcon from '../../public/img/email.svg';
import githubIcon from '../../public/img/github.svg';

const Footer = () => {
  const email = `${emailIcon}<div>johan@johanli.com</div>`;
  const github = `${githubIcon}<div>JohanLi</div>`;

  return (
    <footer>
      <div className="details">
        © 2016 - 2017 Johan Li
      </div>
      <div className="links">
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
