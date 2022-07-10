import { Box, Button, ButtonProps, Flex, Grid, GridItem, Input, Stack, Text, useBoolean } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { IPhoto } from "../../server/orm/models/Photo";
import Icon from "./Icon";

interface IPost {
  id: string;
  photos: IPhoto[];
  description: string;
  author: string;
}

export default function Post({ post }: { post: IPost }) {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const imgs = post.photos;
  const slideConfig = useMemo(
    () => ({
      threshold: 0.1,
    }),
    []
  );
  const [isDragging, setIsDragging] = useBoolean();
  const [startPosition, setStartPosition] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);

  useEffect(() => {
    if (imgs.length > 1 && imgContainerRef.current) {
      const imgContainer = imgContainerRef.current;
      const handleDragStart = (e: MouseEvent) => {
        setIsDragging.on();
        setStartPosition(e.clientX);
        imgContainer.style.transition = "none";
      };

      const handleDragEnd = (e: MouseEvent) => {
        if (isDragging) {
          setIsDragging.off();
          setLastPosition(e.clientX);

          const delta = e.clientX - startPosition;
          imgContainer.style.transition = "transform 0.5s ease-out";
          const newPage = Math.min(
            Math.max(delta > 0 ? page - 1 : page + 1, 0),
            imgs.length - 1
          );
          setPage(newPage);
          imgContainer.style.transform = `translateX(${newPage * -100}%)`;
        }
      };

      const handleDrag = (e: MouseEvent) => {
        if (isDragging) {
          const diff = e.clientX - startPosition;

          imgContainer.style.transform = `translateX(calc(${
            page * -100
          }% + ${diff}px))`;
        }
      };

      imgContainer.style.transform = `translateX(${page * -100}%)`;
      imgContainer.addEventListener("mousedown", handleDragStart);
      imgContainer.addEventListener("mouseup", handleDragEnd);
      imgContainer.addEventListener("mousemove", handleDrag);

      return () => {
        imgContainer.removeEventListener("mousedown", handleDragStart);
        imgContainer.removeEventListener("mouseup", handleDragEnd);
        imgContainer.removeEventListener("mousemove", handleDrag);
      };
    }
  }, [imgs, page, isDragging, startPosition, lastPosition, imgContainerRef]);

  return (
    <Stack>
      <Flex justify="space-between" align="center" px={2}>
        <Flex align="center">
          <Flex
            justify="center"
            align="center"
            w="42px"
            h="42px"
            rounded="full"
            overflow="hidden"
          >
            <Icon name="pets" />
          </Flex>
          <Text fontWeight="bold">{post.author}</Text>
        </Flex>
        <Box>
          <TransparentButton>
            <Icon fontSize="1.5rem" name="more_horiz" />
          </TransparentButton>
        </Box>
      </Flex>
      <Box pos="relative" h="400px">
        <Flex
          ref={imgContainerRef}
          pos="relative"
          transition="transform 0.5s ease-out"
        >
          {imgs.map((img, i) => (
            <img
              key={i}
              crossOrigin="anonymous"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                position: "absolute",
                userSelect: "none",
                top: 0,
                left: i * 100 + "%",
              }}
              draggable={false}
              src={img.url}
              alt={img.title}
            />
          ))}
        </Flex>
        {imgs.length > 1 && (
          <Box
            pos="absolute"
            top={4}
            right={4}
            py={1}
            px={3}
            rounded="full"
            color="white"
            fontSize="sm"
            bg="rgba(0,0,0,0.5)"
          >
            {page + 1}/{imgs.length}
          </Box>
        )}

        {page > 0 && (
          <Box
            pos="absolute"
            top="50%"
            left={3}
            width="40px"
            height="40px"
            bg="rgba(255, 255, 255, 0.5)"
            rounded="full"
            transform="translate(0, -50%)"
            userSelect="none"
            cursor="pointer"
            onClick={() => setPage(page - 1)}
          >
            <Icon
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              name="chevron_left"
              lineHeight="1.27"
            />
          </Box>
        )}

        {page < imgs.length - 1 && (
          <Box
            pos="absolute"
            top="50%"
            right={3}
            width="40px"
            height="40px"
            bg="rgba(255, 255, 255, 0.5)"
            rounded="full"
            userSelect="none"
            transform="translate(0, -50%)"
            cursor="pointer"
            onClick={() => setPage(page + 1)}
          >
            <Icon
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              name="chevron_right"
              lineHeight="1.27"
            />
          </Box>
        )}
      </Box>

      <Stack px={2}>
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem display="flex">
            <TransparentButton>
              <Icon fontSize="1.5rem" name="favorite_border" />
            </TransparentButton>
            <TransparentButton>
              <Icon fontSize="1.5rem" name="comment" variant="outlined" />
            </TransparentButton>
            <TransparentButton>
              <Icon fontSize="1.5rem" name="send" variant="outlined" />
            </TransparentButton>
          </GridItem>

          <GridItem>
            <Flex justify="center" align="center" gap={1}>
              {imgs.length > 1 && imgs.map((img, i) => (
                <Box
                  display="inline-flex"
                  w="10px"
                  h="10px"
                  bg={i === page ? "cyan.400" : "#BBB"}
                  rounded="full"
                  key={i}
                  cursor="pointer"
                  onClick={() => setPage(i)}
                />
              ))}
            </Flex>
          </GridItem>

          <GridItem display="flex" justifyContent="flex-end">
            <TransparentButton>
              <Icon
                fontSize="1.5rem"
                name="bookmark_border"
                variant="outlined"
              />
            </TransparentButton>
          </GridItem>
        </Grid>

        <Text fontWeight="bold">100 Likes</Text>

        <Stack>
          <Box>
            <Text mr={1} as="span" fontWeight="bold">
              {post.author}
            </Text>
            <Text as="span">{post.description}</Text>
          </Box>
          <Box>
            <Text mr={1} as="span" fontWeight="bold">
              Ruffles
            </Text>
            <Text as="span">
              necessitatibus odit expedita ea dolore? Labore non magnam beatae
              quis?...
            </Text>
            <Text cursor="pointer" ml={1} as="span" color="gray">
              more
            </Text>
          </Box>
        </Stack>

        <Flex>
          <TransparentButton>
            <Icon fontSize="1.5rem" name="pets" />
          </TransparentButton>
          <Input variant="unstyled" placeholder="Add comment..." />
          <Flex w="fit-content" align="center">
            <TransparentButton h="auto" minW="none" p={1}>
              😍
            </TransparentButton>
            <TransparentButton h="auto" minW="none" p={1}>
              😂
            </TransparentButton>
            <TransparentButton h="auto" minW="none" p={1}>
              <Icon
                color="gray"
                fontSize="1.5rem"
                name="add_box"
                variant="outlined"
              />
            </TransparentButton>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
}

function TransparentButton(props: ButtonProps) {
  return (
    <Button
      variant="ghost"
      colorScheme="gray"
      p={props.p ?? 2}
      _hover={{
        bg: "transparent",
      }}
      _focus={{
        outline: "none",
      }}
      {...props}
    />
  );
}