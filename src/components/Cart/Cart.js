import React, { Fragment } from "react";
import CartItem from "./CartItem";
import { useReactiveVar } from "@apollo/client"
import { cartItemsVar } from "../../utils/cache";

function Cart() {
  const cartItems = useReactiveVar(cartItemsVar);

  return (
    <div className="cart">
      CART:
      {cartItems.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <Fragment>
          {cartItems.map(product => (
            <CartItem key={product.id} product={product} />
          ))}
        </Fragment>
      )}
    </div>
  )
}


export default Cart;