import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import Homepage from "./components/customSearch/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="dark">
      <Homepage />
    </div>
  </React.StrictMode>
);
