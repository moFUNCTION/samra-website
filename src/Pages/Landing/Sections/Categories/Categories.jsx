import React from "react";
import { Stack, Image, Box, Heading } from "@chakra-ui/react";
import EventsHeaderTitle from "../../../../Assets/Categories/الاحدا__3_-removebg-preview.png";
import { Carousel } from "../../../../Components/Layout/Carousel/Carousel";
import styles from "./styles.module.css";
import { CategoryBox } from "../../../../Components/Common/CategoryBox/CategotyBox";
import { useGetCategories } from "../../../../@Firebase/Hooks/Categories/useGetCategories/useGetCategories";
import { LazyLoadedImage } from "../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
export const Categories = () => {
  const { data, loading, error } = useGetCategories();
  console.log(data, error);
  return (
    <Stack p="2" pos="relative">
      <LazyLoadedImage
        src={EventsHeaderTitle}
        w="240px"
        decoding="async"
        loading="lazy"
        p="1"
      />
      <Carousel
        style={{ paddingBottom: "80px" }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        isLoaded={!loading}
        height="200px"
      >
        {data?.map((category, index) => {
          return <CategoryBox {...category} key={index} />;
        })}
      </Carousel>
      <svg
        className={styles.wave}
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
  );
};
