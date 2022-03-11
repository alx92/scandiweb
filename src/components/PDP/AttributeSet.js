import React, { Component } from "react";

class AttributeSet extends Component {
  render() {
    const attributes = this.props.attributes;
    return (
      <div className="attributes">
        {attributes.map((attr) =>
          attr.type === "swatch" ? (
            <div key={attr.id}>
              <h4>{attr.id.toUpperCase()}:</h4>

              <fieldset>
                {attr.items.map((item) => (
                  <label
                    htmlFor="color"
                    style={{
                      backgroundColor: `${item.value}`,
                      height: "25px",
                      width: "25px",
                    }}
                    key={item.id}
                  >
                    <input
                      id="color"
                      type="radio"
                      name={attr.id}
                      onClick={() => this.props.handleOptions(attr, item)}
                    ></input>
                  </label>
                ))}
              </fieldset>
            </div>
          ) : (
            <div key={attr.id}>
              <h4>{attr.id.toUpperCase()}:</h4>

              <fieldset>
                {attr.items.map((item) => (
                  <label htmlFor="radio" key={item.id}>
                    {item.value}
                    <input
                      id="radio"
                      type="radio"
                      name={attr.id}
                      onClick={() => this.props.handleOptions(attr, item)}
                    ></input>
                  </label>
                ))}
              </fieldset>
            </div>
          )
        )}
      </div>
    );
  }
}

export default AttributeSet;
