import React, { Component } from "react";
import CartItem from "./CartItem";
import styled from "@emotion/styled";

class Cart extends Component {
  render() {
    const cartItems = this.props.cartItems;

    return (
      <StyledCart>
        <h2>CART:</h2>
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
      </StyledCart>
    );
  }
}

export default Cart;

const StyledCart = styled.div({
  margin: "0px 60px 60px 60px",
});
