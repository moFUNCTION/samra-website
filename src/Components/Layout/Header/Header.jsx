import React from "react";
import {
  Avatar,
  Button,
  Drawer,
  Flex,
  HStack,
  Heading,
  IconButton,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { Logo } from "../Logo/Logo";
import { LinkBtn } from "../../Common/LinkBtn/LinkBtn";
import { FaBars, FaShippingFast, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { SlideMenu } from "./SlideMenu";
import { Links } from "./Links";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { ProductSearchField } from "../../Common/ProductSearchField/ProductSearchField";
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = React.useState(null);

  React.useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}
export const Header = () => {
  const [isPhoneQuery] = useMediaQuery("(max-width: 1000px)");
  const headerWillFixedInRoutes = ["login", "register", "products"];
  const { pathname } = useLocation();
  const [route] = pathname.split("/").slice(-1);
  const scrollDirection = useScrollDirection();
  const {
    isOpen: isSlideMenuOpened,
    onOpen: onOpenSlideMenu,
    onClose: onCloseSideMenu,
  } = useDisclosure();
  const { user } = UseUserData();
  return (
    <>
      <SlideMenu isOpen={isSlideMenuOpened} onClose={onCloseSideMenu} />
      <HStack
        flexDir="row-reverse"
        justifyContent="space-between"
        p="2"
        gap="4"
        pos={!headerWillFixedInRoutes.includes(route) && "sticky"}
        top="0"
        sx={
          !headerWillFixedInRoutes.includes(route) && {
            translate: scrollDirection === "down" ? "0% -100%" : "0% 0%",
          }
        }
        w="100%"
        bgColor="white"
        zIndex="1000"
        transition="0.3s"
      >
        <Link to="/">
          <Logo w="120px" />
        </Link>
        {!isPhoneQuery && (
          <Flex gap="3" alignItems="center">
            {Links.slice(0, 5).map((link, index) => {
              return (
                <LinkBtn
                  href={link.href}
                  size={isPhoneQuery ? "sm" : "md"}
                  key={index}
                >
                  {link.title}
                </LinkBtn>
              );
            })}
            <Button variant="link" onClick={onOpenSlideMenu}>
              ...المزيد
            </Button>
          </Flex>
        )}

        <HStack justifyContent="center" gap="2">
          <Tooltip label="حسابك يكبير">
            <IconButton
              onClick={onOpenSlideMenu}
              borderRadius="full"
              p="1"
              w="fit-content"
              h="fit-content"
              isLoading={user.loading}
            >
              <Avatar src={user.data?.photoURL} size="sm" />
            </IconButton>
          </Tooltip>
          <ProductSearchField
            BtnStyles={{
              colorScheme: "orange",
              variant: "outline",
              borderRadius: "full",
            }}
            variant="IconButton"
          />
          <Tooltip label="السلة">
            <IconButton
              as={Link}
              to="/shopping-cart"
              borderRadius="full"
              colorScheme="orange"
            >
              <FaShoppingCart />
            </IconButton>
          </Tooltip>
          {isPhoneQuery ? (
            <IconButton
              colorScheme="orange"
              variant="outline"
              bgColor="orange.50"
              borderRadius="full"
            >
              <FaShippingFast />
            </IconButton>
          ) : (
            <Button
              colorScheme="orange"
              variant="outline"
              bgColor="orange.50"
              borderRadius="full"
              as={Link}
              to="/orders"
            >
              الطلبيات المنفذة
            </Button>
          )}

          {isPhoneQuery && (
            <IconButton
              colorScheme="orange"
              borderRadius="full"
              onClick={onOpenSlideMenu}
            >
              <FaBars />
            </IconButton>
          )}
          {!isPhoneQuery && !user.data && (
            <>
              <Button
                as={Link}
                to="/login"
                borderRadius="full"
                colorScheme="yellow"
                variant="outline"
                isLoading={user.loading}
              >
                تسجيل الدخول
              </Button>

              <Button
                as={Link}
                to="/register"
                borderRadius="full"
                colorScheme="orange"
                isLoading={user.loading}
              >
                انشاء حساب
              </Button>
            </>
          )}
        </HStack>
      </HStack>
    </>
  );
};
