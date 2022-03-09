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
    const { name, gallery, attributes, prices, description } =
      this.props.product;

    return (
      <MainContainer>
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

        <ProductDetails>
          <h3>{name}</h3>

          <AttributeSet
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

          <button onClick={() => this.props.handleAddItem(this.props.product)}>
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

const MainContainer = styled.div({
  display: "flex",
});

const FitImage = styled.div({
  img: {
    display: "block",
    height: "100%",
    width: "100%",
    objectFit: "fill",
  },
});

const Gallery = styled.div({
  border: "1rem solid red",
  flex: "0.5",
});

const MainImage = styled.div({
  border: "1rem solid red",
  flex: "2",
  img: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
});

const ProductDetails = styled.div({
  flex: "1.5",
});
