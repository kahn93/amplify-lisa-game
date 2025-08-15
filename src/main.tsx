import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import outputs from "../amplify_outputs.json";
// Make sure Main.tsx or Main.jsx exists in ./components
// Ensure the file exists at ./components/Main.tsx or ./components/Main.jsx and the import matches the file name exactly
import Main from "./components/Main";
import "./index.css";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
