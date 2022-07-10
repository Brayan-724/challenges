import { Flex, FlexProps, Icon } from "@chakra-ui/react";

export interface ItemIconProps extends FlexProps {
  icon: React.ComponentType;
}

export function ItemIcon({ icon, ...props }: ItemIconProps): JSX.Element {
  return (
    <Flex display="inline-flex" bg="blue.400" p="1" rounded="md" {...props}>
      <Icon as={icon} color="white" boxSize="100%" />
    </Flex>
  );
}
