import React, { Component } from "react";

class Currency extends Component {
  render() {
    return (
      <select
        onChange={(e) => this.props.handleCurrencyChange(e)}
        value={JSON.parse(localStorage.getItem("currency"))}
      >
        {this.props.currencies.map((item) => (
          <option key={item.symbol} value={item.symbol}>
            {item.symbol} {item.label}
          </option>
        ))}
      </select>
    );
  }
}

export default Currency;
