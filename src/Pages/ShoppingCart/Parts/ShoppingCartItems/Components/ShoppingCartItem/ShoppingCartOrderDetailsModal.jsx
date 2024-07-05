import {
  Stack,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Box,
} from "@chakra-ui/react";
import { SizeBox } from "./SizeBox";
import { LazyLoadedImage } from "../../../../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import { useNavigate } from "react-router-dom";

export const ShoppingCartOrderDetailsModal = ({
  isOpen,
  onClose,
  sizes,
  sizesRequested,
  onChangeSizesRequisted,
  onIncreamentSizeQuantity,
  onDecreamentSizeQuantity,
  providedText,
  onChangeProvidedText,
  price,
  images,
  productId,
}) => {
  const Navigate = useNavigate();
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent maxH="100%" overflow="auto">
        <ModalHeader>تفاصيل هئا الاوردر</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
          <Stack p="3">
            {sizes.map((size) => {
              const sizeRequestedInShoppingCart = sizesRequested?.find(
                (item) => {
                  return item.id === size.id;
                }
              );
              return (
                <SizeBox
                  key={size.id}
                  size={size}
                  sizeRequestedInShoppingCart={sizeRequestedInShoppingCart}
                  onChange={onChangeSizesRequisted}
                  onIncreament={onIncreamentSizeQuantity}
                  onDecreament={onDecreamentSizeQuantity}
                />
              );
            })}
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
            <Textarea
              bgColor="white"
              placeholder="ترك ملاحظة"
              minH="100px"
              maxH="250px"
              value={providedText}
              onChange={onChangeProvidedText}
            />
          </Stack>
        </ModalBody>
        <ModalFooter gap="2">
          <Button onClick={onClose} colorScheme="orange" variant="outline">
            حفظ
          </Button>
          <Button colorScheme="orange" onClick={onClose}>
            غلق
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
