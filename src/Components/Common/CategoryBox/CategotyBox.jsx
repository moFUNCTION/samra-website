import { Box, Button, Heading, Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { LazyLoadedImage } from "../LazyLoadedImage/LazyLoadedImage";
import { Link } from "react-router-dom";
export const CategoryBox = ({
  title,
  images,
  description,
  searchKey,
  createdAt,
  updatedAt,
  availabilityType,
  id,
  ...rest
}) => {
  return (
    <Box
      bgColor="orange.500"
      w="200px"
      h="200px"
      borderRadius="full"
      p="2"
      pos="relative"
      transition="0.3s"
      border="2px"
      borderColor="orange.500"
      _hover={{
        p: 1,
        bgColor: "orange.50",
        "> .title": {
          bgColor: "orange.50",
          color: "orange.500",
        },
        img: {
          transform: "scale(1.15)",
        },
      }}
      cursor="pointer"
      {...rest}
      as={Link}
      to={`/products?where_categoryId=${id}`}
    >
      <Box
        bgColor="orange.500"
        overflow="hidden"
        w="100%"
        h="100%"
        borderRadius="full"
      >
        <LazyLoadedImage
          transition="0.3s"
          src={images[0]?.URL}
          ImageProps={{
            objectFit: "cover",
            transition: "0.3s",
          }}
          w="100%"
          h="100%"
        />
      </Box>

      <Heading
        className="title"
        as="h5"
        bgColor="orange.500"
        p="3"
        borderRadius="full"
        size="md"
        textAlign="center"
        pos="absolute"
        bottom="-25px"
        left="50%"
        transition="0.3s"
        sx={{
          translate: "-50% 0%",
        }}
        border="2px"
        borderColor="orange.500"
        w="100%"
        color="white"
      >
        {title}
      </Heading>
    </Box>
  );
};
