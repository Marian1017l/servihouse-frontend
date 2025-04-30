import React from "react";
import ReactDOM from "react-dom/client";  
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);