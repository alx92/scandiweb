import React, { Component } from "react";
import ProductCard from "./ProductCard";
import styled from "@emotion/styled";

class Category extends Component {
  render() {
    const { name, products } = this.props.categories;

    return (
      <CategoryContainer>
        <h1>{name.toUpperCase()}</h1>

        {products.map((prod) => (
          <div key={prod.id}>
            <ProductCard product={prod} symbol={this.props.symbol} />
          </div>
        ))}
      </CategoryContainer>
    );
  }
}

export default Category;

const CategoryContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  border: "4px solid black",
});
