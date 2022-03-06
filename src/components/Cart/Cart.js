import React, { Component } from "react";
import CartItem from "./CartItem";

class Cart extends Component {
  render() {
    const cartItems = this.props.cartItems;
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
              />
            ))}
            <h3>TOTAL:</h3>
            <h2></h2>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
