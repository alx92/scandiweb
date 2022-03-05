import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./features/reducers/rootReducer";
import prodReducer from "./features/reducers/prodReducer";
import catReducer from "./features/reducers/catReducer";
import fetchProduct from "./features/actions/productActions";

const enhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore(catReducer, enhancers);

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
