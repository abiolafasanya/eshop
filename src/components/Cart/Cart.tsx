import styles from './Cart.module.scss';
import CartItem from './CartItem';
import useCart from '../../hooks/useCart';
import { FaTimes } from 'react-icons/fa';
import { formatCurrency } from '../../utils/formatter';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { isOpen, toggleCart, cartItems, products, cartTotal,setTotal } = useCart();
const navigate = useNavigate();
  const handleCheckout = () => {
    setTotal((cartTotal(products)*100))
    navigate('/checkout', {replace: true});
    toggleCart()
  }

  return (
    <>
      {isOpen && (
        <aside
          role="cart"
          className={`${styles.cart} ${isOpen ? styles.open : ''}`}
        >
          <div className={styles.cart_top}>
            <h3>Cart</h3>
            <FaTimes className={styles.fa} onClick={toggleCart} />
          </div>
          {cartItems.map((item, index) => (
            <CartItem key={Date.now()*index} id={item.id} quantity={item.quantity} />
          ))}
          <div className={styles.total}>
            <div>Total</div>
            <div>
              {formatCurrency((cartTotal(products)*100))}
            </div>
          </div>
          <div className={styles.btn_container}>
            <button className={styles.checkout_btn} onClick={handleCheckout}>Checkout</button>
          </div>
        </aside>
      )}
    </>
  );
};

export default Cart;