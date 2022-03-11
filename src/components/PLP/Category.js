import React, { Component } from "react";
import ProductCard from "./ProductCard";
import styled from "@emotion/styled";

class Category extends Component {
  render() {
    const { name, products } = this.props.categories;

    return (
      <>
        <CategoryName>{name.toUpperCase()}</CategoryName>
        <CategoryContainer>
          {products.map((prod) => (
            <div key={prod.id}>
              <ProductCard product={prod} symbol={this.props.symbol} />
            </div>
          ))}
        </CategoryContainer>
      </>
    );
  }
}

export default Category;

const CategoryContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 2fr))",
  gridGap: "20px",
  flexDirection: "column",
  marginTop: "60px",
  margin: "0px 60px 60px 60px",
  // border: "4px solid black",
});

const CategoryName = styled.h1({
  margin: "0px 60px 60px 60px",
});
