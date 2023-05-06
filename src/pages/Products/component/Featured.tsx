import styles from '../Products.module.scss';
import { formatCurrency } from '../../../utils/formatter';
import useCart from '../../../hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import '@fontsource/roboto/500.css';
import { customStyles } from './styles';

const sorts = ['A-Z', 'Z-A', 'Lowest Price', 'Highest Price'];

const Featured = () => {
  const { increaseCartQuantity, products } = useCart();

  const addCartHandler = (product: { id: string }) => {
    toast.info('Item added to cart');
    increaseCartQuantity(product.id);
  };

  return (
    <div className={styles.featured}>
      <div style={customStyles.search_wrapper}>
        <TextField
          id="outlined-basic"
          sx={customStyles.searchStyle}
          type="search"
          placeholder="search product"
          variant="outlined"
        />
        <TextField
          id="sort"
          select
          label="Sort"
          defaultValue="A-Z"
          variant="filled"
        >
          {sorts.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <section className={styles.product}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} className={styles.card_item}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <Typography component={'h2'} fontWeight={600}>
                {product.title}
              </Typography>
              <div className={styles.bottom}>
                <Typography
                  component={'h3'}
                  fontWeight={600}
                  marginTop={2}
                  marginBottom={2}
                  fontSize={14}
                >
                  {formatCurrency(product.price * 100)}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth={true}
                  startIcon={<FaShoppingCart />}
                  onClick={() => addCartHandler(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p>No products found!</p>
        )}
      </section>
      <ToastContainer />
    </div>
  );
};

export default Featured;
