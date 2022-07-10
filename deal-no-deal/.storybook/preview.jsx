import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../src/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

/** @type {import("@storybook/react").ComponentMeta<React.Component>["decorators"]}  */
export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme} resetCSS>
      <Story />
    </ChakraProvider>
  ),
];
