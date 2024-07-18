import {
  Button,
  Heading,
  Input,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../Components/Common/ErrorText/ErrorText";
import { LoginWithEmail } from "../../../@Firebase/Utils/Auth/Login/Login";
import { GoogleRegisteration } from "../../../@Firebase/Utils/Auth/Registeration/RegisterWithProvider/RegisterWithProvider";
import { PhoneProviderModal } from "../../../Components/Common/PhoneProvider/PhoneProvideModal";
import { getFirebaseErrorMessageInArabic } from "../../../@Firebase/lib/ErrorTranslatorToArabic/ErrorTranslatorToArabic";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { CenteredCircularProgress } from "../../../Components/Common/CenteredCircularProgress/CenteredCircularProgress";
export default function Index() {
  const { state } = useLocation();

  const { user, HandleRender } = UseUserData();

  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const onSubmitWithEmail = async (data) => {
    try {
      const email_login = new LoginWithEmail(data);
      const req = await email_login.loginRequist();
      HandleRender();
    } catch (err) {
      const message = getFirebaseErrorMessageInArabic(err.message);
      setError("root", {
        message,
      });
      toast({
        title: message,
        description: "الرجاء الضغط علي نسيت الرقم السري لاسترداد الحساب",
        status: "error",
      });
    }
  };
  const {
    isOpen: isAuthProviderModalOpened,
    onOpen: onOpenAuthProviderModal,
    onClose: onCloseAuthProviderModal,
  } = useDisclosure();
  const onSubmitWithProvider = async (data) => {
    try {
      const google_regsiter = new GoogleRegisteration(data);
      const req = await google_regsiter.SignToProviderRequist();
      HandleRender();
    } catch (err) {
      setError("root", { message: err.message });
      toast({
        title: err.message,
        description: "بيانات خاطئة",
        status: "error",
      });
    }
  };
  if (user.loading) {
    return <CenteredCircularProgress />;
  }
  if (user.data) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PhoneProviderModal
        isOpen={isAuthProviderModalOpened}
        onClose={onCloseAuthProviderModal}
        onSubmit={onSubmitWithProvider}
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        bgColor="orange.600"
        minH="calc(100vh - 90px)"
        p="2"
      >
        <Stack
          p="3"
          alignItems="center"
          w="100%"
          maxW="700px"
          bgColor="white"
          borderRadius="lg"
          gap="4"
        >
          {state?.message && (
            <Heading
              bgColor="orange.50"
              p="5"
              borderRadius="lg"
              size="md"
              w="100%"
              color="orange.800"
            >
              {state.message}
            </Heading>
          )}

          <Heading
            size="md"
            borderBottom="2px"
            borderBottomColor="orange.600"
            color="orange.600"
            p="3"
            textAlign="center"
            lineHeight="9"
          >
            ❣️ سجل معانا عشان يوصلك كل العروض ❣️
          </Heading>
          <Input
            isInvalid={errors.email}
            {...register("email")}
            placeholder="@ البريد الالكتروني"
            _placeholder={{ color: errors.email && "red.600" }}
          />
          <ErrorText errors={errors} path="email" ml="auto" />
          <Input
            isInvalid={errors.password}
            _placeholder={{ color: errors.password && "red.600" }}
            {...register("password")}
            placeholder="* الرقم السري"
          />
          <ErrorText errors={errors} path="password" ml="auto" />
          <Button
            whiteSpace="wrap"
            as={Link}
            variant="link"
            w="100%"
            justifyContent="start"
            to="/register"
          >
            معندكش حساب !! 😳 ولا يهمك دوس هنا لانشاء حساب
          </Button>
          <Button
            whiteSpace="wrap"
            as={Link}
            variant="link"
            w="100%"
            justifyContent="start"
            to="/reset-password"
          >
            نسيت الرقم السري 😥 ؟ ولا يهمك يكبير دوس هنا لتغييره
          </Button>

          <Button
            onClick={handleSubmit(onSubmitWithEmail)}
            colorScheme="orange"
            w="100%"
            isLoading={isSubmitting}
          >
            تسجيل الدخول
          </Button>
          <Button
            isLoading={isSubmitting}
            gap="2"
            alignItems="center"
            w="100%"
            colorScheme="blue"
            variant="outline"
            onClick={onOpenAuthProviderModal}
          >
            تسجيل الدخول بجوجل <FcGoogle />
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
