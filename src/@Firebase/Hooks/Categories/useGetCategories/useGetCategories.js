import React, { useEffect, useReducer } from "react";
import {
  GetDataReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetDataReducer";
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../Config/Config";
export const useGetCategories = () => {
  const [categories, dispach] = useReducer(GetDataReducer, INITIAL_STATE);
  const GetCategories = async () => {
    try {
      const categoriesCollection = collection(db, "Categories");
      const q = query(categoriesCollection, orderBy("createdAt", "desc"));
      dispach({
        type: "FETCH_START",
      });
      const res = await getDocs(q);
      const data = res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      dispach({
        type: "FETCH_SUCCESS",
        payload: data,
      });
      sessionStorage.setItem("categories", JSON.stringify(data));
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    const categories = JSON.parse(sessionStorage.getItem("categories"));
    if (categories && categories.length !== 0) {
      dispach({
        type: "FETCH_SUCCESS",
        payload: categories,
      });
      return;
    }
    GetCategories();
  }, []);
  return categories;
};
