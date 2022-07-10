import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Stack,
  Stat,
  StatHelpText,
  StatNumber,
  Text,
  Tabs,
  TabList,
  Tab,
  useMediaQuery,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Icon from "../client/components/Icon";
import Story, { StoryGroup } from "../client/components/Story";
import PersonalLayout from "../client/layouts/Personal";
import { useStore } from "../client/store";

interface Stats {
  label: string;
  value: number;
}

export default function Post({ imgCount }: { imgCount: number }) {
  const { newPost, loading } = useStore((store) => ({
    newPost: store.posts.newPost,
    loading: store.posts.loading,
  }));

  const stats = useMemo<Stats[]>(
    () => [
      {
        label: "Posts",
        value: imgCount,
      },
      {
        label: "Followers",
        value: 10,
      },
      {
        label: "Following",
        value: 10,
      },
    ],
    [imgCount]
  );
  const hasStory = true;

  return (
    <PersonalLayout selectedTab="Profile">
      <Stack spacing={0} maxW="980px" margin="auto">
        <Stack px={4}>
          <Grid
            gridTemplateColumns="100px repeat(3, 1fr)"
            height="100px"
            alignItems="center"
            justifyContent="center"
          >
            <GridItem justifySelf="center">
              {hasStory ? (
                <Flex
                  width="100px"
                  height="100px"
                  border="solid 5px transparent"
                  rounded="full"
                  bgImage="linear-gradient(var(--chakra-colors-white), var(--chakra-colors-white)), linear-gradient(190deg, #E3D, #fB5)"
                  bgClip="content-box, border-box"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    backgroundOrigin: "border-box",
                  }}
                >
                  <Icon name="pets" />
                </Flex>
              ) : (
                <Icon name="pets" />
              )}
            </GridItem>
            {stats.map((stat) => (
              <GridItem key={stat.label}>
                <Stat>
                  <StatNumber textAlign="center" fontSize="1.3rem">
                    {stat.value}
                  </StatNumber>
                  <StatHelpText textAlign="center">{stat.label}</StatHelpText>
                </Stat>
              </GridItem>
            ))}
          </Grid>
          <Text
            pt={2}
            lineHeight="3"
            textTransform="capitalize"
            fontWeight="bold"
          >
            username
          </Text>
          <Text lineHeight="4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
            aliquid assumenda, obcaecati blanditiis.
          </Text>
          <Button
            onClick={() => {
              newPost({
                description: "My new post",
                photos: [
                  {
                    title: "My new photo",
                    url: "https://picsum.photos/id/1/600/600",
                  },
                ],
              });
            }}
            disabled={loading}
            colorScheme="gray"
            variant="outline"
          >
            Create post
          </Button>
          <Grid templateColumns="repeat(2, 1fr) auto" gap={2}>
            <Button colorScheme="blue">Follow</Button>
            <Button colorScheme="gray" variant="outline">
              Message
            </Button>
            <Button px={2} colorScheme="gray" variant="outline">
              <Icon name="expand_more" />
            </Button>
          </Grid>

          <StoryGroup>
            <Story text="Story 1" img={<Icon name="pets" />} />
            <Story text="Story 2" img={<Icon name="pets" />} />
            <Story text="Story 3" img={<Icon name="pets" />} />

            <Story text="New" img={<Icon name="add" />} />
          </StoryGroup>
        </Stack>

        <Tabs mt="3" isFitted>
          <TabList>
            <Tab
              color="GrayText"
              _active={{
                bg: "transparent",
              }}
              _selected={{
                color: "black",
                borderBottom: "solid 1px black",
                boxShadow: "none",
              }}
            >
              <Icon name="grid_on" />
            </Tab>
            <Tab
              color="GrayText"
              _active={{
                bg: "transparent",
              }}
              _selected={{
                color: "black",
                borderBottom: "solid 1px black",
                boxShadow: "none",
              }}
            >
              <Icon name="assignment_ind" variant="outlined" />
            </Tab>
          </TabList>
        </Tabs>

        <ImgGrid imgCount={imgCount} />
      </Stack>
    </PersonalLayout>
  );
}

function ImgGrid({ imgCount }: { imgCount: number }) {
  const imagesData = useMemo(() => {
    return Array(Math.ceil(imgCount / 3))
      .fill(0)
      .map((_, i) => {
        return Array(3)
          .fill(0)
          .map((_, j) => {
            return {
              src: `https://picsum.photos/${200 + i * 3 + j}`,
            };
          });
      });
  }, [imgCount]);

  return (
    <Stack spacing="1px">
      {imagesData.map((row, i) => (
        <Flex key={i} justify="center" gap="1px" cursor="pointer">
          {row.map((img, j) => (
            <img
              key={j}
              crossOrigin="anonymous"
              style={{
                objectFit: "cover",

                width: "33.3%",
                maxWidth: "250px",
                height: "auto",
              }}
              src={img.src}
              alt="A photo"
            />
          ))}
        </Flex>
      ))}
    </Stack>
  );
}

export async function getStaticProps() {
  return {
    props: {
      imgCount: 2,
    },
  };
}
