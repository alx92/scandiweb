import React from "react";

class CartItem extends React.Component {
  render() {
    const { name, gallery, prices, attributes, qty } = this.props.product;
    // console.log("CartItem re-rendered!");

    return (
      <div className="cart-item">
        <h3>{name}</h3>
        <h3>
          {
            prices.find((price) => price.currency.symbol === this.props.symbol)
              .currency.symbol
          }

          {(
            Math.round(
              prices.find(
                (price) => price.currency.symbol === this.props.symbol
              ).amount *
                qty *
                100
            ) / 100
          ).toFixed(2)}
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
        <button onClick={() => this.props.handleAddQty(this.props.product)}>
          +
        </button>
        <span>Qty:{qty}</span>
        <button
          onClick={() => {
            if (qty > 1) {
              this.props.handleSubQty(this.props.product);
            } else {
              this.props.handleRemove(this.props.product);
            }
          }}
        >
          -
        </button>
      </div>
    );
  }
}

export default CartItem;
