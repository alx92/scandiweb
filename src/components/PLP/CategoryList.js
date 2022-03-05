import React, { Component } from "react";
import { connect } from "react-redux";
import fetchCategories from "../../features/actions/categoryActions";
import Category from "./Category";

class CategoryList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    console.log(fetchCategories());
  }

  render() {
    const { error, loading, categories } = this.props;

    console.log(categories);

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    const result = categories.filter((cat) => cat.name === this.props.name);

    console.log(result);
    return (
      <div>
        {result?.map((cat) => (
          <div key={cat.name}>
            <Category categories={cat} />
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

export default connect(mapStateToProps)(CategoryList);
