import React from 'react';
import cv from '../files/Janine.Guo_CV.pdf';
import styles from './Introduce.module.css';
import Jingyi from '../files/Jingyi.jpeg';

const Introduce = () => {
  return (
    <div className={styles.container}>
      <div className={styles.columnright}>
        <h2 className={styles.title}>Jingyi's Little Website Overview</h2>
        <p className={styles.paragraph}>
          Jingyi's Little Website is a Note Sharing Platform is a web application tailored for individuals to jot down, manage, and share their thoughts, ideas, and memories. The design is user-centric, providing users with the ability to personalize their notes with images, categorize them based on interests, and interact with the community through a liking system.
          <p />
          The Note Sharing Platform is more than just a space to write. It is a community platform, a space for expression, and a hub for inspiration. Whether you're penning down your daily experiences, sharing an exciting memory, or offering a piece of advice.
          <p />
          <a href="https://www.linkedin.com/in/jingyi-guo-7756a0254/" target="_blank" rel="noopener noreferrer" className={styles.link}>Website Source</a>
        </p>
      </div>

      <div className={styles.columnleft}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.paragraph}>
          I'm Jingyi Guo, a master's degree candidate in Computer Science at the University of Helsinki. I'm passionate about web development and design.
        </p>
        I am currently on the lookout for opportunities where I can contribute my skills and further hone them. Whether it be a full-time role or an internship, I am eager to bring my enthusiasm, dedication, and expertise to a forward-thinking company based in Finland. 
        <a href={cv} target="_blank" rel="noopener noreferrer">
          <button type="button" className={styles.button}>View My CV</button>
        </a>
        <div className={styles.imageContainer}>
          <img src={Jingyi} alt="Jingyi" className={styles.image} />
          {/* <p className={styles.center}>At the summit of Europe</p> */}
        </div>
      </div>
    </div>
  );
}

export default Introduce;
