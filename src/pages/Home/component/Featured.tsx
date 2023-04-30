import styles from '../Home.module.scss';
import { formatCurrency } from '../../../utils/formatter';
import useCart from '../../../hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const Featured = () => {
  const { increaseCartQuantity, products } = useCart();

  const addCartHandler = (product: { id: string }) => {
    toast.info('Item added to cart');
    increaseCartQuantity(product.id);
  };

  return (
    <div className={styles.featured}>
      <h2>Featured Products</h2>
      <section className={styles.product}>
        {products &&
          products.slice(0, 8).map((product) => (
            <Card key={product.id} className={styles.card_item}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <h2>{product.title}</h2>
              <div className={styles.bottom}>
                <h3>{formatCurrency(product.price * 100)}</h3>
                <Button
                  variant="contained"
                  startIcon={<FaShoppingCart />}
                  onClick={() => addCartHandler(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
      </section>
      <ToastContainer />
    </div>
  );
};

export default Featured;
