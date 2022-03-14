import React, { Component } from "react";
import DOMPurify from "dompurify";
import styled from "@emotion/styled";
import AttributeSet from "./AttributeSet";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.featuredImg = React.createRef();
  }

  render() {
    // console.log(this.state.attr);
    const { name, gallery, attributes, prices, description, inStock } =
      this.props.product;

    return (
      <MainContainer inStock={inStock}>
        <Gallery>
          {gallery.map((item) => (
            <FitImage key={item}>
              <img
                src={item}
                alt={name}
                onClick={() => {
                  this.featuredImg.current.src = item;
                }}
              />
            </FitImage>
          ))}
        </Gallery>

        <MainImage>
          <img ref={this.featuredImg} src={gallery[0]} alt={name}></img>
        </MainImage>
        {!inStock ? <strong className="out-of-stock">OUT OF STOCK</strong> : ""}

        <ProductDetails>
          <h3>{name}</h3>

          <AttributeSet
            inStock={inStock}
            attributes={attributes}
            handleOptions={this.props.handleOptions}
          />

          <h3>PRICE:</h3>
          <h2>
            {
              prices.find(
                (price) => price.currency.symbol === this.props.symbol
              ).currency.symbol
            }
            {
              prices.find(
                (price) => price.currency.symbol === this.props.symbol
              ).amount
            }
          </h2>

          <button
            disabled={!inStock}
            onClick={() => this.props.handleAddItem(this.props.product)}
          >
            ADD TO CART
          </button>

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        </ProductDetails>
      </MainContainer>
    );
  }
}

export default ProductDetail;

const MainContainer = styled.div((props) =>
  !props.inStock
    ? {
        opacity: "0.4",
        filter: "alpha(opacity=40)",
        display: "flex",
        margin: "0px 60px 60px 60px",
        ".out-of-stock": {
          position: "absolute",
          top: "40%",
          right: "50%",
          fontSize: "2.5em",
          fontWeight: "700",
        },
      }
    : {
        display: "flex",
        margin: "0px 60px 60px 60px",
      }
);

const FitImage = styled.div({
  img: {
    display: "block",
    height: "100%",
    width: "100%",
    objectFit: "fill",
    marginBottom: "10px",
  },
  cursor: "pointer",
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
});

const Gallery = styled.div({
  flex: "0.5",
  marginRight: "15px",
});

const MainImage = styled.div({
  flex: "2",
  img: {
    height: "60vh",
    width: "60vw",
    objectFit: "contain",
  },
});

const ProductDetails = styled.div({
  flex: "1.5",
  button: {
    backgroundColor: "#6dc93e",
    color: "white",
    border: "none",
    padding: "10px 30px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "12px",
    cursor: "pointer",
  },
});
