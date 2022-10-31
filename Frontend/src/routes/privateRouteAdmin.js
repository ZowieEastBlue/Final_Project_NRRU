import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUser } from "../functions/auth";

const PrivateRouteAdmin = () => {
  const { userStore } = useSelector((state) => ({ ...state }));
  const user = localStorage.level;
  // useEffect(() => {
  //   if (userStore && userStore.token) {
  //     currentUser(userStore.token)
  //       .then((res) => {})
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, []);
  return user === "1" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteAdmin;
