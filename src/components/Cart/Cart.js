import React, { Fragment, useState } from "react";
import CartItem from "./CartItem";
import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../../utils/cache";

function Cart(props) {
  const cartItems = useReactiveVar(cartItemsVar);

  console.log(cartItems);

  return (
    <div className="cart">
      <h1>CART:</h1>
      {cartItems.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <>
          {cartItems.map((product) => (
            <CartItem key={product.id + Math.random() * 10} product={product} />
          ))}
        </>
      )}
    </div>
  );
}

export default Cart;
