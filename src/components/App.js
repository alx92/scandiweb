import React from "react";
import Header from "./Header";
import Pages from "../pages/Pages";
import Cart from "../components/Cart/Cart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isFetching: true,
    };
  }

  async componentDidMount() {
    const url = "http://localhost:4000";
    const catQuery = `query Categories {
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
             id
             name
             type
             items {
                 displayValue
                 value
                 id
             } 
          }
          prices {
            amount
            currency {
              symbol
              label
            }
          }
          brand
        }
      }
    }`;
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: catQuery,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();
    this.setState({ categories: data.data.categories, isFetching: false });
    // console.log(data.data.categories);
  }

  render() {
    // console.log(this.state.categories);
    return (
      <div>
        <Header />
        <Pages cat={this.state.categories} />
        <Cart />
      </div>
    );
  }
}

export default App;
