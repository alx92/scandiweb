import "../styles/App.css";
import React from "react";
import Header from "./Header";
import Pages from "../pages/Pages";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ScandiWeb Store </h1>
          <Header />
        </header>
        <Pages />
      </div>
    );
  }
}

export default App;
