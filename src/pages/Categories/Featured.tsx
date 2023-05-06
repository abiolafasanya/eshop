import styles from './Categories.module.scss';
import { formatCurrency } from '../../utils/formatter';
import useCart from '../../hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import '@fontsource/roboto/500.css';
import { productType } from '../../types';
import { useEffect, useState } from 'react';
import { CATEGORY, SORT, sortProduct } from './request';

type SortOption = keyof typeof SORT;
const sorts: SortOption[] = ['A-Z', 'Z-A', 'Lowest Price', 'Highest Price'];
// console.log(sortedProducts);

const Featured = () => {
  const {
    increaseCartQuantity,
    singleCategory,
    handleParamSearch,
    // categoryParam,
  } = useCart();
  const [products, setProducts] = useState([] as productType[]);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const data = singleCategory;
    const sortedProduct = sortProduct(data);
    setProducts(() => sortedProduct);
  }, [singleCategory]);

  const addCartHandler = (product: { id: string }) => {
    toast.info('Item added to cart');
    increaseCartQuantity(product.id);
  };

  const handleSort = (option: SortOption) => {
    const data = sortProduct(products, SORT[option]);
    setTrigger((trigger) => trigger + 1);
    console.log(data, 'couunt: ',trigger)
    setProducts(() => data);
  };

  const handleSearch = (text: string) => {
    let matches :unknown[] = [];
    if(text.length > 0) {
      matches = products.filter(product => {
        const regex = new RegExp(`${text}`, "gi")
        return product.title.match(regex)
      })
    }
  };

  return (
    <div className={styles.featured}>
      <div className={styles.search_wrapper}>
        <TextField
          id="outlined-basic"
          className={styles.searchStyle}
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
            <MenuItem
              key={option}
              value={option}
              onClick={() => handleSort(option)}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <section className={styles.tab}>
        <Button onClick={() => handleParamSearch(CATEGORY.Electronic)}>
          Electronics
        </Button>
        <Button onClick={() => handleParamSearch(CATEGORY.Jewery)}>
          Jewelery
        </Button>
        <Button onClick={() => handleParamSearch(CATEGORY.Men)}>
          Men Clothing
        </Button>
        <Button onClick={() => handleParamSearch(CATEGORY.Women)}>
          Women Clothing
        </Button>
      </section>
      <section className={styles.product}>
        {products && products.length > 0 ? (
          products?.map((product) => (
            <Card key={product.id} className={styles.card_item}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <Typography
                component={'h2'}
                fontWeight={600}
                // fontSize={16}
              >
                {product.title}
              </Typography>
              <div>
                <Typography
                  component={'h3'}
                  fontWeight={600}
                  marginTop={2}
                  marginBottom={2}
                  fontSize={14}
                >
                  {formatCurrency(product.price * 100)}
                </Typography>
                <Typography
                  component={'h3'}
                  fontWeight={600}
                  marginTop={2}
                  marginBottom={2}
                  fontSize={14}
                >
                  {formatCurrency(product.rating.rate * 100)}
                </Typography>
              </div>
              <Button
                variant="contained"
                fullWidth={true}
                startIcon={<FaShoppingCart />}
                onClick={() => addCartHandler(product)}
              >
                Add to Cart
              </Button>
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
