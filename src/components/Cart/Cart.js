import React, { Fragment, useState } from "react";
import CartItem from "./CartItem";
import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../../utils/cache";

function Cart() {
  let cartItems = useReactiveVar(cartItemsVar);
  let total = "";
  let symbol = "";

  cartItems.forEach((item) => (total += item.prices[0].amount * item.qty));

  if (cartItems[0] !== undefined) {
    symbol = cartItems[0].prices[0].currency.symbol;
  }

  function handleAdd() {}

  function handleRemove() {}

  return (
    <div className="cart">
      <h1>CART:</h1>
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div>
          {cartItems.map((product) => (
            <CartItem
              key={product.id + Math.random() * 10}
              product={product}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
            />
          ))}
          <h3>TOTAL:</h3>
          <h2>
            {symbol}
            {total}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Cart;
