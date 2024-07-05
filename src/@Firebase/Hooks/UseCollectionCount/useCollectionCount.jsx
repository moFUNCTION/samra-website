import {
  collection,
  getCountFromServer,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { db } from "../../Config/Config";
import {
  GetCollectionCountReducer,
  INITIAL_STATE,
} from "./Reducer/GetCollectionCountReducer";
export const useCollectionCount = ({
  collectionName,
  whereQueries,
  orderByQueries,
}) => {
  const [collectionData, dispach] = useReducer(
    GetCollectionCountReducer,
    INITIAL_STATE
  );
  const memoOrderedByQueriesArray = useMemo(
    () => orderByQueries,
    [JSON.stringify(orderByQueries)]
  );
  const memoWhereQueries = useMemo(
    () => whereQueries,
    [JSON.stringify(whereQueries)]
  );
  const collectionRef = collection(db, collectionName);
  const createQuery = () => {
    let q = query(collectionRef);

    memoOrderedByQueriesArray.forEach(({ field, direction }) => {
      q = query(q, orderBy(field, direction));
    });

    memoWhereQueries.forEach(({ field, operator, value }) => {
      if (value) {
        q = query(q, where(field, operator, value));
      }
    });

    return q;
  };

  const [queryRef, setQueryRef] = useState(createQuery());
  useEffect(() => {
    if (
      orderByQueries !== memoOrderedByQueriesArray ||
      whereQueries !== memoWhereQueries
    ) {
      setQueryRef(createQuery());
    }
    dispach({ type: "PAGE_RESET" });
  }, [memoOrderedByQueriesArray, memoWhereQueries]);

  const GetCollectionData = async () => {
    try {
      dispach({
        type: "FETCH_START",
      });
      const CollectionCount = await getCountFromServer(queryRef);
      dispach({
        type: "FETCH_SUCCESS",
        payload: CollectionCount?.data()?.count,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
      });
    }
  };
  useEffect(() => {
    GetCollectionData();
  }, [queryRef]);
  return collectionData;
};
