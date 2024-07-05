import React, { useState } from "react";
import { Stack, Image, Flex, Button } from "@chakra-ui/react";
import { MostOrderedProducts } from "./Sections/MostOrderedProducts";
import { LatestProducts } from "./Sections/LatestProducts";
export const Products = () => {
  return (
    <Stack p="0">
      <MostOrderedProducts />
      <LatestProducts />
    </Stack>
  );
};
