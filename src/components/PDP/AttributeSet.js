import styled from "@emotion/styled";
import React, { Component } from "react";

class AttributeSet extends Component {
  render() {
    const attributes = this.props.attributes;
    return (
      <div className="attributes">
        {attributes.map((attr) =>
          attr.type === "swatch" ? (
            <Swatch key={attr.id}>
              <h4>{attr.id.toUpperCase()}:</h4>

              {attr.items.map((item) => (
                <div
                  htmlFor={item.value}
                  key={item.id}
                  style={{
                    backgroundColor: `${item.value}`,
                  }}
                >
                  <input
                    id={item.value}
                    disabled={!this.props.inStock}
                    type="radio"
                    name={attr.id}
                    onClick={() => this.props.handleOptions(attr, item)}
                  ></input>
                </div>
              ))}
            </Swatch>
          ) : (
            <div key={attr.id}>
              <h4>{attr.id.toUpperCase()}:</h4>

              {attr.items.map((item) => (
                <label htmlFor={item.value} key={item.id}>
                  {item.value}
                  <input
                    disabled={!this.props.inStock}
                    id={item.value}
                    type="radio"
                    name={attr.id}
                    onClick={() => this.props.handleOptions(attr, item)}
                  ></input>
                </label>
              ))}
            </div>
          )
        )}
      </div>
    );
  }
}

export default AttributeSet;

const Swatch = styled.div({
  input: {
    cursor: "pointer",
  },
  div: {
    display: "inline-block",
    // color: "rgba(0, 0, 0, 0)",
    boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.35)",
    marginRight: "2px",
    height: "40px",
    width: "40px",
  },
});
