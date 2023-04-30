import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import styles from './layout.module.scss';
import useAuth from '../../hooks/useAuth';

const Protected = () => {
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <>
      {!auth?.isLoggedIn ? (
        <div className={styles.layout}>
          <NavBar />
          <Cart />
          <Outlet />
          <Footer />
        </div>
      ) : (
        <Navigate to={'/login'} state={{ from: location.pathname }} replace />
      )}
    </>
  );
};

export default Protected;
