import React from "react";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        ...this.props.product,
        qty: this.props.product.qty,
      },
    };
  }

  render() {
    console.log(this.state.product);
    const { name, gallery, prices, attributes, qty } = this.state.product;

    return (
      <div>
        <h3>{name}</h3>
        <h2>
          {prices[0].currency.symbol}
          {prices[0].amount * qty}
        </h2>
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
        <button>+</button>
        <span>Qty:{qty}</span>
        <button>-</button>
      </div>
    );
  }
}

export default CartItem;
