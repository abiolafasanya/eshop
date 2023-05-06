import styles from './Products.module.scss';
import Featured from './component/Featured';
import Hero from './component/Hero';
import Subscribe from './component/Subscribe'

const Products = () => {
  return (
    <main className={styles.container}>
      <Hero />
      <Featured />
      <Subscribe />
    </main>
  );
};

export default Products;
