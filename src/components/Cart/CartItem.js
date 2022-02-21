import React from "react";
import DOMPurify from "dompurify";

class CartItem extends React.Component {
  render() {
    const { name, description } = this.props.product;

    return (
      <div>
        CartItem
        {name}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />
      </div>
    );
  }
}

export default CartItem;
