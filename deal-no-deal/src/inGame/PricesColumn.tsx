import { Flex } from "@chakra-ui/react";

export interface InGamePricesColumnProps {
  children?: React.ReactNode | React.ReactNode[];
  side?: "left" | "right";
}

export function InGamePricesColumn({
  children,
  side,
}: InGamePricesColumnProps) {
  return (
    <Flex
      direction="column"
      p="2"
      gap="2"
      align={side === "right" ? "flex-end" : "flex-start"}
    >
      {children}
    </Flex>
  );
}
