import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import CategoryList from "../components/PLP/CategoryList";
import Product from "../components/PDP/Product";
import Cart from "../components/Cart/Cart";

class Pages extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route
            path="/"
            element={<CategoryList name="all" cat={this.props.cat} />}
          />
          <Route
            path="/clothes"
            element={<CategoryList name="clothes" cat={this.props.cat} />}
          />
          <Route
            path="/tech"
            element={<CategoryList name="tech" cat={this.props.cat} />}
          />
          <Route
            path="/:id"
            element={
              <Product
                cat={this.props.cat}
                handleOptions={this.props.handleOptions}
                handleAddItem={this.props.handleAddItem}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={this.props.cartItems}
                total={this.props.total}
                handleAddQty={this.props.handleAddQty}
                handleSubQty={this.props.handleSubQty}
                handleRemove={this.props.handleRemove}
              />
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
