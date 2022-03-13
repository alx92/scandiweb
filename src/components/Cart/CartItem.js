import styled from "@emotion/styled";
import React from "react";

class CartItem extends React.Component {
  render() {
    const { name, gallery, prices, attributes, qty } = this.props.product;

    return (
      <Item>
        <LeftSide>
          <p>{name}</p>
          <div className="attributes">
            {attributes.map((attr) =>
              attr.type === "swatch" ? (
                <div key={attr.id}>
                  <p>{attr.id.toUpperCase()}:</p>
                  <img
                    alt=""
                    style={{
                      backgroundColor: `${attr.value}`,
                      height: "25px",
                      width: "25px",
                    }}
                  />
                </div>
              ) : (
                <div key={attr.id}>
                  <p>{attr.id.toUpperCase()}:</p>

                  <p>{attr.value}</p>
                </div>
              )
            )}
          </div>
          <p>
            {
              prices.find(
                (price) => price.currency.symbol === this.props.symbol
              ).currency.symbol
            }

            {prices.find((price) => price.currency.symbol === this.props.symbol)
              .amount * qty}
          </p>
        </LeftSide>
        <RightSide>
          <QtyChange>
            <button onClick={() => this.props.handleAddQty(this.props.product)}>
              +
            </button>
            <span>{qty}</span>
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
          </QtyChange>
          <CartItemImage>
            <img src={gallery[0]} alt={name} />
          </CartItemImage>
        </RightSide>
      </Item>
    );
  }
}

export default CartItem;

const Item = styled.div({
  justifyContent: "space-between",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  margin: "5px 0px",
});

const LeftSide = styled.div({
  padding: "0px 15px",
});

const RightSide = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0px 15px",
});

const QtyChange = styled.div({
  span: {
    margin: "20px 0px",
  },
  // border: "0.3rem solid red",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "10px",
});

const CartItemImage = styled.div({
  img: {
    // display: "flex",
    height: "100px",
    width: "100px",
    objectFit: "contain",
    // marginBottom: "10px",
  },
  // cursor: "pointer",
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
});
