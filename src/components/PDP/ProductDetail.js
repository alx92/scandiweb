import React from "react";
import DOMPurify from "dompurify";
import styled from "@emotion/styled";
import { cartItemsVar } from "../../utils/cache";

class ProductDetail extends React.Component {
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
          {gallery.slice(1).map((item) => (
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

          <div className="attributes">
            {attributes.map((attr) =>
              attr.type === "swatch" ? (
                <div key={attr.id}>
                  <h4>{attr.id.toUpperCase()}:</h4>

                  <fieldset>
                    {attr.items.map((item) => (
                      <label
                        style={{
                          backgroundColor: `${item.value}`,
                          height: "25px",
                          width: "25px",
                        }}
                        key={item.id}
                      >
                        <input
                          type="radio"
                          name={attr.id}
                          onClick={() => this.props.handleOptions(attr, item)}
                        ></input>
                      </label>
                    ))}
                  </fieldset>
                </div>
              ) : (
                <div key={attr.id}>
                  <h4>{attr.id.toUpperCase()}:</h4>

                  <fieldset>
                    {attr.items.map((item) => (
                      <label key={item.id}>
                        {item.value}
                        <input
                          type="radio"
                          name={attr.id}
                          onClick={() => this.props.handleOptions(attr, item)}
                        ></input>
                      </label>
                    ))}
                  </fieldset>
                </div>
              )
            )}
          </div>

          <h3>PRICE:</h3>
          <h2>
            {prices[0].currency.symbol}
            {prices[0].amount}
          </h2>

          <button onClick={() => this.props.addItem(this.props.product)}>
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
