import { productType } from "../../../types";

interface ItemType {
  cartItems: productType[];
  products: productType[];
}

function CartCheckoutItem({ cartItems, products}: ItemType) {
  // const { cartItems, products} = props;

  return (
    <div>
      {cartItems?.map((item, i) => {
        const product = products?.find((p) => p.id === item.id);
        return (
          <div key={i}>
            {product ? <span key={Date.now()}>{product.title}</span> : ""}
          </div>
        );
      })}
    </div>
  );
}

export default CartCheckoutItem;
