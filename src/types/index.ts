export type PropTypes = {
    [name: string]: React.PropsWithChildren | unknown | React.SyntheticEvent;
};


export interface Iprops extends React.PropsWithChildren {
    action?: unknown;
    className?: unknown;
    type?: unknown;
    data?: unknown;
    title?: unknown;
    footer?: unknown;
    message?: unknown;
  }

  export type CartItemProps = {
    id: string;
    quantity: number;
  };

  export type productType = {
    id: string;
    image: string;
    title: string;
    price: number;
    category: string;
    description: string;
    rating: {
      count: number;
      rate: number;
    };
  };

  export interface CartItem {
    id: string;
    quantity: number;
  }

  export type itemType = {
    id: string;
    product: productType;
    quantity: number;
  }
  