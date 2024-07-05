import React from "react";
import { UseUserData } from "../../Context/UserDataProvider/UserDataProvider";
import { CenteredCircularProgress } from "../../Components/Common/CenteredCircularProgress/CenteredCircularProgress";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({
  children,
  from = "protectedRoute",
  message = "😍 لازم تسجل الدخول عشان تقدر تكمل",
}) => {
  const { user } = UseUserData();
  if (user.loading) {
    return <CenteredCircularProgress />;
  }
  if (!user.data) {
    return (
      <Navigate
        to="/login"
        state={{
          from,
          message,
        }}
      />
    );
  }
  return children;
};
