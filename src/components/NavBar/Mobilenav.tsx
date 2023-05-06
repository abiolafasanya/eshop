import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import useApp from '../../hooks/useApp';

const Mobilenav = () => {
  const { openMenu, toggleMenu } = useApp();

  const menus = [
    { name: 'products', link: '/products' },
    { name: 'categories', link: '/categories' },
    { name: 'contact', link: '/contact' },
  ];

  return (
    <div className={`${styles.mobile_ul} ${openMenu ? styles.visible : ''}`}>
      <menu className={''}>
        {menus.map((menu) => (
          <Link key={menu.name} to={menu.link} onClick={toggleMenu}>
            {menu.name}
          </Link>
        ))}
      </menu>
    </div>
  );
};

export default Mobilenav;
