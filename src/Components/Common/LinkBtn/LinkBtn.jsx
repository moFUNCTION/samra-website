import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const LinkBtn = ({ children, href, colorScheme = "gray", ...rest }) => {
  return (
    <Button
      as={Link}
      to={href}
      pos="relative"
      _before={{
        content: `""`,
        bgColor: `${colorScheme}.100`,
        pos: "absolute",
        bottom: "0px",
        left: "0%",
        w: "0%",
        h: "1px",
        transition: "0.5s",
      }}
      _after={{
        content: `""`,
        bgColor: `${colorScheme}.100`,
        pos: "absolute",
        top: "0px",
        right: "0%",
        w: "0%",
        h: "1px",
        transition: "0.5s",
      }}
      _hover={{
        _before: {
          w: "100%",
          bgColor: `${colorScheme}.900`,
        },
        _after: {
          w: "100%",
          bgColor: `${colorScheme}.900`,
        },
        bgColor: `${colorScheme}.50`,
      }}
      _active={{
        bgColor: `${colorScheme}.200`,
      }}
      as={Link}
      variant="ghost"
      {...rest}
    >
      {children}
    </Button>
  );
};
