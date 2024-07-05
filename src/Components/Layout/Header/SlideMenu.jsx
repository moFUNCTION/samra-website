import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Heading,
  Stack,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { Links } from "./Links";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaShippingFast, FaShoppingBag } from "react-icons/fa";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
export const SlideMenu = ({ isOpen, onClose }) => {
  const { user } = UseUserData();
  return (
    <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>القائمة</DrawerHeader>

        <DrawerBody overflow="auto" as={Stack} justifyContent="center" gap="3">
          {Links.map((link, index) => {
            return (
              <Flex
                key={index}
                alignItems="center"
                justifyContent="space-between"
                borderBottom="2px"
                color="orange.700"
                as={Link}
                to={link.href}
                onClick={onClose}
                _hover={{
                  h3: {
                    mr: "15px",
                  },
                }}
              >
                <Heading transition="0.3s" as="h3" size="lg" p="2">
                  {link.title}
                </Heading>
                <BsArrowLeft style={{ fontSize: "20px" }} />
              </Flex>
            );
          })}
        </DrawerBody>

        <DrawerFooter flexWrap="wrap" justifyContent="start" gap="2">
          {user.data ? (
            <>
              <Button
                gap="3"
                colorScheme="orange"
                variant="outline"
                bgColor="orange.50"
              >
                الطلبيات المنفذة
                <FaShippingFast />
              </Button>
              <Button gap="2" colorScheme="orange">
                سلة الطلبيات
                <FaShoppingBag />
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant="outline"
                colorScheme="orange"
                onClick={onClose}
              >
                تسجيل الدخول
              </Button>

              <Button
                as={Link}
                to="/register"
                colorScheme="orange"
                onClick={onClose}
              >
                انشاء حساب
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
