import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import ImageAssest from "../../../Assets/Categories/pepperoni-pizza-with-olives-wooden-board.jpg";
import { LazyLoadedImage } from "../LazyLoadedImage/LazyLoadedImage";
import styles from "./styles.module.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
const ProductModal = ({ isOpen, onClose, images, href }) => {
  const [imageViewedIndex, setImageViewedIndex] = useState(0);
  const HandleNext = () => {
    setImageViewedIndex(imageViewedIndex + 1);
  };
  const HandlePrev = () => {
    setImageViewedIndex(imageViewedIndex - 1);
  };
  const HandleNavigate = (index) => {
    setImageViewedIndex(index);
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>معلومات عن المنتج</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Stack} p="5">
          <Stack w="100%" pos="relative">
            <IconButton
              isDisabled={imageViewedIndex === 0}
              onClick={HandlePrev}
              pos="absolute"
              top="50%"
              right="-15px"
              colorScheme="orange"
              borderRadius="full"
              size="lg"
              sx={{
                translate: "0% -50%",
              }}
              _hover={{
                transform: "scale(1.05)",
              }}
              zIndex="10"
            >
              <BsArrowRight />
            </IconButton>
            <IconButton
              isDisabled={imageViewedIndex + 1 >= images.length}
              onClick={HandleNext}
              pos="absolute"
              top="50%"
              left="-15px"
              colorScheme="orange"
              borderRadius="full"
              size="lg"
              sx={{
                translate: "0% -50%",
              }}
              _hover={{
                transform: "scale(1.05)",
              }}
              zIndex="10"
            >
              <BsArrowLeft />
            </IconButton>
            <Box w="100%" h="280px" borderRadius="lg" overflow="hidden">
              <LazyLoadedImage
                w="100%"
                h="100%"
                objectFit="cover"
                ImageProps={{
                  objectFit: "cover",
                }}
                src={images[imageViewedIndex].URL}
                key={`viewd : ${imageViewedIndex}`}
                className={styles["image-animated"]}
              />
            </Box>
          </Stack>
          {images.length > 1 && (
            <Flex flexWrap="wrap" gap="3">
              {images.map((image, index) => {
                return (
                  <Image
                    objectFit="cover"
                    key={index}
                    src={image.URL}
                    w="145px"
                    h="100px"
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => HandleNavigate(index)}
                    transform={index === imageViewedIndex && "scale(1.05)"}
                    filter={index === imageViewedIndex && "saturate(.4)"}
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                    flexGrow="1"
                    transition="0.3s"
                    bgColor="gray.100"
                  />
                );
              })}
            </Flex>
          )}
        </ModalBody>
        <ModalFooter gap="3">
          <Button as={Link} to={href} colorScheme="orange">
            التوجه
          </Button>
          <Button onClick={onClose} variant="ghost">
            اغلاق
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export const ProductBox = ({
  title,
  description,
  createdAt,
  updatedAt,
  sizes,
  images,
  id,
}) => {
  const prices = sizes?.map((size) => {
    return size.price;
  });
  const PuplishedDate = new Date(
    createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
  ).toLocaleString();
  const UpdatedDate = new Date(
    updatedAt?.seconds * 1000 + updatedAt?.nanoseconds / 1000000
  ).toLocaleString();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ProductModal
        images={images}
        href={`/products/${id}`}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Card h="auto" w="sm">
        <CardBody p="0" pos="relative">
          <div className={styles.ribbon}>عروضنا غير</div>
          <Box
            onClick={onOpen}
            w="100%"
            h="280px"
            overflow="hidden"
            _hover={{
              img: {
                transform: "scale(1.1)",
                filter: "saturate(1.1)",
              },
              _before: {
                opacity: 1,
              },
            }}
            cursor="pointer"
            pos="relative"
            borderTopRadius="lg"
            _before={{
              content: `"اضغط هنا لباقي الصور و التفاصيل"`,
              pos: "absolute",
              inset: "0",
              w: "100%",
              h: "100%",
              bgColor: "rgb(0 , 0 , 0 , 0.1)",
              backdropFilter: "blur(7px)",
              zIndex: "1",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              color: "gray.50",
              fontSize: "2xl",
              opacity: 0,
              transition: "0.3s",
            }}
          >
            <LazyLoadedImage
              src={images[0]?.URL}
              alt="Green double couch with wooden legs"
              w="100%"
              h="100%"
              ImageProps={{
                objectFit: "cover",
                transition: "0.3s",
                bgColor: "orange.700",
              }}
            />
          </Box>

          <Stack p="2" mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>
            <Button colorScheme="green" variant="outline" bgColor="green.50">
              الاسعار تبدأ من {Math.min(...prices)} جنيه ل {Math.max(...prices)}
              جنيه
            </Button>
            <Button colorScheme="teal" variant="outline">
              تمت الاضافة عند {PuplishedDate}
            </Button>
            {updatedAt && (
              <Button variant="outline">تم التحديث عند {UpdatedDate}</Button>
            )}
          </Stack>
        </CardBody>
        <Divider color="gray.200" />
        <CardFooter>
          <ButtonGroup w="100%" spacing="2">
            <Button
              as={Link}
              to={`/products/${id}`}
              flexGrow="1"
              variant="solid"
              colorScheme="orange"
            >
              شراء
            </Button>
            <Button
              as={Link}
              to={`/products/${id}`}
              onClick={onOpen}
              variant="outline"
              colorScheme="orange"
            >
              تفاصيل
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};
