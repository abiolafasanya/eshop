import { MdAdd, MdDeleteOutline, MdRemove } from 'react-icons/md'
import useCart from '../../hooks/useCart'
import { formatCurrency } from '../../utils/formatter';
import styles from './Cart.module.scss';
import { itemType } from '../../types';

const Item = ({id, item, quantity}: itemType) => {
    const {decreaseCartQuantity, increaseCartQuantity, removeCartQuantity} = useCart();
  return (
    <div className={styles.cart_options}>
          <div className={styles.cart_action}>
            <MdRemove
              className={styles.cart_btn}
              onClick={() => decreaseCartQuantity(id)}

            />
            <span className={styles.cart_cost}>{quantity}</span>
            <MdAdd
              className={styles.cart_btn}
              onClick={() => increaseCartQuantity(id)}

            />
          </div>
          <div className={styles.cart_stat}>
            <span className="text-small">
              {formatCurrency((item.price * 100) * quantity)}
            </span>
            <MdDeleteOutline
              className={styles.cart_delete}
              onClick={() => removeCartQuantity(id)}
            />
          </div>
        </div>
  )
}

export default Item