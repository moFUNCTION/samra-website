import React from "react";
import { SearchField, Title } from "../SearchField/SearchField";
import { useNavigate } from "react-router-dom";

export const ProductSearchField = ({ ...rest }) => {
  const Navigate = useNavigate();
  return (
    <SearchField
      onSubmit={(value) => {
        Navigate(`/products?where_searchQuery=${value}`);
      }}
      {...rest}
    >
      <Title>ابحث عن وجبتك المفضلة</Title>
    </SearchField>
  );
};
