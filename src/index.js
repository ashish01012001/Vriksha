import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";

import "./index.css";
import App from "./App";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import "primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
