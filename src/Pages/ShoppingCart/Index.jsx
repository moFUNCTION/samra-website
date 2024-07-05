import {
  Box,
  Flex,
  Grid,
  GridItem,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { OrderCheckout } from "./Parts/OrderCheckout/OrderCheckout";
import { ShoppingCartItems } from "./Parts/ShoppingCartItems/ShoppingCartItems";
export default function Index() {
  const [isPhoneQuery] = useMediaQuery("(max-width: 900px)");
  return (
    <Grid
      p="3"
      templateColumns={isPhoneQuery ? `repeat(1,1fr)` : `repeat( 3,1fr)`}
      gap="3"
      sx={
        isPhoneQuery && {
          ".orders-container": {
            order: 1,
          },
          ".shopping-cart-items-container": {
            order: 0,
          },
        }
      }
      gridAutoRows="calc(100vh - 119px)"
      justifyContent="center"
      alignItems="center"
    >
      <GridItem h="100%" className="orders-container">
        <OrderCheckout />
      </GridItem>
      <GridItem
        className="shopping-cart-items-container"
        colSpan={!isPhoneQuery && 2}
        overflow="auto"
        h="100%"
      >
        <ShoppingCartItems />
      </GridItem>
    </Grid>
  );
}
