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
                symbol={this.props.symbol}
                handleAddQty={this.props.handleAddQty}
                handleSubQty={this.props.handleSubQty}
                handleRemove={this.props.handleRemove}
              />
            ))}
            <h3>TOTAL:</h3>
            <h3>
              {this.props.symbol}
              {(
                Math.round(
                  this.props.total.find(
                    (item) => item.currency.symbol === this.props.symbol
                  ).amount * 100
                ) / 100
              ).toFixed(2)}
            </h3>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
