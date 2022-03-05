import React, { Component } from "react";
import { connect } from "react-redux";
import ProductDetail from "./ProductDetail";
import withRouter from "../../utils/withRouter";
import fetchCategories from "../../redux/categoryActions";

class Product extends Component {
  // componentDidMount() {
  //   this.props.dispatch(fetchCategories());
  // }

  render() {
    const { loading, error, categories } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    const product = categories[0].products.find(
      (prod) => prod.id === this.props.params.id
    );

    return <ProductDetail key={product.id} product={product} />;
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

export default connect(mapStateToProps)(withRouter(Product));
