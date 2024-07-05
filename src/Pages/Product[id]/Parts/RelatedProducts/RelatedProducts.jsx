import { Button, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { ProductBox } from "../../../../Components/Common/ProductBox/ProductBox";
import { useGetProducts } from "../../../../@Firebase/Hooks/Products/useGetProducts/useGetProducts";
import { Carousel } from "../../../../Components/Layout/Carousel/Carousel";
import RelatedProductImage from "../../../../Assets/Products/الاحدا__7_-removebg-preview (2).png";
import { LazyLoadedImage } from "../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import Lottie from "lottie-react";
import ErrorAnimation from "../../../../Assets/Error/Animation - 1707156954178.json";
export const RelatedProducts = ({
  categoryId,
  productId,
  isProductLoading,
}) => {
  const size = 5;
  const { data, loading, error } = useGetProducts({
    whereQueries: [
      {
        field: "categoryId",
        operator: "==",
        value: categoryId,
      },
      {
        field: "__name__",
        operator: "!=",
        value: productId,
      },
    ],
    size,
    isDependantLoading: isProductLoading,
  });

  return (
    <Stack gap="3" pos="relative" p="2">
      <LazyLoadedImage src={RelatedProductImage} w="100%" maxW="240px" p="2" />
      {data.length === 0 && !loading && !isProductLoading && (
        <Stack
          justifyContent="center"
          alignItems="center"
          bgColor="orange.50"
          p="3"
          borderRadius="lg"
        >
          <Lottie
            style={{
              width: "100%",
              maxWidth: "300px",
            }}
            animationData={ErrorAnimation}
          />
          <Heading size="md">لا يوجد منتجات من نفس الفئة لعرضها</Heading>
        </Stack>
      )}
      <Carousel
        isLoaded={!loading && !isProductLoading}
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
        {data?.map((product) => {
          return <ProductBox {...product} key={product.id} />;
        })}
      </Carousel>
      {data.length > size && (
        <Button colorScheme="orange" w="fit-content" m="0 auto">
          عرض كل الوجبات من نفس الفئة
        </Button>
      )}
    </Stack>
  );
};
