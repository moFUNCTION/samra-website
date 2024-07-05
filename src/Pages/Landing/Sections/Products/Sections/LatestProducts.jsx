import React from "react";
import LatestTitle from "../../../../../Assets/Products/الاحدا__6_-removebg-preview (1).png";
import { LazyLoadedImage } from "../../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import { Stack, Image, Flex, Button } from "@chakra-ui/react";
import { useGetProducts } from "../../../../../@Firebase/Hooks/Products/useGetProducts/useGetProducts";
import { ProductBox } from "../../../../../Components/Common/ProductBox/ProductBox";
import { Carousel } from "../../../../../Components/Layout/Carousel/Carousel";
import { Link } from "react-router-dom";
import { CgArrowTopLeft } from "react-icons/cg";
import styles from "./styles.module.css";
export const LatestProducts = () => {
  const { data, error, loading } = useGetProducts({
    size: 5,
    orderByQueries: [{ field: "createdAt", direction: "desc" }],
  });
  return (
    <>
      <Stack pos="relative" p="2">
        <LazyLoadedImage src={LatestTitle} w="100%" maxW="240px" p="2" />
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
          to="/products?orderBy_createdAt=desc"
        >
          مشاهدة المزيد <CgArrowTopLeft />
        </Button>
        <svg
          className={styles["wave-top"]}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#FEEBC8"
            fillOpacity={1}
            d="M0,192L48,208C96,224,192,256,288,261.3C384,267,480,245,576,234.7C672,224,768,224,864,197.3C960,171,1056,117,1152,128C1248,139,1344,213,1392,250.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </Stack>
    </>
  );
};
