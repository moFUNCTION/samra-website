import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { db } from "../../../Config/Config";
import {
  GetDataPaginatedReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetDataPaginatedReducer";
export const useGetCollectionWithCursorPagination = ({
  size,
  orderByQueries = [],
  whereQueries = [],
  isDependantLoading,
  collectionName,
}) => {
  const [products, dispach] = useReducer(
    GetDataPaginatedReducer,
    INITIAL_STATE
  );
  const ProductsCollection = collection(db, collectionName);
  const memoOrderedByQueriesArray = useMemo(() => {
    return orderByQueries;
  }, [JSON.stringify(orderByQueries)]);
  const memoWhereQueries = useMemo(() => {
    return whereQueries;
  }, [JSON.stringify(whereQueries)]);
  let initialQuery = query(ProductsCollection, limit(size));

  const [queryRef, setQueryRef] = useState(initialQuery);
  useEffect(() => {
    if (orderByQueries.length > 0) {
      setQueryRef((prev) => {
        return query(
          prev,
          ...orderByQueries.map((query) => {
            if (query.field) {
              return orderBy(query.field, query.direction);
            }
          })
        );
      });
      dispach({
        type: "PAGE_RESET",
      });
    }
    return () => {
      setQueryRef(query(ProductsCollection, limit(size)));
    };
  }, [memoOrderedByQueriesArray]);
  useEffect(() => {
    if (whereQueries.length > 0) {
      setQueryRef((prev) => {
        return query(
          prev,
          ...whereQueries.map((query) => {
            if (query.value && query.operator && query.field) {
              return where(query.field, query.operator, query.value);
            }
          })
        );
      });
      dispach({
        type: "PAGE_RESET",
      });
    }
    return () => {
      setQueryRef(query(ProductsCollection, limit(size)));
    };
  }, [memoWhereQueries]);
  const HandleGetProducts = useCallback(async () => {
    if (
      !isDependantLoading &&
      !whereQueries.find((query) => {
        return !query.value;
      })
    ) {
      try {
        dispach({
          type: "FETCH_START",
        });
        const res = await getDocs(queryRef);
        dispach({
          type: "FETCH_SUCCESS",
          payload: res.docs,
        });
      } catch (err) {
        dispach({
          type: "FETCH_ERROR",
          payload: err.code.message || err.message,
        });
      }
    }
  }, [queryRef]);
  useEffect(() => {
    HandleGetProducts();
  }, [queryRef]);
  const HandleGetNextPage = () => {
    setQueryRef((prev) => {
      return query(prev, startAfter(products.data[products.data.length - 1]));
    });
    dispach({
      type: "NEXT_PAGE",
    });
  };
  const HandleGetPreviousPage = () => {
    setQueryRef((prev) => {
      return query(prev, endBefore(products.data[0]), limitToLast(size));
    });
    dispach({
      type: "PREVIOUS_PAGE",
    });
  };
  return {
    data: products.data.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }),
    error: products.error,
    loading: products.loading,
    HandleGetNextPage,
    HandleGetPreviousPage,
    page: products.page,
  };
};
