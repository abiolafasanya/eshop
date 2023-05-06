import styles from './Products.module.scss';
import Featured from './component/Featured';
import Subscribe from './component/Subscribe'

const Products = () => {
  return (
    <main className={styles.container}>
      <Featured />
      <Subscribe />
    </main>
  );
};

export default Products;
