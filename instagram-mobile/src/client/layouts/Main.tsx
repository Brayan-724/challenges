import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Link from "next/link";
import { useMemo } from "react";
import Icon, { IconProps } from "../components/Icon";

export interface MainLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  selectedTab?: string;
  parentRef?: React.RefObject<HTMLDivElement>;
}

interface Tab {
  label: string;
  icon: string | IconProps;
  to: string;
}

export default function MainLayout({
  children,
  selectedTab,
  parentRef,
}: MainLayoutProps) {
  const tabs = useMemo<Tab[]>(
    () => [
      {
        label: "Home",
        icon: "home",
        to: "/",
      },
      {
        label: "Feed",
        icon: "search",
        to: "/feed",
      },
      {
        label: "Stories",
        icon: "add_box",
        to: "/template/post",
      },
      {
        label: "Shop",
        icon: "local_mall",
        to: "/shop",
      },
      {
        label: "Profile",
        icon: "person",
        to: "/me",
      },
    ],
    []
  );

  return (
    <Flex height="100vh" width="100vw" inset={0} flexDirection="column">
      <Box
        ref={parentRef}
        height="100%"
        overflowX="hidden"
        overflowY="auto"
        css={css({
          "::-webkit-scrollbar": {
            display: "none",
          },
        })}
      >
        {children}
      </Box>
      <Flex
        pos="relative"
        pt={3}
        pb={5}
        bg="white"
        zIndex={10}
        justifyContent="space-between"
        boxShadow="0px -1px 0px rgba(0, 0, 0, 0.1)"
      >
        {tabs.map((tab) => (
          <Link href={tab.to} key={tab.label}>
            <Box as="a" width="100%">
              <Tooltip label={tab.label} placement="top">
                <Flex width="100%" justifyContent="center" cursor="pointer">
                  <Icon
                    {...(typeof tab.icon === "string"
                      ? { name: tab.icon }
                      : tab.icon)}
                    variant={tab.label === selectedTab ? "filled" : "outlined"}
                  />
                </Flex>
              </Tooltip>
            </Box>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
