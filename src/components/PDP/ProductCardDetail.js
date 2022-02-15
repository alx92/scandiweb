import React from "react";

const ProductCardDetail = ({ product }) => {
  const { name, description, gallery, prices, attributes } = product;
  return (
    <div>
      <div className="image-container">
        <img height="50%" width="50%" src={gallery[0]} alt={name}></img>
      </div>
      <div className="small-img-container">
        {gallery.map((item) => (
          <img key={item} height="10%" width="10%" src={item} alt={name}></img>
        ))}
      </div>
      <div className="produc-details">
        <h3>{name}</h3>
        <div className="attributes">
          <h3>{attributes[0].id}:</h3>
          {attributes?.map((attr) =>
            attr.items?.map((item) => <div key={item.id}>{item.value}</div>)
          )}
        </div>
        <div dangerouslySetInnerHTML={createMarkup(description)}></div>
        <h3>Price:</h3>
        <h2>
          {prices[0].currency.symbol}
          {prices[0].amount}
        </h2>
      </div>
    </div>
  );
};

function createMarkup(description) {
  return { __html: description };
}

export default ProductCardDetail;
