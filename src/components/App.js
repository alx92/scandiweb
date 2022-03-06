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
      attr: [],
    };

    this.handleOptions = this.handleOptions.bind(this);
  }

  handleOptions(attr, item) {
    console.log(attr, item);
    this.setState({
      attr: [
        {
          id: attr.id,
          value: item.value,
          type: attr.type,
        },
        ...this.state.attr,
      ],
    });
  }

  objectsEqual(o1, o2) {
    return (
      Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => o1[p] === o2[p])
    );
  }

  arraysEqual(a1, a2) {
    return (
      a1.length === a2.length &&
      a1.every((item, index) => this.objectsEqual(item, a2[index]))
    );
  }

  filterProd(prod) {
    let options = this.state.attr;

    options = options.filter(
      (value, index, self) =>
        index === self.findIndex((obj) => obj.id === value.id)
    );

    return {
      id: prod.id,
      name: prod.name,
      attributes: options,
      prices: prod.prices,
    };
  }

  addItem(prod) {
    const finalProd = this.filterProd(prod);
    var cartItems;
    const alreadyAdded = cartItems.find(
      (item) =>
        item.id === finalProd.id &&
        this.arraysEqual(item.attributes, finalProd.attributes)
    );

    if (alreadyAdded) {
      cartItems = cartItems.map((item) =>
        item.id === finalProd.id &&
        this.arraysEqual(item.attributes, finalProd.attributes)
          ? { ...alreadyAdded, qty: alreadyAdded.qty + 1 }
          : item
      );
      // cartItemsVar([...cartItems]);
    } else {
      // cartItemsVar([...cartItems, { ...finalProd, qty: 1 }]);
    }
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
    console.log(this.state.attr);
    return (
      <div>
        <Header />
        <Pages cat={this.state.categories} handleOptions={this.handleOptions} />
        <Cart />
      </div>
    );
  }
}

export default App;
