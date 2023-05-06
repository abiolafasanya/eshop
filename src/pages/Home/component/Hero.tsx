import React from 'react';
import styles from '../Home.module.scss';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";

import {
  Image1,
  Image10,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
} from '../images';



const responsive = {
  0: {
    items: 1,
  },
  1000: {
    items: 1,
  },
};

const Hero = () => {
  const handleDragStart = (e: React.SyntheticEvent) => e.preventDefault();
  const items = [
    <img src={Image1} alt="bg" onDragStart={handleDragStart} role="presentation" />,
    <img src={Image2} alt="bg" onDragStart={handleDragStart} role="presentation" />,
    <img src={Image3} alt="bg" onDragStart={handleDragStart} role="presentation" />,
    <img src={Image4} alt="bg" onDragStart={handleDragStart} role="presentation" />,
    <img src={Image5} alt="bg" onDragStart={handleDragStart} role="presentation" />,
    <img src={Image6} alt="bg" onDragStart={handleDragStart} role="presentation" />,
    <img src={Image7} alt="bg" onDragStart={handleDragStart} role="presentation" />,
    <img src={Image8} alt="bg" onDragStart={handleDragStart} role="presentation" />,
    <img src={Image9} alt="bg" onDragStart={handleDragStart} role="presentation" />,
    <img src={Image10} alt="bg"onDragStart={handleDragStart} role="presentation"  />,
  ];
  return (
    <div className={styles.hero}>
      
      <section className={styles.section2}>
        <AliceCarousel
          autoPlay
          items={items}
          infinite
          disableButtonsControls
          disableDotsControls
          animationDuration={1000}
          autoPlayInterval={3000}
          responsive={responsive}
          animationType="fadeout"
          mouseTracking
        />
      </section>
      <section className={styles.section1}>
        <h1>
          Get ready for the biggest sale of 2023! Enjoy a whopping 35% off on
          our latest fashion collection.
        </h1>
      </section>
    </div>
  );
};

export default Hero;
