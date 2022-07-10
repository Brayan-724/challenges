import { Flex, Text } from "@chakra-ui/react";
import { ItemIcon } from "./ItemIcon";

export interface StatBaseProps {
  icon: React.ComponentType;
  title: string;
  category: string;
  children?: React.ReactNode;
}

export function StatBase({
  icon,
  title,
  category,
  children,
}: StatBaseProps): JSX.Element {
  return (
    <Flex
      id={`stat-${category}-${title}`}
      bgColor="white"
      width="fit-content"
      minW="320px"
      direction="column"
      px="3"
      py="1"
    >
      <Flex fontSize="3xl" alignItems="center">
        <ItemIcon icon={icon} mr="2" boxSize="1.2em" />
        <Text>{title}</Text>
      </Flex>
      <Flex direction="column" mt="2">{children}</Flex>
    </Flex>
  );
}
