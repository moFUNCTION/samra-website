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
export const useGetEvents = () => {
  const [events, dispach] = useReducer(GetDataReducer, INITIAL_STATE);
  const GetEvents = async () => {
    try {
      const eventsCollection = collection(db, "Events");
      const q = query(eventsCollection, orderBy("createdAt", "desc"));

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
      sessionStorage.setItem("events", JSON.stringify(data));
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    const events = JSON.parse(sessionStorage.getItem("events"));

    if (events && events.length !== 0) {
      dispach({
        type: "FETCH_SUCCESS",
        payload: events,
      });
      return;
    }
    GetEvents();
  }, []);
  return events;
};
