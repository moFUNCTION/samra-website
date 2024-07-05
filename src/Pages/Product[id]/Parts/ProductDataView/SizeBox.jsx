import React from "react";
import { Flex, Button, Checkbox, IconButton } from "@chakra-ui/react";
import { TranslateSize } from "../../../../Utils/TranslateSize/TranslateSize";
import { IoAddSharp } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
export const SizeBox = ({
  onChange,
  size,
  sizeRequestedInShoppingCart,
  onIncreament,
  onDecreament,
}) => {
  return (
    <Flex gap="2" alignItems="center">
      <Checkbox
        w="100%"
        p="2"
        bgColor="orange.200"
        colorScheme="orange"
        _checked={{
          bgColor: "orange.600",
          color: "white",
        }}
        borderRadius="lg"
        pr="4"
        transition="0.3s"
        isChecked={sizeRequestedInShoppingCart !== undefined}
        onChange={(e) => {
          onChange(e, size);
        }}
        display="flex"
      >
        {TranslateSize({ title: size.size })} : {size.price}
      </Checkbox>
      {sizeRequestedInShoppingCart && (
        <Flex gap="2" alignItems="center" w="fit-content">
          <IconButton
            borderRadius="full"
            colorScheme="orange"
            size="sm"
            onClick={() => onIncreament(size.id)}
          >
            <IoAddSharp />
          </IconButton>
          <Button borderRadius="full" colorScheme="orange">
            {sizeRequestedInShoppingCart?.quantity}
          </Button>
          <IconButton
            onClick={() => onDecreament(size.id)}
            borderRadius="full"
            colorScheme="orange"
            size="sm"
          >
            <IoRemove />
          </IconButton>
        </Flex>
      )}
    </Flex>
  );
};
