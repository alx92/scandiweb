import React, { Component } from "react";
import ProductDetail from "./ProductDetail";
import withRouter from "../../utils/withRouter";

/* 
  ------------- Product Component -------------
*/

class Product extends Component {
  render() {
    // Getting this from localStorage in order to avoid page crash on reload;
    const product = JSON.parse(localStorage.getItem("cat"))[0].products.find(
      (prod) => prod.id === this.props.params.id
    );

    return (
      <ProductDetail
        key={product.id}
        product={product}
        symbol={this.props.symbol}
        handleOptions={this.props.handleOptions}
        handleAddItem={this.props.handleAddItem}
      />
    );
  }
}

export default withRouter(Product);
