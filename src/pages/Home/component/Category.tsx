import { Image11, Image13, Image14, Image16 } from '../images';
import styles from '../Home.module.scss';

const Category = () => {
  return (
    <div className={styles.category}>
      <h2>Categories</h2>
      <div className={styles.category_image}>
        <article>
          <img src={Image11} alt="image" />
          <h3>women</h3>
        </article>
        <article>
          <img src={Image14} alt="image" />
          <h3>Men</h3>
        </article>
        <article>
          <img src={Image13} alt="image" />
          <h3>Popular</h3>
        </article>
        <article>
          <img src={Image16} alt="image" />
          <h3>Trending</h3>
        </article>
      </div>
    </div>
  );
};

export default Category;
