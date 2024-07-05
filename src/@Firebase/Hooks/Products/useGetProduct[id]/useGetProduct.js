import React, { useEffect, useReducer } from "react";
import {
  GetItemReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetItemReducer";
import { GetProduct } from "../../../Utils/Products/GetProduct";
export const useGetProduct = ({ id }) => {
  const [product, dispach] = useReducer(GetItemReducer, INITIAL_STATE);

  useEffect(() => {
    const getProductData = async () => {
      try {
        dispach({
          type: "FETCH_START",
        });
        const product_res = await GetProduct({ productId: id });
        dispach({
          type: "FETCH_SUCCESS",
          payload: product_res,
        });
      } catch (err) {
        dispach({
          type: "FETCH_ERROR",
          payload: err.code.message || err.message,
        });
      }
    };
    getProductData();
  }, [id]);
  return product;
};
