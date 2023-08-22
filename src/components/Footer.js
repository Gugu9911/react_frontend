import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.intro}>Hi, I'm Jingyi Guo</div>
    <div className={styles.description}>A coding enthusiast with a passion for design</div>
    <div className={styles.contact}>
      <a href="https://www.linkedin.com/in/jingyi-guo-7756a0254/" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
        <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
      </a>
      <a href="https://github.com/Gugu9911" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
        <FontAwesomeIcon icon={faGithub} className={styles.icon} />
      </a>
    </div>
  </footer>
);

export default Footer;

