import { productType } from '../types';

// Sort by title ascending
const sortAscending = (arr: productType[]) =>
  arr.sort((a, b) => a.title.localeCompare(b.title));

// Sort by title descending
const sortDescending = (arr: productType[]) =>
  arr.sort((a, b) => b.title.localeCompare(a.title));

// Sort by lowest price
const sortLowest = (arr: productType[]) =>
  arr.sort((a, b) => a.price - b.price);

// Sort by highest price
const sortHighest = (arr: productType[]) => {
    return arr.sort((a, b) => b.price - a.price);
};

export { sortAscending, sortDescending, sortHighest, sortLowest };
