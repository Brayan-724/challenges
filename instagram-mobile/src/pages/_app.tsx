import { ChakraProvider } from "@chakra-ui/react";

import { useCreateStore, Provider } from "../client/store";
import theme from "../client/theme";
import { AppProps } from "next/app";



function MyApp({ Component, pageProps }: AppProps) {
  const createStore = useCreateStore(pageProps.initialZustandState);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider createStore={createStore}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
