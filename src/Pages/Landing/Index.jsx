import React from "react";
import { Events } from "./Sections/Events/Events";
import { Stack } from "@chakra-ui/react";
import { Categories } from "./Sections/Categories/Categories";
import { Products } from "./Sections/Products/Products";
import { Social } from "./Sections/Social/Social";

export default function Index() {
  return (
    <>
      <Stack gap="0">
        <Events />
        <Categories />
        <Products />
        <Social />
      </Stack>
    </>
  );
}
