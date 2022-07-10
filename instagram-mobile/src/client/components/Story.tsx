import { Box, css, Flex, FlexProps, Stack, Text } from "@chakra-ui/react";

export interface StorieProps {
  text: string;
  active?: false;
  img: string | React.ReactNode;
  onClick?: () => void;
}

export default function Story({ text, active, img, ...props }: StorieProps) {
  return (
    <Stack display="inline-flex" spacing={0}>
      <Box
        width="65px"
        height="65px"
        border="solid 4px"
        rounded="full"
        borderColor="gray.100"
      >
        <Flex width="100%" height="100%" justify="center" align="center">
          {typeof img === "string" ? <img src={img} alt="" /> : img}
        </Flex>
      </Box>
      <Text textAlign="center" fontSize="sm" whiteSpace="nowrap">
        {text}
      </Text>
    </Stack>
  );
}

export function StoryGroup(props: FlexProps) {
  return (
    <Flex
      overflowX="auto"
      wrap="nowrap"
      gap="2"
      css={css({
        "::-webkit-scrollbar": {
          display: "none",
        },
      })}
      {...props}
    />
  );
}
