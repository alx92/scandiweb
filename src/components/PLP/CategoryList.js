import React, { Component } from "react";
import Category from "./Category";

/* 
  ------------- CategoryList Component -------------
*/

class CategoryList extends Component {
  render() {
    // Filtering the required category;
    const result = this.props.cat.filter((cat) => cat.name === this.props.name);

    return (
      <div>
        {result.map((cat) => (
          <div key={cat.name}>
            <Category
              categories={cat}
              symbol={this.props.symbol}
              handleOptions={this.props.handleOptions}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default CategoryList;
