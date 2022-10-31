import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouteUser = () => {
  const { userStore } = useSelector((state) => ({ ...state }));
  const user = localStorage.level;
  // console.log("privateUser=>", userStore.value.level);
  return user === "0" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteUser;
