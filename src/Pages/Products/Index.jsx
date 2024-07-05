import {
  Button,
  Flex,
  Skeleton,
  Stack,
  useDisclosure,
  Image,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useGetProducts } from "../../@Firebase/Hooks/Products/useGetProducts/useGetProducts";
import { ProductBox } from "../../Components/Common/ProductBox/ProductBox";
import { Link, useSearchParams } from "react-router-dom";
import { FilteringSideMenu } from "./Parts/FilteringSideMenu/FilteringSideMenu";
import { getAllParams } from "../../Utils/GetAllParams/GetAllParams";
import NoDataImage from "../../Assets/NoOrders/no-order-image-removebg-preview.png";
import { LazyLoadedImage } from "../../Components/Common/LazyLoadedImage/LazyLoadedImage";
export default function Index() {
  const [searchParams] = useSearchParams();
  const orderByQueries = getAllParams(searchParams).filter((param) => {
    return param.queryType === "orderBy";
  });
  const whereQueries = getAllParams(searchParams).filter((param) => {
    return param.queryType === "where";
  });
  const {
    data,
    HandleGetNextPage,
    HandleGetPreviousPage,
    loading,
    page,
    count,
  } = useGetProducts({
    size: 6,
    whereQueries: whereQueries,
    orderByQueries: orderByQueries,
  });
  let pagesNumber = count?.count ? Math.ceil(count?.count / 6) : 0;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [JSON.stringify(data)]);
  const {
    isOpen: isOpenedFilterinMenu,
    onOpen: onOpenFilteringMenu,
    onClose: onCloseFilteringMenu,
  } = useDisclosure();
  return (
    <>
      <FilteringSideMenu
        onClose={onCloseFilteringMenu}
        isOpen={isOpenedFilterinMenu}
      />
      <Stack p="3">
        <Button onClick={onOpenFilteringMenu} colorScheme="orange" m="0 auto">
          لفترة المنجات لو البحث عن شيء معين دويس هنا
        </Button>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="stretch"
          gap="7"
          p="4"
          as={Skeleton}
          isLoaded={!loading}
          minH="400px"
          w="100%"
          fadeDuration={2}
        >
          {data.map((product) => {
            return <ProductBox {...product} key={product.id} />;
          })}
          {!loading && data.length === 0 && (
            <Stack textAlign="center">
              <LazyLoadedImage src={NoDataImage} w="100%" maxW="300px" />
              <Heading size="sm" bgColor="orange.100" p="2" borderRadius="lg">
                لا يوجد بيانات لتلك عملية البحث
              </Heading>
              <Button colorScheme="orange" as={Link} to="/products">
                اضغط هنا لعرض المنتجات الرئيسية
              </Button>
            </Stack>
          )}
        </Flex>
        <Flex gap="3" justifyContent="center" w="100%">
          <Button
            isDisabled={page + 1 >= pagesNumber}
            onClick={HandleGetNextPage}
            colorScheme="orange"
            isLoading={loading && count?.loading}
          >
            التالي
          </Button>
          <Button
            isDisabled={page === 0}
            onClick={HandleGetPreviousPage}
            colorScheme="orange"
            variant="outline"
            bgColor="white"
            isLoading={loading && count?.loading}
          >
            السابق
          </Button>
        </Flex>
      </Stack>
    </>
  );
}
