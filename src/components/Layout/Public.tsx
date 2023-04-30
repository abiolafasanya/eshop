import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import Cart from '../Cart/Cart';
import styles from './layout.module.scss'

const Public = () => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <Cart />
        <Outlet />
      <Footer />
    </div>
  );
};

export default Public