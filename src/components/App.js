import React from "react";
import Header from "./Header";
import Pages from "../pages/Pages";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isFetching: true,
      attr: [],
      cartItems: [],
      total: 0,
    };

    this.handleOptions = this.handleOptions.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleAddQty = this.handleAddQty.bind(this);
    this.handleSubQty = this.handleSubQty.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleOptions(attr, item) {
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

  handleAddItem(prod) {
    const finalProd = this.filterProd(prod);
    let copyCartItems = [...this.state.cartItems];
    const alreadyAdded = copyCartItems.find(
      (item) =>
        item.id === finalProd.id &&
        this.arraysEqual(item.attributes, finalProd.attributes)
    );

    if (alreadyAdded) {
      copyCartItems = copyCartItems.map((item) =>
        item.id === finalProd.id &&
        this.arraysEqual(item.attributes, finalProd.attributes)
          ? { ...alreadyAdded, qty: alreadyAdded.qty + 1 }
          : item
      );
      this.setState({
        cartItems: [...copyCartItems],
        total:
          this.state.total + alreadyAdded.prices[0].amount * alreadyAdded.qty,
        attr: [],
      });
    } else {
      this.setState({
        cartItems: [...copyCartItems, { ...finalProd, qty: 1 }],
        total: this.state.total + finalProd.prices[0].amount,
        attr: [],
      });
    }
  }

  handleAddQty(prod) {
    let queriedProd = this.state.cartItems.find(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );
    const indexQueriedProd = this.state.cartItems.findIndex(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );

    queriedProd = { ...queriedProd, qty: queriedProd.qty + 1 };

    let newCartItems = this.state.cartItems;
    newCartItems[indexQueriedProd] = queriedProd;

    this.setState({
      cartItems: newCartItems,
      total: this.state.total + queriedProd.prices[0].amount,
    });
  }

  handleSubQty(prod) {
    let queriedProd = this.state.cartItems.find(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );
    const indexQueriedProd = this.state.cartItems.findIndex(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );

    queriedProd = { ...queriedProd, qty: queriedProd.qty - 1 };

    let newCartItems = [...this.state.cartItems];
    newCartItems[indexQueriedProd] = queriedProd;

    this.setState({
      cartItems: [...newCartItems],
      total: this.state.total - queriedProd.prices[0].amount,
    });
  }

  handleRemove(prod) {
    const indexQueriedProd = this.state.cartItems.findIndex(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );
    let copyCartItems = [...this.state.cartItems];
    copyCartItems.splice(indexQueriedProd, 1);

    this.setState({
      cartItems: [...copyCartItems],
      total: this.state.total - prod.prices[0].amount,
    });
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
    console.log(this.state.cartItems);
    return (
      <div>
        <Header />
        <Pages
          cat={this.state.categories}
          cartItems={this.state.cartItems}
          total={this.state.total}
          handleOptions={this.handleOptions}
          handleAddItem={this.handleAddItem}
          handleAddQty={this.handleAddQty}
          handleSubQty={this.handleSubQty}
          handleRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
