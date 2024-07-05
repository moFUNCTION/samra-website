import { Flex, Heading, IconButton, Image, Stack } from "@chakra-ui/react";
import React from "react";
import SocialAssest from "../../../../Assets/Social/undraw_wait_in_line_o2aq.svg";
import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";
import { LazyLoadedImage } from "../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
export const Social = () => {
  return (
    <Flex
      minH="400px"
      justifyContent="center"
      alignItems="center"
      gap="5"
      w="100%"
      flexWrap="wrap"
      p="5"
    >
      <LazyLoadedImage w="100%" maxW="500px" src={SocialAssest} />
      <Stack gap="3" w="100%" maxW="350px">
        <Heading
          borderBottom="2px"
          borderBottomColor="orange.600"
          size="lg"
          color="orange.600"
          p="3"
        >
          للتواصل معنا
        </Heading>
        <Flex gap="3">
          <IconButton colorScheme="facebook">
            <FaFacebook />
          </IconButton>
          <IconButton colorScheme="whatsapp">
            <FaWhatsapp />
          </IconButton>
          <IconButton colorScheme="purple">
            <FaInstagram />
          </IconButton>
          <IconButton colorScheme="orange">
            <FaPhone />
          </IconButton>
        </Flex>
        <Heading
          borderBottom="2px"
          borderBottomColor="orange.600"
          size="lg"
          color="orange.600"
          p="3"
        >
          مواقعنا
        </Heading>
      </Stack>
    </Flex>
  );
};
