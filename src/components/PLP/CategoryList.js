import React, { Component } from "react";
import Category from "./Category";

class CategoryList extends Component {
  render() {
    const result = this.props.cat.filter((cat) => cat.name === this.props.name);

    return (
      <div>
        {result.map((cat) => (
          <div key={cat.name}>
            <Category categories={cat} />
          </div>
        ))}
      </div>
    );
  }
}

export default CategoryList;
