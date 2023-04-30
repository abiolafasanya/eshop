import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const { categories } = useCart();

  return (
    <footer className={styles.footer}>
      <section className={styles.footer_group}>
        <div>
          <h2>FashShop</h2>
          <div className={styles.footer_icon}>
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <LinkedInIcon />
          </div>
        </div>
        <div>
          <h3>Categories Here</h3>
          <div className={styles.footer_link}>
            {categories &&
              categories.map((category, id) => (
                <Link key={id} to={'/category/'}>
                  {category}
                </Link>
              ))}
          </div>
        </div>
        <div>
          <h3>GET IN TOUCH</h3>
          <div>
            <p className="phone-no">+234-81-2095-35</p>
            <p className="mail">fastshop@gmail.com</p>
            <p className="address">123, Fast Str, Nigeria.</p>
          </div>
        </div>
      </section>
      <section className={styles.footer_bottom}>
        &copy; {new Date(Date.now()).getFullYear()} Faststore. All Rights
        Reserved
      </section>
    </footer>
  );
};

export default Footer;
