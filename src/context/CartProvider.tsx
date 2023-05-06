import React, { useState, createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import product from '../api/product';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { productType } from '../types';

interface CartItem {
  id: string;
  quantity: number;
}

interface ShoppingCartContext {
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeCartQuantity: (id: string) => void;
  isOpen: boolean;
  categoryParam: string;
  handleParamSearch: (param: string) => void;
  toggleCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  total: number;
  getTotal: () => number;
  products: productType[];
  categories: string[];
  setTotal: (total: number) => void;
  cartTotal: (data: productType[]) => number;
  singleCategory: productType[];
}

export const CartContext = createContext<ShoppingCartContext>({
  getItemQuantity: () => 0,
  increaseCartQuantity: () => undefined,
  decreaseCartQuantity: () => undefined,
  removeCartQuantity: () => undefined,
  isOpen: false,
  toggleCart: () => undefined,
  cartQuantity: 0,
  cartItems: [],
  total: 0,
  getTotal: () => 0,
  products: [],
  categories: [],
  singleCategory:  [],
  setTotal: () => undefined,
  cartTotal: () => 0,
  handleParamSearch: () => [],
  categoryParam: '',
});

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );
  const { data: products } = useQuery<productType[]>({
    queryKey: ['products'],
    queryFn: product.getProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: product.findCategories,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [categoryParam, setCategoryParam] = useState("electronics");

  const toggleCart = () => {
    setIsOpen((bool) => !bool);
  };

  const getCategory = async ({ queryKey }: QueryFunctionContext<string[], unknown>) => {
    const categoryParam = queryKey[1];
    const response = await product.getCategory(categoryParam);
    return response;
  };
  
  const { data: singleCategory } = useQuery(['categories', categoryParam], getCategory);
  
  

  const handleParamSearch = (param: string) => {
    setCategoryParam(param);
  };

  const getItemQuantity = (id: string): number => {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
  };

  const increaseCartQuantity = (id: string) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: string) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeCartQuantity = (id: string) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  const getTotal = (): number => {
    const total = cartTotal(products ?? []);
    return total;
  };

  const cartQuantity = cartItems.reduce(
    (prev, item) => prev + item.quantity,
    0
  );

  const cartTotal = (data: productType[]): number => {
    return cartItems.reduce((total, cartItem) => {
      const item = data?.find((item) => item.id === cartItem.id);
      return total + (item?.price ?? 0) * cartItem.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartQuantity,
        cartItems,
        isOpen,
        cartQuantity,
        toggleCart,
        setTotal,
        total,
        cartTotal,
        getTotal,
        products: products ?? [],
        categories: categories ?? [],
        singleCategory: singleCategory ?? [],
        categoryParam,
        handleParamSearch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
