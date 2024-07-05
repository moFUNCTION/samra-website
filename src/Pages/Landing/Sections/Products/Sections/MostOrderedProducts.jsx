import React from "react";
import { ProductBox } from "../../../../../Components/Common/ProductBox/ProductBox";
import { useGetProducts } from "../../../../../@Firebase/Hooks/Products/useGetProducts/useGetProducts";
import { Carousel } from "../../../../../Components/Layout/Carousel/Carousel";
import { Link } from "react-router-dom";
import { CgArrowTopLeft } from "react-icons/cg";
import { Stack, Image, Flex, Button } from "@chakra-ui/react";
import { LazyLoadedImage } from "../../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import MostOrderedTitle from "../../../../../Assets/Products/الاحدا__5_-removebg-preview.png";
import styles from "./styles.module.css";
export const MostOrderedProducts = () => {
  const { data, error, loading } = useGetProducts({
    size: 5,
    orderByQueries: [{ field: "purchasedCount", direction: "asc" }],
  });
  return (
    <Stack p="2" pos="relative">
      <LazyLoadedImage src={MostOrderedTitle} w="100%" maxW="240px" p="2" />
      <Carousel
        isLoaded={!loading}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        spaceBetween="30px"
        height="350px"
      >
        {data?.map((product, index) => {
          return <ProductBox {...product} key={index} />;
        })}
      </Carousel>

      <Button
        colorScheme="orange"
        w="fit-content"
        m="0 auto"
        size="lg"
        as={Link}
        borderRadius="full"
        variant="outline"
        bgColor="orange.50"
        gap="3"
        to="/products?orderBy_purchasedCount=asc"
      >
        مشاهدة المزيد <CgArrowTopLeft />
      </Button>
      <svg
        className={styles["wave-bottom"]}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#FEEBC8"
          fillOpacity={1}
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </Stack>
  );
};
