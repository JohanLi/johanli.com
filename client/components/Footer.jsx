import React from 'react';
import EmailIcon from '../../public/img/email.svg';
import GithubIcon from '../../public/img/github.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="details">
        © 2016 - {currentYear} Johan Li
      </div>
      <div className="links">
        <a href="mailto:johan@johanli.com">
          <EmailIcon />
          <div className="icon-text">
            johan@johanli.com
          </div>
        </a>
        <a href="https://github.com/JohanLi">
          <GithubIcon />
          <div className="icon-text">
            JohanLi
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
