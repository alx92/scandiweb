import React from "react";

class CartItem extends React.Component {
  render() {
    const { name, gallery, prices, attributes } = this.props.product;

    return (
      <div>
        <h3>{name}</h3>
        <h2>
          {prices[0].currency.symbol}
          {prices[0].amount}
        </h2>
        <div className="attributes">
          {attributes.map((attr) =>
            attr.type === "swatch" ?
              (
                <div key={attr.id}>
                  <h4>{attr.id.toUpperCase()}:</h4>

                  {attr.items.map((item) => (
                    <button
                      style={{
                        backgroundColor: `${item.value}`,
                        height: "25px",
                        width: "25px",
                      }}
                      key={item.id}
                    ></button>
                  ))}
                </div>
              ) :
              (
                <div key={attr.id}>
                  <h4>{attr.id.toUpperCase()}:</h4>

                  {attr.items.map((item) => (
                    <button
                      key={item.id}
                    >
                      {item.value}
                    </button>
                  ))}
                </div>
              )
          )}
        </div>
      </div>
    );
  }
}

export default CartItem;
