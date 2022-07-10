import { Flex, Text } from "@chakra-ui/react";
import { componentsThemeConfig } from "../theme";
import { useColor } from "../hooks/useColor";
import { useState } from "react";
import { motion } from "framer-motion";
import { useOneTimeGlobally } from "../hooks/OneTimeGlobally";
import Color from "color";

const PriceConfig = componentsThemeConfig.inGame.Price;

const generateGradient = (color: string) => {
  const belowColor = Color(color).darken(0.15).toString();

  const gradient = `linear-gradient(to top, ${belowColor} 50%, ${color} 50%)`;

  return { color, belowColor, gradient };
};

export interface InGamePriceProps {
  disabled?: boolean;
  children: number;
}

export function InGamePrice({ children }: InGamePriceProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  const backgroundColor = useColor(PriceConfig.background);
  const backgroundColorDisabled = useColor(PriceConfig.backgroundDisabled);

  const { enabled, disabled } = useOneTimeGlobally(() => {
    return {
      enabled: generateGradient(backgroundColor.toString()),
      disabled: generateGradient(backgroundColorDisabled.toString()),
    };
  }, []);

  const formattedPrice = children.toLocaleString("en-US");

  return (
    <Flex
      as={motion.div}
      initial="hidden"
      animate={isDisabled ? "disabled" : "enabled"}
      w="100%"
      maxW={{ sm: "100px", md: "150px", lg: "250px" }}
      variants={{
        hidden: {
          opacity: 0,
          scale: 0,
          backgroundColor: disabled.color,
          backgroundImage: disabled.gradient,
        },
        enabled: {
          opacity: 1,
          scale: 1,
          rotateX: [0, 180, 0],
          backgroundColor: [disabled.color, enabled.color],
          backgroundImage: [disabled.gradient, enabled.gradient],
        },
        disabled: {
          opacity: 1,
          scale: 1,
          rotateX: [0, 180, 0],
          backgroundColor: [enabled.color, disabled.color],
          backgroundImage: [enabled.gradient, disabled.gradient],
        },
      }}
      px="2"
      justify="space-between"
      fontFamily="bebas-neue"
      fontSize="xl"
      rounded="md"
      cursor="pointer"
      onClick={() => setIsDisabled(!isDisabled)}
    >
      <Text as="span">$</Text>
      <Text display="inline-block">{formattedPrice}</Text>
    </Flex>
  );
}
