import {createRoot} from "react-dom/client"
import { BrowserRouter } from "react-router";
import App from "./App";
const root = createRoot(document.querySelector("#root"));


root.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>
)
