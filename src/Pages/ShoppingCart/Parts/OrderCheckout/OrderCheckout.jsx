import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Textarea,
  Text,
  useToast,
  Checkbox,
  FormControl,
  FormLabel,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
import { useShoppingCart } from "../../../../Context/ShoppingCartProvider/ShoppingCartProvider";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../../Components/Common/ErrorText/ErrorText";
import { getUserLocation } from "../../../../Utils/GetLocation/GetLocation";
import styles from "./styles.module.css";
import { LocationModal } from "../../../../Components/Common/LocationModal/LocationModal";
import { Order } from "../../../../@Firebase/Utils/Order/Order";
import { useNavigate } from "react-router-dom";
export const OrderCheckout = () => {
  const Navigate = useNavigate();
  const toast = useToast({
    duration: 3000,
    isClosable: true,
    position: "top-right",
  });
  const { user } = UseUserData();
  const { totalPrice, shoppingCart, onDeleteAllShoppingCartItems } =
    useShoppingCart();
  const [locationGeo, setLocationGeo] = useState();
  const {
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      locationType: "currentLocation",
      phoneType: "customPhoneNumber",
    },
  });

  const locationType = useWatch({ control, name: "locationType" });
  const HandleChangeLocationType = (value) => {
    setValue("locationType", value);
  };
  const phoneType = useWatch({ control, name: "phoneType" });
  const HandleChangePhoneType = (value) => {
    setValue("phoneType", value);
  };
  const discountCode = useWatch({ control, name: "discountCode" });
  const isDiscountExist = useWatch({ control, name: "isDiscountExist" });

  const onSubmit = async (data) => {
    try {
      let orderData = {
        ...data,
        order: shoppingCart.map((item) => {
          const { id, price, providedText, sizesRequested } = item;
          return {
            id,
            price,
            providedText,
            sizesRequested,
          };
        }),
        totalPrice,
        [locationType === "currentLocation" && locationGeo && "location"]:
          locationGeo,
        phoneNumber:
          data.phoneType === "accountPhoneNumber"
            ? user.data.phoneNumber
            : data.phoneNumber,
      };
      const order_init = new Order(orderData);
      const req = await order_init.Add({ userID: user.data.uid });
      onDeleteAllShoppingCartItems();
      Navigate("/orders");
    } catch (err) {
      toast({
        title: "خطأ",
        description: err.message,
      });
    }
  };
  useEffect(() => {
    (async function getLocation() {
      if (locationType === "currentLocation") {
        try {
          const { latitude, longitude } = await getUserLocation();
          setLocationGeo({
            latitude,
            longitude,
          });
        } catch (err) {
          toast({
            title: err,
            status: "error",
          });
          HandleChangeLocationType("customLocation");
        }
      }
    })();
  }, [locationType]);
  const {
    isOpen: isOpenedLocationModal,
    onOpen: onOpenLocationModal,
    onClose: onCloseLocationModal,
  } = useDisclosure();
  console.log(shoppingCart);
  return (
    <>
      <LocationModal
        isOpen={isOpenedLocationModal}
        onClose={onCloseLocationModal}
        {...locationGeo}
      />
      <Stack
        border="2px"
        borderColor="orange.600"
        h="100%"
        p="3"
        gap="3"
        borderRadius="lg"
        overflow="auto"
        sx={{
          "> *": {
            flexShrink: 0,
          },
        }}
        className={styles.container}
      >
        <Heading
          size="md"
          borderBottom="2px"
          borderBottomColor="orange.600"
          color="orange.600"
          p="3"
        >
          اتمام الطلب
        </Heading>

        <Flex flexWrap="wrap" gap="2">
          <Button
            flexGrow="1"
            colorScheme="orange"
            variant={locationType === "currentLocation" ? "solid" : "outline"}
            onClick={() => HandleChangeLocationType("currentLocation")}
          >
            استخدام الموقع الحالي
          </Button>
          <Button
            flexGrow="1"
            colorScheme="orange"
            variant={locationType === "customLocation" ? "solid" : "outline"}
            onClick={() => HandleChangeLocationType("customLocation")}
          >
            اضافة الموقع للتوصيل
          </Button>
        </Flex>
        {locationType === "customLocation" ? (
          <>
            <Textarea
              {...register("location")}
              bgColor="white"
              placeholder="العنوان"
              isInvalid={errors.location}
            />
            <ErrorText errors={errors} path="location" />
          </>
        ) : (
          <>
            <Heading size="sm" bgColor="orange.100" p="4" borderRadius="lg">
              سيتم اخد الموقع الحالي الرجاء عدم استخدام اي نوع من ال vpn لضمان
              وصولنا للموقع
            </Heading>
            {locationGeo && (
              <iframe
                height="200"
                style={{ border: 0, width: "100%" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${locationGeo.latitude},${locationGeo.longitude}&hl=es;z=14&output=embed`}
              ></iframe>
            )}
            <Button onClick={onOpenLocationModal} colorScheme="blue">
              فتح الموقع الخاص بيك بالكامل بالكامل
            </Button>
          </>
        )}

        <Flex gap="2" flexWrap="wrap">
          <Button
            flexGrow="1"
            colorScheme="orange"
            variant={phoneType === "accountPhoneNumber" ? "solid" : "outline"}
            onClick={() => HandleChangePhoneType("accountPhoneNumber")}
            isDisabled={!user.data}
          >
            استخدام الرقم المسجل في الحساب للتواصل
          </Button>
          <Button
            flexGrow="1"
            colorScheme="orange"
            variant={phoneType === "customPhoneNumber" ? "solid" : "outline"}
            onClick={() => HandleChangePhoneType("customPhoneNumber")}
          >
            اضافة اخر
          </Button>
        </Flex>
        {phoneType === "customPhoneNumber" ? (
          <>
            <Text mr="1">رقم التواصل</Text>
            <Input
              placeholder="رقم التواصل"
              bgColor="white"
              isDisabled={phoneType !== "customPhoneNumber"}
              {...register("phoneNumber", {
                valueAsNumber: true,
              })}
              defaultValue={0}
              isInvalid={errors.phoneNumber}
            />
            <ErrorText errors={errors} path="phoneNumber" />
          </>
        ) : (
          <Heading size="sm" bgColor="orange.100" p="4" borderRadius="lg">
            الرقم المضاف لذلك الحساب هو {user.data?.phoneNumber}
          </Heading>
        )}
        <Checkbox {...register("isDiscountExist")} size="lg">
          استخدام كوبون خصم
        </Checkbox>
        {isDiscountExist && (
          <>
            <Input
              placeholder="كود خصم"
              bgColor="white"
              {...register("discountCode")}
            />
            {discountCode && <Button colorScheme="orange">التحقق</Button>}
          </>
        )}

        <Textarea
          bgColor="white"
          placeholder="ترك ملاحظة"
          {...register("providedText")}
          maxH="200px"
        />
        <Button gap="3" colorScheme="green">
          الاجمالي
          <span>{totalPrice}</span>
        </Button>
        <Button
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          colorScheme="orange"
          isDisabled={shoppingCart.length === 0}
        >
          اتمام الطلبية
        </Button>
      </Stack>
    </>
  );
};
