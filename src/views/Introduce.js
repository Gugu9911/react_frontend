import React from 'react';
import cv from '../files/Janine.Guo_CV.pdf';
import styles from './Introduce.module.css';

const Introduce = () => {
  return (
    <div className={styles.container}>
      <div className={styles.columnright}>
        <h2 className={styles.title}>Website Overview</h2>
        <p className={styles.paragraph}>
          This website serves as an interactive platform for full-stack developers worldwide to exchange experiences and share knowledge. 
          <br />
          <a href="https://www.linkedin.com/in/jingyi-guo-7756a0254/" target="_blank" rel="noopener noreferrer" className={styles.link}>Website Source</a>
        </p>
      </div>
      
      <div className={styles.columnleft}>
        <h2 className={styles.title}>About Janine Guo</h2>
        <p className={styles.paragraph}>
          I'm Janine Guo, a master's degree candidate in Computer Science at the University of Helsinki.
        </p>
        <a href={cv} target="_blank" rel="noopener noreferrer">
          <button type="button" className={styles.button}>View My CV</button>
        </a>
        <div className={styles.imageContainer}>
            <img src="https://i.imgur.com/6XOc1YB.jpg" alt="Janine" className={styles.image} />
            {/* <p className={styles.center}>At the summit of Europe</p> */}
        </div>
      </div>
    </div>
  );
}

export default Introduce;
