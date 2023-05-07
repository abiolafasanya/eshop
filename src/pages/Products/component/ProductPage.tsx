// import { Typography } from '@mui/material';
import styles from './ProductPage.module.scss';
import { productType } from '../../../types';
import Axios from '../../../api/Axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../../utils/formatter';
import Spinner from '../../../components/Loader/Spinner';
import GradeIcon from '@mui/icons-material/Grade';
import useCart from '../../../hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';

// function getProduct()

const ProductPage = () => {
  const id = useLocation().pathname.split('/')[2];
  const [product, setProduct] = useState<productType | null>(null);
  const [loading, setLoading] = useState(true);
  const { increaseCartQuantity, decreaseCartQuantity, cartItems } = useCart();

  useEffect(() => {
    async function getProduct() {
      try {
        const { data, status } = await Axios.get<productType>(
          '/products/' + id
        );
        if (status === 200) {
          setProduct(data);
          setLoading(false);
        }
        console.log(data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  const handleAddToCart = (id: string) => {
    toast.info(`Item added to cart`);
    increaseCartQuantity(id);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h2>Product Page</h2>
          <section className={styles.product}>
            <div className={styles.product_image_container}>
              <img src={product?.image} alt="product image" />
            </div>
            <article className={styles.product_info}>
              <h3 className={styles.product_info_title}>{product?.title}</h3>
              <h5 className={styles.product_info_price}>
                Price: {formatCurrency((product?.price as number) * 100)}
              </h5>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '1rem',
                }}
              >
                <GradeIcon color="warning" />
                {product?.rating.rate}
              </span>
              <p className={styles.product_info_description}>
                {product?.description}
              </p>
              <div className={styles.product_info_category}>
                <h3>Category</h3>
                <span>{product?.category}</span>
              </div>
              <section className={styles.product_info_btnGroup}>
                <button
                  className={styles.product_info_btn}
                  onClick={() => increaseCartQuantity(product?.id as string)}
                >
                  Add to Cart
                </button>
                <div className={styles.product_info_countBtn}>
                  <Button
                    className={styles.count_btn}
                    onClick={() => decreaseCartQuantity(product?.id as string)}
                  >
                    -
                  </Button>
                  <div>
                    {cartItems.map((item, index) => (
                      <span key={index}>
                        {item?.id == product?.id && (
                          <span>{item.quantity}</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <Button
                    className={styles.count_btn}
                    onClick={() => handleAddToCart(product?.id as string)}
                  >
                    +
                  </Button>
                </div>
              </section>
            </article>
          </section>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default ProductPage;
