import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import reduxConfig from "./redux";
import { Provider } from "react-redux";

const { store, persiststore } = reduxConfig();
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
