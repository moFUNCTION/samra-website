import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UserDataProvider } from "./Context/UserDataProvider/UserDataProvider.jsx";
import { ShoppingCartProvider } from "./Context/ShoppingCartProvider/ShoppingCartProvider.jsx";
localStorage.setItem("chakra-ui-color-mode", "light");
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={extendTheme({ direction: "rtl" })}>
      <BrowserRouter>
        <UserDataProvider>
          <ShoppingCartProvider>
            <App />
          </ShoppingCartProvider>
        </UserDataProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
