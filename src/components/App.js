import React from "react";
import Header from "./Header";
import Pages from "../pages/Pages";
import Cart from "../components/Cart/Cart";

class App extends React.Component {
  render() {
    return (
      <div >
        <Header />
        <Pages />
        <Cart />
      </div>
    );
  }
}

export default App;
