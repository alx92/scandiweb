import React from "react";
import DOMPurify from "dompurify";
import styled from "@emotion/styled";
import { cartItemsVar } from "../../utils/cache";

class ProductCardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attr: []
    };


  }

  render() {
    console.log(this.state.attr);

    return (
      <MainContainer>
        <Gallery>
          {this.props.product.gallery.map((item) => (
            <FitImage key={item}>
              <a href={item}>
                <img
                  src={item}
                  alt={this.props.product.name}
                />
              </a>
            </FitImage>
          ))}
        </Gallery>

        <MainImage>
          <img
            src={this.props.product.gallery[0]}
            alt={this.props.product.name}
          ></img>
        </MainImage>

        <ProductDetails>

          <h3>{this.props.product.name}</h3>

          <div className="attributes">
            {this.props.product.attributes.map((attr) =>
              attr.type === "swatch" ?
                (
                  <div key={attr.id}>
                    <h4>{attr.id.toUpperCase()}:</h4>

                    {attr.items.map((item) => (
                      <button
                        onClick={() => this.setState({
                          attr: [
                            {
                              id: attr.id,
                              value: item.value
                            }
                          ]
                        })}

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
                        onClick={() => this.setState({
                          attr: [
                            {
                              id: attr.id,
                              value: item.id
                            }
                          ]
                        })}

                        key={item.id}
                      >
                        {item.value}
                      </button>
                    ))}
                  </div>
                )
            )}
          </div>

          <h3>PRICE:</h3>
          <h2>
            {this.props.product.prices[0].currency.symbol}
            {this.props.product.prices[0].amount}
          </h2>

          <button
            onClick={() => cartItemsVar([...cartItemsVar(), this.props.product])}

          >
            ADD TO CART
          </button>

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(this.props.product.description),
            }}
          />

        </ProductDetails>
      </MainContainer>
    );
  }
}

export default ProductCardDetail;

const MainContainer = styled.div({
  display: "flex",
});

const FitImage = styled.div({
  img: {
    display: "block",
    height: "100%",
    width: "100%",
    objectFit: "fill",
  }
})

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
    objectFit: "contain"
  },
});

const ProductDetails = styled.div({
  flex: "1.5",
});
