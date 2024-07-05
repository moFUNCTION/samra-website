import { useEffect, useReducer } from "react";
import { GetUserDataReducer, INITIAL_STATE } from "./Reducer/GetUserReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Config/Config";
import { getDoc, doc } from "firebase/firestore";
export const useAuth = () => {
  const [user, dispach] = useReducer(GetUserDataReducer, INITIAL_STATE);
  const GetUserAditionalData = async (user) => {
    try {
      const User_Doc = doc(db, "Users", user.uid);
      const UserData_res = await getDoc(User_Doc);

      if (!UserData_res.exists()) {
        dispach({
          type: "FETCH_SUCCESS",
          payload: undefined,
        });
        return;
      }
      const data = Object.assign(user, UserData_res.data());
      dispach({
        type: "FETCH_SUCCESS",
        paylaod: data,
      });
      sessionStorage.setItem("user-credintals", JSON.stringify(data));
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
      });
    }
  };
  const GetUserData = (user) => {
    dispach({
      type: "FETCH_START",
    });
    if (user) {
      GetUserAditionalData(user);
    } else {
      dispach({
        type: "FETCH_SUCCESS",
        paylaod: undefined,
      });
    }
  };
  const HandleError = () => {
    dispach({
      type: "FETCH_ERROR",
    });
  };
  const HandleRender = () => {
    dispach({
      type: "FETCH_RENDER",
    });
  };
  useEffect(() => {
    const user = sessionStorage.getItem("user-credintals");
    if (!user) {
      const unSubscribe = onAuthStateChanged(auth, GetUserData, HandleError);
      return () => {
        unSubscribe();
      };
    } else {
      dispach({
        type: "FETCH_SUCCESS",
        paylaod: JSON.parse(user),
      });
    }
  }, [user.render]);
  return { user, HandleRender };
};
