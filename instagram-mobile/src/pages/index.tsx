import {
  Box,
  Button,
  ButtonProps,
  Center,
  Flex,
  Grid,
  GridItem,
  Input,
  Spinner,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../client/components/Icon";
import Post from "../client/components/Post";
import Story, { StoryGroup } from "../client/components/Story";
import HomeLayout from "../client/layouts/Home";
import { useStore } from "../client/store";

export default function Posts({}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [photos, loadPhotosPerPage] = useStore((state) => [
    state.photos.photos,
    state.photos.loadPhotosPerPage,
  ]);

  const [page, setPage] = useState<number>(1);
  const [isLoadingNewData, setIsLoadingNewData] = useState<boolean>(false);

  useEffect(() => {
    loadPhotosPerPage(page);
  }, [page]);

  useEffect(() => {
    if (parentRef.current) {
      const parent = parentRef.current;
      let _isLoadingNewData = isLoadingNewData;

      const handleScroll = (e: Event) => {
        const { scrollTop, scrollHeight, clientHeight } = parent;
        if (
          !_isLoadingNewData &&
          scrollTop + clientHeight >= scrollHeight - 50
        ) {
          setPage((prev) => prev + 1);
          setIsLoadingNewData(true);
          _isLoadingNewData = true;
        } else if (isLoadingNewData) {
          setIsLoadingNewData(false);
          _isLoadingNewData = false;
        }
      };

      parent.addEventListener("scroll", handleScroll);

      return () => {
        parent.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isLoadingNewData, parentRef]);

  return (
    <HomeLayout selectedTab="Home" parentRef={parentRef}>
      <Stack maxW="680px" overflowX="hidden" mx="auto">
        <StoryGroup px={4}>
          <Story text="Your Story" img={<Icon name="pets" />} />
          <Story text="Your Story" img={<Icon name="pets" />} />
          <Story text="Your Story" img={<Icon name="pets" />} />
          <Story text="Your Story" img={<Icon name="pets" />} />
          <Story text="Your Story" img={<Icon name="pets" />} />
          <Story text="Your Story" img={<Icon name="pets" />} />
        </StoryGroup>

        <Stack spacing={6} mt={4}>
          {photos.map((photo) => (
            <Post
              key={photo.photo_id}
              post={{
                id: photo.photo_id,
                photos: [photo, photo, photo, photo, photo],
                description: photo.title,
                author: "A",
              }}
            />
          ))}
          <Center p={5} pb="7rem">
            <Spinner speed=".8s" />
          </Center>
        </Stack>
      </Stack>
    </HomeLayout>
  );
}

// TODO: Add posts to the store and use them here
// TODO: Story view
