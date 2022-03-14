import React from "react";
import Header from "./Header";
import Pages from "../pages/Pages";
import index from "../index.css";

/* 
  ------------- Main App Component -------------
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      attr: [],
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
      total: JSON.parse(localStorage.getItem("total")) || [],
      currencies: [],
      symbol: JSON.parse(localStorage.getItem("currency")) || "$",
      badgeCount: JSON.parse(localStorage.getItem("badge")) || 0,
    };

    // Binding functions so we can pass them to other components;
    this.handleOptions = this.handleOptions.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleAddQty = this.handleAddQty.bind(this);
    this.handleSubQty = this.handleSubQty.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  // Function for setting the currency and also persisting it when page is refreshed;
  handleCurrencyChange(e) {
    this.setState({ symbol: e.target.value });
    localStorage.setItem("currency", JSON.stringify(e.target.value));
  }

  // Function for saving the chosen options for each product;
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

  // Function for checking if two object are equal;
  objectsEqual(o1, o2) {
    return (
      Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => o1[p] === o2[p])
    );
  }

  // Function for checking if two arrays are equal;
  arraysEqual(a1, a2) {
    return (
      a1.length === a2.length &&
      a1.every((item, index) => this.objectsEqual(item, a2[index]))
    );
  }

  // This function takes in the product and returns a filtered product so that only the chosen options remain in the attribute array;
  filterProd(prod) {
    // Get array of all the chosen options;
    let options = this.state.attr;

    // Filter options so that only the last selected choices for each option remains;
    // Note: Here it's actually the first unique options that are added however the
    // handleOptions method is setting the state for attr so that the last options are first in the array
    // so the below works as intended;
    options = options.filter(
      (value, index, self) =>
        index === self.findIndex((obj) => obj.id === value.id)
    );

    // Sorting the options so that you always have the cartItems options displayed in the same order
    // and to avoid some side effects;
    options.sort((a, b) => (a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1));

    // Return the filtered product with the chosen options;
    return {
      id: prod.id,
      name: prod.name,
      attributes: options,
      prices: prod.prices,
      gallery: prod.gallery,
      inStock: prod.inStock,
    };
  }

  // Function for adding a product in cart;
  handleAddItem(prod) {
    // Get the final product with only the selected attributes/options;
    const finalProd = this.filterProd(prod);

    // Check that no products can be added in cart that do not have all the options chosen;
    if (prod.attributes.length === finalProd.attributes.length) {
      // Get cartItems;
      let copyCartItems = this.state.cartItems;

      // Check is the product that we want to add has already been added;
      const alreadyAdded = copyCartItems.find(
        (item) =>
          item.id === finalProd.id &&
          this.arraysEqual(item.attributes, finalProd.attributes)
      );

      // If the product is already added, then increase only the quantity of that product;
      // else add a new product in cart;
      // Also update total state and persist to localStorage
      if (alreadyAdded) {
        copyCartItems = copyCartItems.map((item) =>
          item.id === finalProd.id &&
          this.arraysEqual(item.attributes, finalProd.attributes)
            ? { ...alreadyAdded, qty: alreadyAdded.qty + 1 }
            : item
        );
        this.setState(
          {
            cartItems: copyCartItems,
            total: this.state.total.map((_, index) => ({
              amount:
                Math.round(
                  (this.state.total[index].amount +
                    alreadyAdded.prices[index].amount * alreadyAdded.qty) *
                    100
                ) / 100,
              currency: alreadyAdded.prices[index].currency,
            })),
            attr: [],
            badgeCount: this.state.badgeCount + 1,
          },
          () => {
            localStorage.setItem(
              "cartItems",
              JSON.stringify(this.state.cartItems)
            );
            localStorage.setItem("total", JSON.stringify(this.state.total));
            localStorage.setItem(
              "badge",
              JSON.stringify(this.state.badgeCount)
            );
          }
        );
      } else {
        this.setState(
          {
            cartItems: [...copyCartItems, { ...finalProd, qty: 1 }],
            total:
              this.state.total.length === 0
                ? [...finalProd.prices]
                : this.state.total.map((_, index) => ({
                    amount:
                      Math.round(
                        (this.state.total[index].amount +
                          finalProd.prices[index].amount) *
                          100
                      ) / 100,
                    currency: finalProd.prices[index].currency,
                  })),
            attr: [],
            badgeCount: this.state.badgeCount + 1,
          },
          () => {
            localStorage.setItem(
              "cartItems",
              JSON.stringify(this.state.cartItems)
            );
            localStorage.setItem("total", JSON.stringify(this.state.total));
            localStorage.setItem(
              "badge",
              JSON.stringify(this.state.badgeCount)
            );
          }
        );
      }
      // After adding a product reload the page so that the radio buttons are cleared in the UI;
      window.location.reload();
    } else {
      // Alert if not all the attributes were selected;
      alert("Please select all the options before adding to cart!");
    }
  }

  // Function for adding quantity in cart;
  handleAddQty(prod) {
    // Search for the product that needs it's quantity updated;
    let queriedProd = this.state.cartItems.find(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );

    // Search for the index of the needed product;
    const indexQueriedProd = this.state.cartItems.findIndex(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );

    // Update quantity;
    queriedProd = { ...queriedProd, qty: queriedProd.qty + 1 };

    // Refresh the cart items with the updated products;
    let newCartItems = this.state.cartItems;
    newCartItems[indexQueriedProd] = queriedProd;

    // Update state and persist to localStorage;
    this.setState(
      {
        cartItems: newCartItems,
        total: this.state.total.map((_, index) => ({
          amount:
            Math.round(
              (this.state.total[index].amount +
                queriedProd.prices[index].amount) *
                100
            ) / 100,
          currency: queriedProd.prices[index].currency,
        })),
        badgeCount: this.state.badgeCount + 1,
      },
      () => {
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
        localStorage.setItem("total", JSON.stringify(this.state.total));
        localStorage.setItem("badge", JSON.stringify(this.state.badgeCount));
      }
    );
  }

  // Function for subtracting quantity in cart;
  handleSubQty(prod) {
    // Get the product that needs its quantity updated;
    let queriedProd = this.state.cartItems.find(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );

    // Get the index of the product that needs it's quantity updated;
    const indexQueriedProd = this.state.cartItems.findIndex(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );

    // Update quantity;
    queriedProd = { ...queriedProd, qty: queriedProd.qty - 1 };

    // Refresh cart items with updated products;
    let newCartItems = [...this.state.cartItems];
    newCartItems[indexQueriedProd] = queriedProd;

    // Update state and persist to localStorage;
    this.setState(
      {
        cartItems: [...newCartItems],
        total: this.state.total.map((_, index) => ({
          amount:
            Math.round(
              (this.state.total[index].amount -
                queriedProd.prices[index].amount) *
                100
            ) / 100,
          currency: queriedProd.prices[index].currency,
        })),
        badgeCount: this.state.badgeCount - 1,
      },
      () => {
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
        localStorage.setItem("total", JSON.stringify(this.state.total));
        localStorage.setItem("badge", JSON.stringify(this.state.badgeCount));
      }
    );
  }

  // Function for removing product from cart;
  handleRemove(prod) {
    // Get index of product that needs to be removed;
    const indexQueriedProd = this.state.cartItems.findIndex(
      (item) =>
        item.id === prod.id &&
        this.arraysEqual(item.attributes, prod.attributes)
    );

    // Remove product;
    let copyCartItems = [...this.state.cartItems];
    copyCartItems.splice(indexQueriedProd, 1);

    // Update state and persist to localStorage;
    this.setState(
      {
        cartItems: [...copyCartItems],
        total: this.state.total.map((_, index) => ({
          amount:
            Math.round(
              (this.state.total[index].amount - prod.prices[index].amount) * 100
            ) / 100,
          currency: prod.prices[index].currency,
        })),
        badgeCount: this.state.badgeCount - 1,
      },
      () => {
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
        localStorage.setItem("total", JSON.stringify(this.state.total));
        localStorage.setItem("badge", JSON.stringify(this.state.badgeCount));
      }
    );
  }

  // Fetching Categories, Currency and persisting Categories on page refresh
  async componentDidMount() {
    // Get url endpoint;
    const url = "http://localhost:4000";

    // Create grapghQL queries that will be sent in the body of the POST method;
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

    // Create payload for the the fetch call;
    const catPayload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: catQuery }),
    };

    // Get All data - since the endpoint provided
    // all the required data for PDP and PLP in one query I opted for a fetch call;
    const catResponse = await fetch(url, catPayload);
    const data = await catResponse.json();
    this.setState({ categories: data.data.categories });

    // Create payload for the the fetch call;
    const currencyPayload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: currencyQuery }),
    };

    // Get currency data;
    const currencyResponse = await fetch(url, currencyPayload);
    const result = await currencyResponse.json();
    this.setState({ currencies: result.data.currencies });

    // Also persist to localStorage;
    localStorage.setItem("cat", JSON.stringify(data.data.categories));
  }

  // Keeping this in case of localStorage errors
  componentDidUpdate() {
    // localStorage.clear();
  }

  render() {
    return (
      <div>
        <Header
          currencies={this.state.currencies}
          handleCurrencyChange={this.handleCurrencyChange}
          cartItems={this.state.cartItems}
          symbol={this.state.symbol}
          total={this.state.total}
          badgeCount={this.state.badgeCount}
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
