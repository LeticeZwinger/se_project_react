import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CurrentTempUnitProvider } from "./Contexts/CurrentTempUnitContext";
import { CurrentUserProvider } from "./Contexts/CurrentUserContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentUserProvider>
      <CurrentTempUnitProvider>
        <BrowserRouter basename="/se_project_react">
          <App />
        </BrowserRouter>
      </CurrentTempUnitProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
);
