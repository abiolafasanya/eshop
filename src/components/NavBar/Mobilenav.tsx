import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import useApp from '../../hooks/useApp';

const Mobilenav = () => {
  const {openMenu} = useApp()

  
  return (
    <div className={`${styles.mobile_ul} ${openMenu ? styles.visible : ''}`}>
      <ul className={''}>
      <Link to="/products">Product</Link>
      <Link to="/categories">Categories</Link>
      <Link to="">Contact</Link>
    </ul>
    </div>
  );
};

export default Mobilenav;
