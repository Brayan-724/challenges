import { Box, Button, ButtonProps, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Icon from "../components/Icon";
import MainLayout, { MainLayoutProps } from "./Main";
import Logo from "../../public/text-logo.svg";

function NavButton(props: ButtonProps) {
  return (
    <Button
      bg="transparent"
      px={2}
      _hover={{
        bg: "transparent",
      }}
      _focus={{
        boxShadow: "none",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default function HomeLayout({ children, selectedTab, parentRef }: MainLayoutProps) {
  return (
    <MainLayout selectedTab={selectedTab} parentRef={parentRef}>
      <Box p={2}>
        <Flex justify="space-between">
          <Box>
            <NavButton width="8rem">
              <Image src={Logo} layout="fill" alt="Instagram Text" priority />
            </NavButton>
          </Box>
          <Flex justify="right">
            <NavButton>
              <Icon name="add_box" variant="outlined" />
            </NavButton>

            <NavButton>
              <Icon name="favorite_border" variant="outlined" />
            </NavButton>

            <NavButton>
              <Icon name="maps_ugc" variant="outlined" />
            </NavButton>
          </Flex>
        </Flex>
      </Box>
      {children}
    </MainLayout>
  );
}
