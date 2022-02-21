import React from "react";
import ProductItem from "./ProductItem";
import styled from "@emotion/styled";

class Category extends React.Component {
  render() {
    return (
      <CategoryContainer>
        <h1>{this.props.categories.name.toUpperCase()}</h1>

        {this.props.categories.products?.map((prod) => (
          <div key={prod.id}>
            <ProductItem product={prod} />
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
