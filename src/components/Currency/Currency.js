import React, { Component } from "react";

class Currency extends Component {
  render() {
    return (
      <select onChange={(e) => this.props.handleCurrencyChange(e)}>
        {this.props.currencies.map((item) => (
          <option key={item.symbol} value={item.symbol}>
            {item.symbol}
          </option>
        ))}
      </select>
    );
  }
}

export default Currency;
