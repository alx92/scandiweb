import React from "react";
import DOMPurify from "dompurify";
import styled from "@emotion/styled";
import { cartItemsVar } from "../../utils/cache";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.featuredImg = React.createRef();
    this.state = {
      attr: [],
    };
  }

  objectsEqual(o1, o2) {
    return (
      Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => o1[p] === o2[p])
    );
  }

  arraysEqual(a1, a2) {
    return (
      a1.length === a2.length &&
      a1.every((item, index) => this.objectsEqual(item, a2[index]))
    );
  }

  filterProd() {
    let options = this.state.attr;

    options = options.filter(
      (value, index, self) =>
        index === self.findIndex((obj) => obj.id === value.id)
    );

    return {
      id: this.props.product.id,
      name: this.props.product.name,
      attributes: options,
      prices: this.props.product.prices,
    };
  }

  addItem() {
    const finalProd = this.filterProd();
    var cartItems = cartItemsVar();
    const alreadyAdded = cartItems.find(
      (item) =>
        item.id === finalProd.id &&
        this.arraysEqual(item.attributes, finalProd.attributes)
    );

    console.log(finalProd);
    console.log(cartItems);
    console.log(alreadyAdded);

    if (alreadyAdded) {
      cartItems = cartItems.map((item) =>
        item.id === finalProd.id &&
        this.arraysEqual(item.attributes, finalProd.attributes)
          ? { ...alreadyAdded, qty: alreadyAdded.qty + 1 }
          : item
      );
      cartItemsVar([...cartItems]);
    } else {
      cartItemsVar([...cartItems, { ...finalProd, qty: 1 }]);
    }
  }

  render() {
    console.log(this.state.attr);

    return (
      <MainContainer>
        <Gallery>
          {this.props.product.gallery.slice(1).map((item) => (
            <FitImage key={item}>
              <img
                src={item}
                alt={this.props.product.name}
                onClick={() => {
                  this.featuredImg.current.src = item;
                }}
              />
            </FitImage>
          ))}
        </Gallery>

        <MainImage>
          <img
            ref={this.featuredImg}
            src={this.props.product.gallery[0]}
            alt={this.props.product.name}
          ></img>
        </MainImage>

        <ProductDetails>
          <h3>{this.props.product.name}</h3>

          <div className="attributes">
            {this.props.product.attributes.map((attr) =>
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
                          onClick={() =>
                            this.setState({
                              attr: [
                                {
                                  id: attr.id,
                                  value: item.value,
                                  type: attr.type,
                                },
                                ...this.state.attr,
                              ],
                            })
                          }
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
                          onClick={() =>
                            this.setState({
                              attr: [
                                {
                                  id: attr.id,
                                  value: item.value,
                                  type: attr.type,
                                },
                                ...this.state.attr,
                              ],
                            })
                          }
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
            {this.props.product.prices[0].currency.symbol}
            {this.props.product.prices[0].amount}
          </h2>

          <button
            onClick={() => {
              this.addItem();

              // { cartItemsVar([...cartItemsVar(), finalProd]); }

              // if (finalProd.attributes.length === 0 && finalProd.id !== 'apple-airtag')
            }}
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
