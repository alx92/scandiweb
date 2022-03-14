import { render } from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

/* 
  ------------- Index -------------
*/

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
