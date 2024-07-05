import {
  Heading,
  Stack,
  Image,
  Button,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiArrowUpLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { LazyLoadedImage } from "../../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
export const EventSlider = ({ images, title, description, href, id }) => {
  return (
    <>
      <Stack
        _hover={{
          ".text-container": {
            h: "100%",
          },
        }}
        _active={{
          ".text-container": {
            h: "100%",
          },
        }}
        w="100%"
        borderRadius="lg"
        overflow="hidden"
        h="420px"
        pos="relative"
        zIndex="1"
        bgColor="orange.500"
      >
        <LazyLoadedImage
          src={images[0]?.URL}
          w="fit-content"
          m="0 auto"
          h="100%"
          ImageProps={{
            objectFit: "contain",
          }}
          bgColor="orange.500"
        />
        <Stack
          pos="absolute"
          bottom="0px"
          left="0"
          bgColor=" rgba(0, 0, 0, 0.3)"
          w="100%"
          h="0%"
          overflow="hidden"
          backdropFilter="blur(10px)"
          color="white"
          className="text-container"
          transition="0.5s"
          alignItems="start"
          zIndex="10"
        >
          <Heading as="h2" p="4" size="lg" w="100%" textAlign="right">
            {title}
          </Heading>
          <Heading as="h4" p="4" size="md" textAlign="right" w="100%">
            {description}
          </Heading>
          <Flex marginInline="4" gap="1">
            <Button
              variant="outline"
              colorScheme="orange"
              bgColor="white"
              gap="3"
              as={Link}
              to={href}
              target="_blank"
            >
              التوجه
              <HiArrowUpLeft />
            </Button>
            <Button
              variant="outline"
              colorScheme="yellow"
              bgColor="white"
              gap="3"
            >
              عرض الاعلان كامل
              <HiArrowUpLeft />
            </Button>
          </Flex>
        </Stack>
        <LazyLoadedImage
          src={images[0]?.URL}
          w="100%"
          h="100%"
          ImageProps={{
            objectFit: "cover",
          }}
          bgColor="orange.500"
          pos="absolute"
          inset="0px"
          zIndex="-1"
          opacity="0.3"
          filter="blur(5px)"
        />
      </Stack>
    </>
  );
};
