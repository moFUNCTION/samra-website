import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { LazyLoadedImage } from "../../../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import { MdDelete } from "react-icons/md";
import { useShoppingCart } from "../../../../../../Context/ShoppingCartProvider/ShoppingCartProvider";
import { TranslateSize } from "../../../../../../Utils/TranslateSize/TranslateSize";
import { ShoppingCartOrderDetailsModal } from "./ShoppingCartOrderDetailsModal";
import { useNavigate } from "react-router-dom";

export const ShoppingCartItemBox = ({
  title,
  description,
  images,
  providedText,
  sizes,
  sizesRequested,
  price,
  id: productId,
}) => {
  const Navigate = useNavigate();
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
    onUpdateProductInShoppingCart,
    onDeleteItemFromShoppingCart,
    onUpdateProductProvidedText,
  } = useShoppingCart();
  const HandleProductExistanceInShoppingCart = (e, size) => {
    const sizedExistInItemStored = sizesRequested.find(
      (sizeRequested) => sizeRequested.id === size.id
    );
    if (!e.target.checked) {
      if (sizesRequested.length <= 1 && sizedExistInItemStored) {
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
  const {
    isOpen: isOrderDetailsModalOpened,
    onClose: onCloseOrderDetalsModal,
    onOpen: onOpenOrderDataModal,
  } = useDisclosure();
  return (
    <>
      <ShoppingCartOrderDetailsModal
        isOpen={isOrderDetailsModalOpened}
        onClose={onCloseOrderDetalsModal}
        sizes={sizes}
        sizesRequested={sizesRequested}
        onChangeSizesRequisted={HandleProductExistanceInShoppingCart}
        onChangeProvidedText={HandleChageProvidedText}
        onDecreamentSizeQuantity={HandleDecreamentQuantity}
        onIncreamentSizeQuantity={HandleIncreametQuantity}
        providedText={providedText}
        price={price}
        productId={productId}
        images={images}
      />
      <Card h="auto" w="sm">
        <CardBody p="0" pos="relative">
          <Box
            w="100%"
            h="280px"
            overflow="hidden"
            _hover={{
              img: {
                transform: "scale(1.1)",
                filter: "saturate(1.1)",
              },
              _before: {
                opacity: 1,
              },
            }}
            cursor="pointer"
            pos="relative"
            borderTopRadius="lg"
            onClick={() => {
              Navigate(`/products/${productId}`);
            }}
            _before={{
              content: `"اضغط هنا للتوجه لذلك المنتج"`,
              pos: "absolute",
              inset: "0",
              w: "100%",
              h: "100%",
              bgColor: "rgb(0 , 0 , 0 , 0.1)",
              backdropFilter: "blur(7px)",
              zIndex: "1",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              color: "gray.50",
              fontSize: "2xl",
              opacity: 0,
              transition: "0.3s",
            }}
          >
            <LazyLoadedImage
              src={images[0]?.URL}
              alt="Green double couch with wooden legs"
              w="100%"
              h="100%"
              ImageProps={{
                objectFit: "cover",
                transition: "0.3s",
                bgColor: "orange.700",
              }}
            />
          </Box>

          <Stack
            alignItems="center"
            textAlign="center"
            p="2"
            mt="2"
            spacing="3"
          >
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>

            <Button w="100%" gap="3" colorScheme="orange">
              الاجمالي <span>{price}</span>
            </Button>
            <Heading
              w="100%"
              bgColor="orange.50"
              p="2"
              borderRadius="lg"
              size="xs"
            >
              عدد الاطباق التي تم طلبها من هذا الطبق
              <span style={{ marginInline: "10px" }}>
                {sizesRequested?.length}
              </span>
            </Heading>
            <Button
              onClick={onOpenOrderDataModal}
              variant="outline"
              gap="2"
              colorScheme="orange"
              w="100%"
            >
              رؤية الاوردر بالكامل
            </Button>
          </Stack>
        </CardBody>
        <Divider color="gray.200" />

        <CardFooter>
          <ButtonGroup w="100%" spacing="2">
            <Button flexGrow="1" variant="solid" colorScheme="orange">
              التوجه للمنتج
            </Button>
            <Button
              colorScheme="red"
              onClick={HandleRemoveProductFromShoppingCart}
              gap="2"
            >
              ازالة هذا الاوردر <MdDelete />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};
