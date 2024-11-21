import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { CurrentTempUnitProvider } from "./Contexts/CurrentTempUnitContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentTempUnitProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CurrentTempUnitProvider>
  </React.StrictMode>,
);
