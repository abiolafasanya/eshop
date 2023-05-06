import { useQuery } from 'react-query';
import Axios from '../../api/Axios';
import { productType } from '../../types';

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

export enum CATEGORY {
  Electronic = 'electronics',
  Jewery = 'jewelery',
  Men = "men's clothing",
  Women = "women's clothing",
}

export enum SORT {
  'A-Z',
  'Z-A',
  'Lowest Price',
  'Highest Price',
}

export const sortProduct = (data: productType[], sortType: SORT = SORT['A-Z']) => {
  switch(sortType) {
    case SORT['A-Z']:
      data.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case SORT['Z-A']:
      data.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case SORT['Lowest Price']:
      data.sort((a, b) => a.price - b.price);
      break;
    case SORT['Highest Price']:
      data.sort((a, b) => b.price - a.price);
      break;
    default:
      console.log('Invalid sort type');
  }
  return data;
}