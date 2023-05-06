import styles from './Categories.module.scss';
import Featured from './Featured';
import Subscribe from '../../components/Subscribe/Subscribe';

const Categories = () => {
  return (
    <main className={styles.container}>
      <Featured />
      <Subscribe />
    </main>
  );
};

export default Categories;
