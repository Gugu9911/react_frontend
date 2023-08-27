import React from 'react';
import cv from '../files/Jingyi.Guo_CV.pdf';
import styles from './Introduce.module.css';
import Jingyi from '../files/Jingyi.jpg';

const Introduce = () => {
  return (
    <div className={styles.container}>
      <div className={styles.columnright}>
        <h2 className={styles.title}>Jingyi's Little Website Overview</h2>
        <p className={styles.paragraph}>
          Jingyi's Little Website is a Note Sharing Platform is a web application tailored for individuals to jot down, 
          manage, and share their thoughts, ideas, and memories. The design is user-centric, providing users with the ability 
          to personalize their notes with images, categorize them based on interests, and interact with the community through a 
          liking system.
          <p />
          This website uses React for the front-end development of the web application, creating reusable and dynamic
          components to build the UI. Also Implemented the back-end logic with Express, a Node.js web framework, to handle 
          the routing and APIs for data interaction between the front-end and the database. MangoDB Cloud and Cloudnary are
          the database management system to store and retrieve data.
          <p />
          <a href="https://jingyi-littlenotewebsite.onrender.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>Website Source</a>
        </p>
      </div>

      <div className={styles.columnleft}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.paragraph}>
          I'm Jingyi Guo, a master's degree student in Computer Science at the University of Helsinki. I'm passionate about web development and design.
        </p>
        I am currently on the lookout for opportunities where I can contribute my skills and further hone them. Whether it be a full-time role or an internship, I am eager to bring my enthusiasm and expertise to a forward-thinking company based in Finland. 
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
