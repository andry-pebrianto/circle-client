import {
  Box,
  Button,
  ButtonSpinner,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { usePostThread } from "../hooks/useThreadsData";
import { ThreadPostType } from "@/types";
import Upload from "@/components/Upload";

export default function HomeThreadForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [imageStatus, setImageStatus] = useState<{
    name: string;
    size: number;
  }>({
    name: "",
    size: 0,
  });
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);

  const { mutate } = usePostThread(() => {
    setContent("");
    setImage("");
    setImageStatus({
      name: "",
      size: 0,
    });
  });

  const postThread = () => {
    const thread: ThreadPostType = {
      content,
    };
    if (image) thread.image = image;

    mutate(thread);
  };

  return (
    <Fragment>
      <Flex alignItems={"center"} gap={"10px"} mb={"30px"}>
        <Image
          borderRadius="full"
          boxSize="40px"
          objectFit="cover"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov Profile Page"
        />
        <FormControl>
          <Input
            type="text"
            placeholder="Let's post new thread!"
            value={content}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setContent(event.target.value)
            }
          />
        </FormControl>
        <Box
          fontSize={"3xl"}
          color={"#38a169"}
          cursor={"pointer"}
          onClick={onOpen}
        >
          <RiImageAddFill />
        </Box>
        {isUploadLoading ? (
          <Button px={"20px"} colorScheme="green" borderRadius={"full"}>
            <ButtonSpinner />
          </Button>
        ) : (
          <Button
            px={"20px"}
            colorScheme="green"
            borderRadius={"full"}
            onClick={postThread}
          >
            Post
          </Button>
        )}
      </Flex>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Upload
              maxSize={2000000}
              isLoading={isUploadLoading}
              setIsLoading={setIsUploadLoading}
              fileUpload={image}
              setFileUpload={setImage}
              imageStatus={imageStatus}
              setImageStatus={setImageStatus}
              disabled={isUploadLoading}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
