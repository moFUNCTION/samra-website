import {
  Flex,
  Heading,
  Stack,
  Box,
  Divider,
  IconButton,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { GridSystem } from "../GridSystem/GridSystem";
import { Logo } from "../Logo/Logo";
import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";
import { Header } from "../Header/Header";
import { CgArrowTopLeft } from "react-icons/cg";

export const Footer = () => {
  const [isPhoneQuery] = useMediaQuery("(max-width: 900px)");
  return (
    <GridSystem
      gap="3"
      justifyContent="center"
      columns={isPhoneQuery ? 1 : 3}
      rowSize="320px"
      bgColor="orange.600"
      p="3"
    >
      <Stack
        p="3"
        borderRadius="lg"
        justifyContent="space-between"
        bgColor="orange.50"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Stack gap="2">
            <Heading
              borderBottom="2px"
              borderBottomColor="orange.600"
              color="orange.600"
              pb="2"
              size="md"
            >
              @مطعم علفحم
            </Heading>

            <Heading color="orange.600" opacity="0.8" size="sm">
              احنا ملوك الاكل
            </Heading>
          </Stack>

          <Logo w="100px" />
        </Flex>
        <Stack>
          <Heading
            size="md"
            borderBottom="2px"
            borderBottomColor="orange.600"
            color="orange.600"
            pb="2"
          >
            تواصل معنا
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
        </Stack>
      </Stack>
      <Stack gap="5" p="3" borderRadius="lg" bgColor="orange.50">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading size="md">@ تم تطوير هذا الموقع من قبل</Heading>
          <Button colorScheme="orange" gap="2">
            mo hassan
            <CgArrowTopLeft />
          </Button>
        </Flex>
        <Heading size="sm">
          هذا السيستم تم تخصيصو لتسهيل عملية طلب وعرض المنتجات لمطعم علفحم
        </Heading>
        <Heading size="sm">نجاح مطعمك الالكتروني يبدأ معنا</Heading>
      </Stack>
      <Stack borderRadius="lg" p="3" bgColor="orange.50">
        <Heading
          borderBottom="2px"
          borderBottomColor="orange.800"
          color="orange.800"
          pb="2"
          size="md"
        >
          الصفحات
        </Heading>
      </Stack>
    </GridSystem>
  );
};
