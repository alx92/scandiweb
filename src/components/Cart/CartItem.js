import React from "react";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: this.props.product.qty,
    };
  }

  render() {
    // console.log(this.state.product);
    const { name, gallery, prices, attributes, qty } = this.props.product;

    return (
      <div>
        <h3>{name}</h3>
        <h3>
          {prices[0].currency.symbol}
          {prices[0].amount * qty}
        </h3>
        <div className="attributes">
          {attributes.map((attr) =>
            attr.type === "swatch" ? (
              <div key={attr.id}>
                <h4>{attr.id.toUpperCase()}:</h4>
                <img
                  style={{
                    backgroundColor: `${attr.value}`,
                    height: "25px",
                    width: "25px",
                  }}
                />
              </div>
            ) : (
              <div key={attr.id}>
                <h4>{attr.id.toUpperCase()}:</h4>

                <h3>{attr.value}</h3>
              </div>
            )
          )}
        </div>
        <button onClick={() => this.props.handleAdd()}>+</button>
        <span>Qty:{qty}</span>
        <button onClick={() => this.props.handleRemove(this.props.product)}>
          -
        </button>
      </div>
    );
  }
}

export default CartItem;
