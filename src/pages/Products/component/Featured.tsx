import styles from '../Products.module.scss';
import { formatCurrency } from '../../../utils/formatter';
import useCart from '../../../hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import '@fontsource/roboto/500.css';
import { productType } from '../../../types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SORT, sortProduct } from '../../Categories/request';
import Spinner from '../../../components/Loader/Spinner';

type SortOption = keyof typeof SORT;
const sorts: SortOption[] = ['A-Z', 'Z-A', 'Lowest Price', 'Highest Price'];

const Featured = () => {
  const { increaseCartQuantity, products: data } = useCart();
  const [text, setText] = useState('');
  const [products, setProducts] = useState(data as productType[]);
  const [suggestions, setSuggestions] = useState<productType[]>([]);
  const [sort, setSort] = useState(SORT['A-Z']);
  const [loading, setLoading] = useState(true);

  const addCartHandler = (product: { id: string }) => {
    toast.info('Item added to cart');
    increaseCartQuantity(product.id);
  };

  useEffect(() => {
    const sortedProduct = sortProduct(data);
    setProducts(() => sortedProduct);
    setLoading(false);
  }, [data, sort]);

  const handleSort = (option: SortOption) => {
    console.log(option);
    const data = sortProduct(products, SORT[option]);
    setSort(SORT[option]);
    setProducts(() => data);
  };

  const handleInputChange = (input: string) => {
    console.log(input);
    let matches: productType[];
    if (input.length > 0) {
      matches = products.filter((product) => {
        const regex = new RegExp(`${input}`, 'gi');
        return product.title.match(regex);
      });
      setSuggestions(matches);
      console.log(matches);
    }
    setText(input);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.featured}>
          <div className={styles.search_wrapper}>
            <div className={styles.searchBox}>
              <TextField
                id="outlined-basic"
                className={styles.searchStyle}
                type="search"
                placeholder="search product"
                variant="outlined"
                value={text}
                onChange={({ target }) => handleInputChange(target.value)}
              />
              {text.length > 0 && suggestions.length > 0 && (
                <div className={styles.suggestion}>
                  {suggestions.map((suggestion) => (
                    <Link
                      className={styles.link}
                      to={`/product/${suggestion.id}`}
                      key={suggestion?.id}
                    >
                      {suggestion?.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <TextField
              id="sort"
              select
              label="Sort"
              defaultValue="A-Z"
              variant="filled"
              className={styles.sortStyle}
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
          <section style={{ margin: '2rem' }}>
            <h2>All Products</h2>
          </section>
          <section className={styles.product}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id} className={styles.card_item}>
                  <Link to={`/product/${product.id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.title}
                  />
                  <Typography component={'h2'} fontWeight={600}>
                    {product.title}
                  </Typography></Link>
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
      )}
    </React.Fragment>
  );
};

export default Featured;
