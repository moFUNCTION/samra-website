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
  Flex,
  Checkbox,
  Select,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetCategories } from "../../../../@Firebase/Hooks/Categories/useGetCategories/useGetCategories";
import { ProductSearchField } from "../../../../Components/Common/ProductSearchField/ProductSearchField";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllParams } from "../../../../Utils/GetAllParams/GetAllParams";
export const FilteringSideMenu = ({ isOpen, onClose }) => {
  const [searchParams] = useSearchParams();
  const Navigate = useNavigate();
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategories();
  // ***Handle Cagegories Change

  const [categoriesRequested, setCategoriesRequested] = useState(() => {
    return searchParams.get("where_categoryId")?.startsWith("[")
      ? JSON.parse(searchParams.get("where_categoryId").split("_")[0])
      : [];
  });
  const HandleAddCategory = (id) => {
    setCategoriesRequested((prev) => {
      return [...prev, id];
    });
  };
  const HandleDeleteCategory = (id) => {
    setCategoriesRequested(
      categoriesRequested.filter((itemId) => {
        return itemId !== id;
      })
    );
  };
  // ****Handle OrderBy Change
  const [orderBy, setOrderBy] = useState(() => {
    const specifiedQuery = getAllParams(searchParams).find((query) => {
      return query.queryType === "orderBy";
    });
    return (
      specifiedQuery &&
      `${specifiedQuery.queryType}_${specifiedQuery.field}=${specifiedQuery.direction}`
    );
  });
  const handleChangeOrderBy = (e) => {
    setOrderBy(e.target.value);
  };
  const onSubmit = () => {
    if (orderBy && categoriesRequested.length >= 1) {
      Navigate(
        `?where_categoryId=${JSON.stringify(
          categoriesRequested
        )}_operator="in"&${orderBy}`
      );
    } else if (orderBy) {
      Navigate(`?${orderBy}`);
    } else if (categoriesRequested.length >= 1) {
      Navigate(
        `?where_categoryId=${JSON.stringify(categoriesRequested)}_operator="in"`
      );
    }

    onClose(); // Optionally close the drawer after submitting
  };
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader color="orange.700">فلترة المنتجات</DrawerHeader>

        <DrawerBody gap="3" as={Stack} p="3">
          <ProductSearchField
            colorScheme="orange"
            BtnStyles={{
              justifyContent: "start",
              pr: "5",
            }}
            variant="Bar"
          />

          <Heading
            size="md"
            as="h4"
            p="2"
            borderBottom="2px"
            borderColor="orange.600"
            color="orange.600"
          >
            الاصناف
          </Heading>
          <Flex
            as={Skeleton}
            minH="100px"
            isLoaded={!categoriesLoading}
            fadeDuration={1}
            mt="3"
            flexWrap="wrap"
            gap="3"
          >
            {categories?.map((category) => {
              if (categoriesRequested.includes(category.id)) {
                return (
                  <Button
                    onClick={() => HandleDeleteCategory(category.id)}
                    key={category.id}
                    colorScheme="orange"
                    flexGrow="1"
                  >
                    {category.title}
                  </Button>
                );
              }
              return (
                <Button
                  key={category.id}
                  colorScheme="orange"
                  variant="outline"
                  bgColor="orange.50"
                  _hover={{
                    bgColor: "white",
                  }}
                  flexGrow="1"
                  onClick={() => HandleAddCategory(category.id)}
                >
                  {category.title}
                </Button>
              );
            })}
          </Flex>
          <Select
            onChange={handleChangeOrderBy}
            value={orderBy}
            cursor="pointer"
            placeholder="الترتيب علي حسب"
          >
            <option value="orderBy_createdAt=desc">الاحدث</option>
            <option value="orderBy_createdAt=asc">الاقدم</option>
            <option value="orderBy_biggestPrice=desc">الاعلي سعرا</option>
            <option value="orderBy_smallestPrice=asc">الاقل سعرا</option>
            <option value="orderBy_purchasedCount=asc">الاعلي تقييما</option>
          </Select>
        </DrawerBody>

        <DrawerFooter gap="3">
          <Button variant="outline" onClick={onClose}>
            اغلاق
          </Button>
          <Button colorScheme="orange" onClick={onSubmit}>
            تأكيد
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
