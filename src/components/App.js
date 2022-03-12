import React from "react";
import Header from "./Header";
import Pages from "../pages/Pages";
import index from "../index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isFetching: true,
      attr: [],
      cartItems: [],
      total: [],
      currencies: [],
      symbol: "$",
    };

    this.handleOptions = this.handleOptions.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleAddQty = this.handleAddQty.bind(this);
    this.handleSubQty = this.handleSubQty.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleCurrencyChange(e) {
    this.setState({ symbol: e.target.value });
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
      gallery: prod.gallery,
      inStock: prod.inStock,
    };
  }

  handleAddItem(prod) {
    const finalProd = this.filterProd(prod);
    if (prod.attributes.length === finalProd.attributes.length) {
      let copyCartItems = this.state.cartItems;
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
          cartItems: copyCartItems,
          total: this.state.total.map((_, index) => ({
            amount:
              this.state.total[index].amount +
              alreadyAdded.prices[index].amount * alreadyAdded.qty,
            currency: alreadyAdded.prices[index].currency,
          })),
          attr: [],
        });
      } else {
        this.setState({
          cartItems: [...copyCartItems, { ...finalProd, qty: 1 }],
          total:
            this.state.total.length === 0
              ? [...finalProd.prices]
              : this.state.total.map((_, index) => ({
                  amount:
                    this.state.total[index].amount +
                    finalProd.prices[index].amount,
                  currency: finalProd.prices[index].currency,
                })),
          attr: [],
        });
      }
    } else {
      alert("Please select all the options before adding to cart!");
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
      total: this.state.total.map((_, index) => ({
        amount:
          this.state.total[index].amount + queriedProd.prices[index].amount,
        currency: queriedProd.prices[index].currency,
      })),
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
      total: this.state.total.map((_, index) => ({
        amount:
          this.state.total[index].amount - queriedProd.prices[index].amount,
        currency: queriedProd.prices[index].currency,
      })),
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
      total: this.state.total.map((_, index) => ({
        amount: this.state.total[index].amount - prod.prices[index].amount,
        currency: prod.prices[index].currency,
      })),
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
    const currencyQuery = `query Currency {
      currencies {
        label
        symbol
      }
    }`;

    const catPayload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: catQuery }),
    };

    const catResponse = await fetch(url, catPayload);
    const data = await catResponse.json();
    this.setState({ categories: data.data.categories, isFetching: false });

    const currencyPayload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: currencyQuery }),
    };

    const currencyResponse = await fetch(url, currencyPayload);
    const result = await currencyResponse.json();
    this.setState({ currencies: result.data.currencies });

    // console.log(result.data.currencies);
  }

  render() {
    // console.log(this.state.currencies);
    // console.log(this.state.symbol);
    return (
      <div>
        <Header
          currencies={this.state.currencies}
          handleCurrencyChange={this.handleCurrencyChange}
          cartItems={this.state.cartItems}
          symbol={this.state.symbol}
          total={this.state.total}
          handleAddQty={this.handleAddQty}
          handleSubQty={this.handleSubQty}
          handleRemove={this.handleRemove}
        />
        <Pages
          cat={this.state.categories}
          symbol={this.state.symbol}
          cartItems={this.state.cartItems}
          total={this.state.total}
          handleCurrencyChange={this.handleCurrencyChange}
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
