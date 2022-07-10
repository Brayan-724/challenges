import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";
import Icon from "../components/Icon";
import MainLayout, { MainLayoutProps } from "./Main";

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

function DropdownContainer({ children }: { children: React.ReactNode }) {
  return <Box pos="relative">{children}</Box>;
}

interface DropdownProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode | React.ReactNode[];
}

function Dropdown({ isOpen, onClose, children }: DropdownProps) {
  return (
    <>
      {isOpen && (
        <>
          <Box
            zIndex={11}
            pos="fixed"
            inset={0}
            bg="#00000005"
            onClick={onClose || (() => {})}
          ></Box>
          <Box
            zIndex={11}
            pos="absolute"
            left="0"
            right="0"
            px={2}
            py={3}
            bg="white"
            rounded={5}
            boxShadow="base"
            overflowX="hidden"
          >
            {children}
          </Box>
        </>
      )}
    </>
  );
}

function NavDropdown() {
  const [isUsernameOpen, setUsernameOpen] = useBoolean(false);

  return (
    <DropdownContainer>
      <NavButton
        onClick={setUsernameOpen.on}
        rightIcon={<Icon name="expand_more" />}
      >
        <Heading as="h1" size="lg">
          username
        </Heading>
      </NavButton>
      <Dropdown isOpen={isUsernameOpen} onClose={setUsernameOpen.off}>
        <Stack>
          <Text>Not implemented</Text>
        </Stack>
      </Dropdown>
    </DropdownContainer>
  );
}

export default function PersonalLayout({
  children,
  selectedTab,
}: MainLayoutProps) {
  return (
    <MainLayout selectedTab={selectedTab}>
      <Box p={2}>
        <Flex justify="space-between">
          <Box>
            <NavDropdown />
          </Box>
          <Flex justify="right">
            <NavButton>
              <Icon name="add_box" variant="outlined" />
            </NavButton>

            <NavButton>
              <Icon name="menu" />
            </NavButton>
          </Flex>
        </Flex>
      </Box>
      {children}
    </MainLayout>
  );
}
