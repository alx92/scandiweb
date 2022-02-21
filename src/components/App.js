import React from "react";
import Header from "./Header";
import Pages from "../pages/Pages";
import Cart from "../components/Cart/Cart";

class App extends React.Component {
  render() {
    // render  <Pages />
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Pages />
        <Cart />
      </div>
    );
  }
}

export default App;
