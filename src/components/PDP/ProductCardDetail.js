import React from "react";
import DOMPurify from "dompurify";
import styled from "@emotion/styled";

const ProductCardDetail = ({ product }) => {
  const { name, description, gallery, prices, attributes } = product;

  return (
    <MainContainer>
      <SmallImages>
        {gallery.map((item) => (
          <img key={item} src={item} alt={name}></img>
        ))}
      </SmallImages>

      <MainImage>
        <img src={gallery[0]} alt={name}></img>
      </MainImage>

      <ProductDetails>
        <h3>{name}</h3>
        <div className="attributes">
          {attributes.map((attr) =>
            attr.type === "swatch" ? (
              <div key={attr.id}>
                <h4>{attr.id.toUpperCase()}:</h4>

                {attr.items.map((item) => (
                  <button
                    style={{
                      backgroundColor: `${item.value}`,
                      height: "25px",
                      width: "25px",
                    }}
                    className="options"
                    key={item.id}
                  ></button>
                ))}
              </div>
            ) : (
              <div key={attr.id}>
                <h4>{attr.id.toUpperCase()}:</h4>

                {attr.items.map((item) => (
                  <button className="options" key={item.id}>
                    {item.value}
                  </button>
                ))}
              </div>
            )
          )}
        </div>

        <h3>PRICE:</h3>
        <h2>
          {prices[0].currency.symbol}
          {prices[0].amount}
        </h2>

        <button>ADD TO CART</button>

        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />
      </ProductDetails>
    </MainContainer>
  );
};

export default ProductCardDetail;

const MainContainer = styled.div({ display: "flex" });

const SmallImages = styled.div({
  border: "1rem solid red",
  flex: "0.5",
  img: {
    display: "block",
    height: "auto",
    maxWidth: "90%",
    margin: "auto",
    padding: "5px",
    backgroundColor: "lightgray",
    verticalAlign: "middle",
  },
});

const MainImage = styled.div({
  border: "1rem solid red",
  flex: "2",
  img: { height: "auto", paddingTop: "25%", maxWidth: "100%" },
});

const ProductDetails = styled.div({
  flex: "1.5",
});
