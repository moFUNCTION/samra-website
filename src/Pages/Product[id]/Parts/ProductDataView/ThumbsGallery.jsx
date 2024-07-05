import React from "react";
import { Carousel } from "../../../../Components/Layout/Carousel/Carousel";
import { LazyLoadedImage } from "../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import { Box } from "@chakra-ui/react";
export const ThumbsGallery = ({ loading, images }) => {
  return (
    <Box w="100%" maxW="600px" h="445px">
      <Carousel
        height="100%"
        isLoaded={!loading}
        breakpoints={{}}
        spaceBetween="30px"
      >
        {images?.map((image, index) => {
          return (
            <LazyLoadedImage
              key={index}
              src={image.URL}
              w="100%"
              h="100%"
              borderRadius="lg"
              ImageProps={{
                objectFit: "cover",
              }}
            />
          );
        })}
      </Carousel>
    </Box>
  );
};
