import React, { useEffect } from "react";
import { useShoppingCartItems } from "../../../../Context/ShoppingCartProvider/ShoppingCartProvider";
import { Flex, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { ShoppingCartItemBox } from "./Components/ShoppingCartItem/ShoppingCartItemBox";
import NoOrdersImage from "../../../../Assets/NoOrders/no-order-image-removebg-preview.png";
import { LazyLoadedImage } from "../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
export const ShoppingCartItems = () => {
  const { data, loading, error } = useShoppingCartItems({ size: 6 });
  return (
    <Flex
      h="100%"
      p="2"
      overflow="auto"
      borderRadius="lg"
      bgColor="gray.100"
      flexGrow="1"
      as={Skeleton}
      fadeDuration={2}
      isLoaded={!loading}
      flexWrap="wrap"
      gap="6"
      justifyContent="center"
      alignItems="center"
    >
      {data.map((item) => {
        return <ShoppingCartItemBox {...item} key={item.id} />;
      })}
      {data?.length === 0 && !loading && (
        <Stack>
          <LazyLoadedImage src={NoOrdersImage} w="100%" maxW="300px" />
          <Heading textAlign="center" size="md">
            لا يوجد اوردرات لعرضها
          </Heading>
        </Stack>
      )}
    </Flex>
  );
};
