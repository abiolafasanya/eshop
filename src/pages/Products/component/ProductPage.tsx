// import { Typography } from '@mui/material';
import styles from './ProductPage.module.scss';
import { productType } from '../../../types';
import Axios from '../../../api/Axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../../utils/formatter';

// function getProduct()


const ProductPage = () => {
  const id = useLocation().pathname.split('/')[2];
  const [product, setProduct] = useState<productType | null>(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const { data, status } = await Axios.get<productType>(
          '/products/' + id
        );
        if (status === 200) {
          setProduct(data);
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    getProduct();
  }, [id]);

  // const { data: products } = useQuery<productType>({
  //   queryKey: ['products'],
  //   // queryFn: product.getProducts,
  // });
  return (
    <div className={styles.container}>
      <h2>Product Page</h2>
      <section className={styles.product}>
        <div className={styles.product_image_container}>
          <img src={product?.image} alt="product image" />
        </div>
        <article className={styles.product_info}>
          <h3 className={styles.product_info_title}>{product?.title}</h3>
          <h5 className={styles.product_info_price}>{formatCurrency(product?.price as number)}</h5>
          <span>Rating: {product?.rating.rate}</span>
          <p className={styles.product_info_description}>
            {product?.description}
          </p>
          <div className={styles.product_info_category}>{product?.category}</div>

          <button className={styles.product_info_btn}>Add to Cart</button>
        </article>
      </section>
    </div>
  );
};

export default ProductPage;
