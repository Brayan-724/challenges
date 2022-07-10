import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ChakraTheme, extendTheme } from "@chakra-ui/react";
import App from "./App";
import "./index.css";

const theme = extendTheme({
  styles: {
    global: () => ({
      html: {
        background: "#EEE",
      },

      body: {
        background: "transparent",
      },
    }),
  },
} as Partial<ChakraTheme>);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
