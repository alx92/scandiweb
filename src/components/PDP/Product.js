import React, { Component } from "react";
import ProductDetail from "./ProductDetail";
import withRouter from "../../utils/withRouter";

class Product extends Component {
  render() {
    const product = this.props.cat[0].products.find(
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
