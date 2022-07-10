import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../../client/components/Icon";
import { INewPhoto } from "../../server/routes/api/posts";

export default function CreatePost() {
  const [photos, setPhotos] = useState<INewPhoto[]>([]);
  const { open, hookInfo } = useNewPhotoModal<number>((newPhoto, hookInfo) => {
    if (hookInfo.isEditing === false) {
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    } else {
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo, i) =>
          i === hookInfo.isEditing ? newPhoto : photo
        )
      );
    }
  });

  return (
    <Box pos="fixed" inset={0} bg="#000">
      <Flex align="center" justify="space-between" p={4}>
        <Flex align="center">
          <Icon name="arrow_back" color="white" lineHeight="1.24" />
          <Text ml={2} fontSize="2xl" color="white">
            Creating post
          </Text>
        </Flex>
        <Flex align="center">
          <Button colorScheme="blue" variant="link" rightIcon={<Icon name="arrow_right" />}>
            Send
          </Button>
        </Flex>
      </Flex>

      <Stack mb={4} px={2}>
        {photos.map((photo, index) => (
          <Flex
            rounded="md"
            key={index}
            bg="white"
            p={2}
            align="center"
            justify="space-between"
          >
            <Flex align="center">
              <img
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  maxWidth: "100px",
                  maxHeight: "100px",
                }}
                src={photo.url}
                alt={photo.title}
              />
              <Text overflow="hidden" ml={2} fontSize="md">
                {photo.title}
              </Text>
            </Flex>

            <Flex gap={2}>
              <IconButton
                colorScheme="red"
                variant="ghost"
                onClick={() => {
                  setPhotos((prevPhotos) =>
                    prevPhotos.filter((_p, i) => i !== index)
                  );
                }}
                icon={<Icon name="delete" />}
                aria-label="delete"
              />
              <IconButton
                colorScheme="blue"
                variant="ghost"
                onClick={() => {
                  hookInfo.setTitle(photo.title);
                  hookInfo.setUrl(photo.url);
                  open(index);
                }}
                icon={<Icon name="edit" />}
                aria-label="delete"
              />
            </Flex>
          </Flex>
        ))}

        <Button
          rounded="md"
          bg="white"
          p={2}
          cursor="pointer"
          onClick={() => open()}
        >
          <Flex align="center">
            <Text ml={2} fontSize="large">
              Add new photo
            </Text>
          </Flex>
        </Button>
      </Stack>

      <NewPhotoModal hookInfo={hookInfo} />
    </Box>
  );
}

interface INewPhotoModalProps {
  hookInfo: {
    isEditing: false | number;
    onSubmit: (
      photos: INewPhoto,
      hookInfo: INewPhotoModalProps["hookInfo"]
    ) => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
}

function useNewPhotoModal<ID extends number | string = number | string>(
  onSubmit: (
    photo: INewPhoto,
    hookInfo: INewPhotoModalProps["hookInfo"]
  ) => void
) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [isEditing, setIsEditing] = useState<false | ID>(false);

  function onOpenMid(editingId: false | ID = false) {
    if (editingId === false) {
      setIsEditing(false);
      setTitle("");
      setUrl("");
    } else {
      setIsEditing(editingId);
    }
    onOpen();
  }

  return {
    title,
    url,
    isOpen,
    isEditing,
    open: onOpenMid,

    hookInfo: {
      isEditing,
      onSubmit: (
        { title, url }: INewPhoto,
        hookInfo: INewPhotoModalProps["hookInfo"]
      ) => {
        onClose();
        onSubmit({ title, url }, hookInfo);
      },
      title,
      setTitle,
      url,
      setUrl,
      isOpen,
      onOpen,
      onClose,
    } as INewPhotoModalProps["hookInfo"],
  };
}

function NewPhotoModal({ hookInfo }: INewPhotoModalProps) {
  const regex = useMemo(
    () =>
      /^https?:\/\/[\w|-]{3,}(\:[0-9]{2,5}|(.[\w|-]+){2,})(\/[\w|.|-|_]*)*(\?(\w+(=(\w|\%\d+)*)?\&?)*)?$/,
    []
  );

  const validateUrl = useMemo(() => {
    return (value: string) => {
      if (value.length === 0 || !regex.test(value)) {
        return false;
      }
      return true;
    };
  }, [regex]);

  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
  const [validatUrlTimer, setValidatUrlTimer] = useState<
    NodeJS.Timeout | undefined
  >();

  useUpdateEffect(() => {
    setValidatUrlTimer(
      setTimeout(async () => {
        setIsValidUrl(
          validateUrl(hookInfo.url) && (await testImageUrl(hookInfo.url))
        );
      }, 500)
    );

    return () => {
      if (validatUrlTimer) {
        clearTimeout(validatUrlTimer);
      }
    };
  }, [hookInfo.url]);

  return (
    <Modal
      isOpen={hookInfo.isOpen}
      onClose={hookInfo.onClose}
      scrollBehavior="inside"
      isCentered
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New photo</ModalHeader>
        <ModalBody>
          <Stack>
            <Stack align="center">
              {isValidUrl ? (
                <>
                  <Text fontSize="2xl">Preview</Text>
                  <Box maxH="250px">
                    <img
                      style={{
                        width: "400px",
                        maxHeight: "250px",
                        imageRendering: "pixelated",
                        objectFit: "contain",
                      }}
                      src={hookInfo.url}
                      alt={hookInfo.title}
                    />
                  </Box>
                </>
              ) : (
                <Text fontSize="2xl">No Preview</Text>
              )}
            </Stack>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={hookInfo.title}
                onChange={(e) => hookInfo.setTitle(e.currentTarget.value)}
                placeholder={hookInfo.url || "Enter title"}
              />
              <FormHelperText>Alt text</FormHelperText>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!(hookInfo.url === "" || regex.test(hookInfo.url))}
            >
              <FormLabel>Image URL</FormLabel>
              <Input
                spellCheck={false}
                type="url"
                value={hookInfo.url}
                onChange={(e) => hookInfo.setUrl(e.currentTarget.value)}
                placeholder="Image URL"
              />
              <FormErrorMessage>Invalid URL</FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            colorScheme="blue"
            mr={3}
            onClick={hookInfo.onClose}
          >
            Close
          </Button>
          <Button
            colorScheme="blue"
            disabled={regex.test(hookInfo.url) === false}
            onClick={() =>
              hookInfo.onSubmit(
                {
                  title: hookInfo.title || hookInfo.url,
                  url: hookInfo.url,
                },
                hookInfo
              )
            }
          >
            {hookInfo.isEditing ? "Edit" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function testImageUrl(url: string): Promise<boolean> {
  return fetch(url, {
    method: "GET",
  })
    .then((res) => {
      return res.ok;
    })
    .catch(() => {
      return false;
    });
}

function useUpdateEffect(
  effect: () => void | (() => void),
  dependencies: any[]
) {
  const isMounted = useRef<boolean | void | (() => void)>(false);
  useEffect(() => {
    if (isMounted.current !== false) {
      isMounted.current = effect();
    }

    isMounted.current = true;
    return () => {
      if (typeof isMounted.current === "function") {
        isMounted.current();
      }
    };
  }, dependencies);
}
