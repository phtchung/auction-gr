import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {AuthContextProvider} from "./Pages/Context/AuthContext.jsx";
import {SocketContextProvider} from "./Pages/Context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthContextProvider>
          <SocketContextProvider>
              <App />
          </SocketContextProvider>
      </AuthContextProvider>
  </React.StrictMode>,
);
