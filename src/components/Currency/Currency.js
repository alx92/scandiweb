import React, { Component } from "react";

/* 
  ------------- Currency Component ------------- 
*/

class Currency extends Component {
  render() {
    return (
      <select
        onChange={(e) => this.props.handleCurrencyChange(e)}
        // Make selected currency persist after page refresh;
        value={JSON.parse(localStorage.getItem("currency"))}
      >
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
