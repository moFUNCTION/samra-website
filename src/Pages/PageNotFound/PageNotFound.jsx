import { Button, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import AnimationData from "../../Assets/Error/Animation - 1707156954178.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <Stack
      minH="calc(100vh - 97px)"
      justifyContent="center"
      alignItems="center"
    >
      <Lottie
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
        animationData={AnimationData}
      />
      <Heading size="md">لا توجد صفحة بذلك الرابط</Heading>
      <Button mt="3" colorScheme="orange" as={Link} to="/">
        الذهاب الي الرئيسية
      </Button>
    </Stack>
  );
}
