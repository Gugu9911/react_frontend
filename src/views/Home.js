import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image1 from '../files/pc1.webp';
import Image2 from '../files/pc2.webp';
import Image3 from '../files/pc3.webp';
import Image4 from '../files/pc4.webp';
import styles from './Home.module.css';

const Home = () => (
  <Carousel showArrows={true} showThumbs={false} showStatus={false}>
    <div className={styles.carouselImage}>
      <img src={Image1} alt="carousel-image1" />
      <p className={styles.legend}>Innovation</p>
    </div>
    <div className={styles.carouselImage}>
      <img src={Image2} alt="carousel-image2" />
      <p className={styles.legend}>Dedication</p>
    </div>
    <div className={styles.carouselImage}>
      <img src={Image3} alt="carousel-image3" />
      <p className={styles.legend}>Creativity</p>
    </div>
    <div className={styles.carouselImage}>
      <img src={Image4} alt="carousel-image4" />
      <p className={styles.legend}>Passion</p>
    </div>
  </Carousel>
);

export default Home;
