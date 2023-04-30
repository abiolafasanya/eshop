import { useQuery } from 'react-query';
import Axios from '../../api/Axios';

const fetchCategory = (categoryName:string) => {
  return Axios.get(
    `https://fakestoreapi.com/products/category/${categoryName}`
  );
};

export const useCategoryData = (categoryName: string) => {
  return useQuery(['category', categoryName], () =>
    fetchCategory(categoryName)
  );
};