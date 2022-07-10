import { ChakraTheme, extendTheme, StyleProps } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: "#EEE",
      },
    },
  },
  fonts: {
    "bebas-neue": "'Bebas Neue', sans-serif",
  }
} as Partial<ChakraTheme>);

export type ComponentsThemeConfig = {
  [key: string]:
    | ComponentsThemeConfig
    | StyleProps["background"]
    | StyleProps["fontFamily"]
    | string
    | number
    | boolean;
};

const ctc = <C extends ComponentsThemeConfig>(c: C): C => c;

export const componentsThemeConfig = ctc({
  inGame: {
    Price: {
      background: "yellow.300",
      backgroundDisabled: "yellow.500",
    },
  },
});
