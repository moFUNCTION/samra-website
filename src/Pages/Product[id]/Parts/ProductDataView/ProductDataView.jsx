import React, { useState } from "react";
import { useGetProduct } from "../../../../@Firebase/Hooks/Products/useGetProduct[id]/useGetProduct";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Stack,
  Image,
  Heading,
  Text,
  SkeletonText,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
  Checkbox,
  IconButton,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { TranslateSize } from "../../../../Utils/TranslateSize/TranslateSize";
import { ThumbsGallery } from "./ThumbsGallery";
import { BiSolidComment } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { useShoppingCart } from "./../../../../Context/ShoppingCartProvider/ShoppingCartProvider";
import { FaCheck } from "react-icons/fa6";
import { IoAddSharp } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import { SizeBox } from "./SizeBox";
import { MdDelete } from "react-icons/md";
export const ProductDataView = ({
  product: { data, loading, error },
  productId,
}) => {
  const toast = useToast({
    position: "top-right",
    duration: 5000,
    isClosable: true,
    variant: "left-accent",
    containerStyle: {
      w: "200px",
    },
  });
  const {
    onAddProductToShoppingCart,
    onUpdateProductInShoppingCart,
    GetItemInShoppingCart,
    onDeleteItemFromShoppingCart,
    onUpdateProductProvidedText,
  } = useShoppingCart();
  const storedOrderInShoppingCart = GetItemInShoppingCart({ productId });
  const HandleProductExistanceInShoppingCart = (e, size) => {
    if (!storedOrderInShoppingCart) {
      if (e.target.checked) {
        onAddProductToShoppingCart({ productId, sizesRequested: [size] });
        toast({
          status: "success",
          title: "الوجبة اضافت يكبير 😎 ",
          description: `تم اضافة وجبة بحجم  ${TranslateSize({
            title: size.size,
          })} `,
        });
      }
    } else {
      const sizedExistInItemStored =
        storedOrderInShoppingCart?.sizesRequested.find(
          (sizeRequested) => sizeRequested.id === size.id
        );
      if (!e.target.checked) {
        if (
          storedOrderInShoppingCart?.sizesRequested.length <= 1 &&
          sizedExistInItemStored
        ) {
          onDeleteItemFromShoppingCart({ productId });
          toast({
            status: "warning",
            title: `كدة اتشالت الوجبة خالص 😥`,
            description: `ميهمكش يكبير ضيف وجبات تاني بأحجام مختلفة وانبسط 😘`,
          });
        } else {
          onUpdateProductInShoppingCart({
            productId,
            sizeId: size.id,
            updateProcessOnQuantity: "delete",
          });
          toast({
            status: "warning",
            title: `كدة اتشالت الوجبة الي بالحجم ${TranslateSize({
              title: size.size,
            })} 😥 `,
            description: `ميهمكش يكبير ضيف وجبات تاني بأحجام مختلفة وانبسط 😘`,
          });
        }
      } else {
        if (!sizedExistInItemStored) {
          onUpdateProductInShoppingCart({
            productId,
            sizeId: size.id,
            newSize: size,
          });
          toast({
            status: "success",
            title: `ايواا كدا , اضاف وجبة بحجم ${TranslateSize({
              title: size.size,
            })} 😎 `,
            description: `احلي مسا يكبير 😘`,
          });
        }
      }
    }
  };
  const HandleIncreametQuantity = (sizeId) => {
    onUpdateProductInShoppingCart({
      productId,
      sizeId,
      updateProcessOnQuantity: "increament",
    });
  };
  const HandleDecreamentQuantity = (sizeId) => {
    onUpdateProductInShoppingCart({
      productId,
      sizeId,
      updateProcessOnQuantity: "decreament",
    });
  };
  const HandleChageProvidedText = (e) => {
    onUpdateProductProvidedText({ productId, providedText: e.target.value });
  };
  const HandleRemoveProductFromShoppingCart = () => {
    onDeleteItemFromShoppingCart({
      productId,
    });
    toast({
      status: "warning",
      title: `كدة اتشالت الوجبة خالص 😥`,
      description: `ميهمكش يكبير ضيف وجبات تاني بأحجام مختلفة وانبسط 😘`,
    });
  };
  return (
    <Flex
      flexWrap="wrap"
      justifyContent="center"
      gap="4"
      p="3"
      bgColor="orange.50"
    >
      <ThumbsGallery loading={loading} images={data?.images} />
      <Stack
        as={SkeletonText}
        noOfLines={4}
        skeletonHeight="5"
        w="100%"
        maxW="500px"
        gap="3"
        isLoaded={!loading}
        fadeDuration={2}
        flexGrow="1"
      >
        <Heading
          borderBottom="2px"
          borderBottomColor="orange.700"
          color="orange.700"
          pb="3"
          size="lg"
          mt="2"
        >
          {data?.title}
        </Heading>
        <Heading mt="4" size="md" color="orange.600">
          {data?.description}
        </Heading>
        <Stack mt="4" p="3" borderRadius="lg" bgColor="orange.100">
          <Heading
            size="md"
            borderBottom="2px"
            borderBottomColor="orange.700"
            p="2"
            color="orange.700"
          >
            الاسعار
          </Heading>
          {data?.sizes.map((child, index) => {
            const { size, price } = child;
            return (
              <Heading
                borderBottom="2px"
                borderBottomColor="orange.600"
                color="orange.600"
                p="2"
                size="sm"
                key={index}
              >
                {TranslateSize({ title: size })} : {price}
              </Heading>
            );
          })}
        </Stack>
        <Accordion allowMultiple>
          <AccordionItem mt="4" border="0">
            <Button gap="4" as={AccordionButton} colorScheme="orange">
              شراء
              <AccordionIcon />
            </Button>
            <AccordionPanel w="100%" gap="3" as={Stack} p="0" paddingBlock={4}>
              {data?.sizes.map((size) => {
                const sizeRequestedInShoppingCart =
                  storedOrderInShoppingCart?.sizesRequested?.find((item) => {
                    return item.id === size.id;
                  });
                return (
                  <SizeBox
                    key={size.id}
                    size={size}
                    sizeRequestedInShoppingCart={sizeRequestedInShoppingCart}
                    onChange={HandleProductExistanceInShoppingCart}
                    onIncreament={HandleIncreametQuantity}
                    onDecreament={HandleDecreamentQuantity}
                  />
                );
              })}
              {storedOrderInShoppingCart?.price !== 0 &&
                storedOrderInShoppingCart?.price && (
                  <Button gap="3" colorScheme="orange">
                    الاجمالي <span>{storedOrderInShoppingCart?.price}</span>
                  </Button>
                )}

              {storedOrderInShoppingCart && (
                <>
                  <Textarea
                    bgColor="white"
                    placeholder="ترك ملاحظة"
                    minH="100px"
                    maxH="250px"
                    value={storedOrderInShoppingCart?.providedText}
                    onChange={HandleChageProvidedText}
                  />
                  <Heading
                    p="3"
                    size="sm"
                    bgColor="orange.100"
                    borderRadius="lg"
                  >
                    كل حاجة اتحفظت فسلة الطلبيات بس لازم تتوجه للسلة للتأكيد علي
                    الطلب
                  </Heading>
                </>
              )}
              <Button colorScheme="orange">التوجه الي سلة الطلبيات</Button>
              {storedOrderInShoppingCart && (
                <Button
                  onClick={HandleRemoveProductFromShoppingCart}
                  gap="3"
                  colorScheme="red"
                >
                  حذف من السلة
                  <MdDelete />
                </Button>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Flex mt="4" gap="3">
          <Button
            gap="2"
            alignItems="center"
            colorScheme="orange"
            variant="outline"
            flexGrow="1"
          >
            التعليقات
            <BiSolidComment />
          </Button>
          <Button gap="3" colorScheme="orange" flexGrow="1">
            تفقد الطلبيات
            <CgShoppingCart />
          </Button>
          <IconButton colorScheme="orange" variant="outline" bgColor="white">
            <FcLike />
          </IconButton>
        </Flex>
      </Stack>
    </Flex>
  );
};
