import React from "react";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  render() {
    return (
      <div>
        CART
        <CartItem />
      </div>
    );
  }
}

export default Cart;
