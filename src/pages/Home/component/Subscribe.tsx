import { formatCurrency } from '../../../utils/formatter';
import styles from '../Home.module.scss';

const Subscribe = () => {
  return (
    <section className={styles.subscribe}>
      <h2>Subscribe</h2>
      <div className={styles.content}>
        <article>
          <h3>Subscribe To Newsletter</h3>
          <p>And get {formatCurrency(20)} coupon for free shopping</p>
        </article>
        <form>
            <input type="email" id='email'/>
            <button>Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
