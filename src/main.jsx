import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/Store.jsx";
import { Scrollbars } from "react-custom-scrollbars-2";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Scrollbars style={{ width: "100vw", height: "100vh" }}>
      <App />
    </Scrollbars>
  </Provider>
);
