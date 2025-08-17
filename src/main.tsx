import { TonConnectUIProvider } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl="https://main.d2ibjv4d7heza0.amplifyapp.com/tonconnect-manifest.json">
    <App />
  </TonConnectUIProvider>
);
