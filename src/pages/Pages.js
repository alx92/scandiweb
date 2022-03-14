import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import CategoryList from "../components/PLP/CategoryList";
import Product from "../components/PDP/Product";
import Cart from "../components/Cart/Cart";
import styled from "@emotion/styled";

class Pages extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <CategoryList
                name="all"
                cat={this.props.cat}
                currencies={this.props.currencies}
                symbol={this.props.symbol}
              />
            }
          />
          <Route
            path="/clothes"
            element={
              <CategoryList
                name="clothes"
                cat={this.props.cat}
                symbol={this.props.symbol}
              />
            }
          />
          <Route
            path="/tech"
            element={
              <CategoryList
                name="tech"
                cat={this.props.cat}
                symbol={this.props.symbol}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <Product
                cat={this.props.cat}
                symbol={this.props.symbol}
                handleOptions={this.props.handleOptions}
                handleAddItem={this.props.handleAddItem}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <StyledCartPage>
                <Cart
                  cartItems={this.props.cartItems}
                  symbol={this.props.symbol}
                  total={this.props.total}
                  handleAddQty={this.props.handleAddQty}
                  handleSubQty={this.props.handleSubQty}
                  handleRemove={this.props.handleRemove}
                />
              </StyledCartPage>
            }
          />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default Pages;

const StyledCartPage = styled.div({
  padding: "0px 60px 0px 60px",
  marginLeft: "auto",
  marginRight: "auto",
  width: "40%",
});
