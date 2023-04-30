import { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import Item from './Item';
import product from '../../api/product';
import { productType, CartItemProps } from '../../types';


const CartItem = ({ id, quantity }: CartItemProps) => {
  const [products, setProducts] = useState([] as productType[]);
  useEffect(() => {
    const controller = new AbortController();
    controller.signal;
    const fetchProducts = async () => {
      const data = await product.getProducts();
      if (data) {
        setProducts(data);
      }
      return console.log('could not fetch products');
    };
    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const item =
    products?.length > 0 ? products.find((item) => item.id === id) : null;
  if (item == null) return null;

  return (
    <article className={styles.cart_item}>
      <img src={item.image as string} className={styles.cart_image} alt={''} />
      <section>
        <h1 className={styles.cart_title}>{item.title}</h1>
        <Item id={item.id} item={item} quantity={quantity} />
      </section>
    </article>
  );
};

export default CartItem;

