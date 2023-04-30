import styles from './Home.module.scss';
import Hero from './component/Hero';
import Category from './component/Category';
import Featured from './component/Featured';
import Subscribe from './component/Subscribe';

const Home = () => {
  return (
    <main className={styles.container}>
      <Hero />
      <Category />
      <Featured />
      <Subscribe />
    </main>
  );
};

export default Home;
