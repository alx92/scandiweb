import styled from "@emotion/styled";
import React from "react";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.prev = React.createRef();
    this.next = React.createRef();
    this.changeIndex = this.changeIndex.bind(this);
  }

  changeIndex(n) {
    if (this.state.slideIndex === 0 && n === -1) {
      this.setState({ slideIndex: this.props.product.gallery.length - 1 });
    } else if (this.state.slideIndex <= this.props.product.gallery.length - 1) {
      this.setState({ slideIndex: this.state.slideIndex + n });
    }

    if (
      this.state.slideIndex === this.props.product.gallery.length - 1 &&
      n > 0
    ) {
      this.setState({ slideIndex: 0 });
    }
  }

  render() {
    const { name, gallery, prices, attributes, qty } = this.props.product;

    return (
      <Item>
        <LeftSide>
          <h4>{name}</h4>
          <div className="attributes">
            {attributes.map((attr) =>
              attr.type === "swatch" ? (
                <div key={attr.id}>
                  <h5>{attr.id.toUpperCase()}:</h5>
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
                  <h5>{attr.id.toUpperCase()}:</h5>

                  <h4>{attr.value}</h4>
                </div>
              )
            )}
          </div>
          <h3>
            {
              prices.find(
                (price) => price.currency.symbol === this.props.symbol
              ).currency.symbol
            }

            {Math.round(
              prices.find(
                (price) => price.currency.symbol === this.props.symbol
              ).amount *
                qty *
                100
            ) / 100}
          </h3>
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
            <a
              ref={this.prev}
              className="prev"
              onClick={() => this.changeIndex(-1)}
            >
              &#10094;
            </a>
            <img src={gallery[this.state.slideIndex]} alt={name} />
            <a
              ref={this.next}
              className="next"
              onClick={() => this.changeIndex(1)}
            >
              &#10095;
            </a>
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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "10px",
});

const CartItemImage = styled.div({
  img: {
    height: "100px",
    width: "100px",
    objectFit: "contain",
  },
  position: "relative",
  a: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    width: "auto",
    marginTop: "-22px",
    padding: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
  },

  ".next": {
    right: 0,
    borderRadius: "3px 0 0 3px",
  },

  ".prev:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
  ".next:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
});
