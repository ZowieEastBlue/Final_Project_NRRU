import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Herder/Header";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { UploadMods } from "./pages/UploadMods";
import { Profiles } from "./pages/Profiles";
import AdminHome from "./pages/admin/AdminHome";
import Tables from "./pages/admin/Tables";
import Billing from "./pages/admin/Billing";
import AdminProfile from "./pages/admin/AdminProfile";
import Downloadmods from "./pages/Downloadmod";
import EditProfile from "./pages/EditProfile";
import News from "./pages/News";
import OneMod from "./pages/OneMod";
import OneNews from "./pages/OneNews";
import EditMods from "./pages/EditMods";
import ManageModsUser from "./pages/ManageModsUser";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// หน้า Admin
import ManageUser from "./pages/admin/ManageUser";
import PostNews from "./pages/admin/PostNews";
import ManageNews from "./pages/admin/ManageNews";
import EditNews from "./pages/admin/EditNews";
import Main from "./components/admin/layout/Main";
import Dashboard from "./pages/admin/Dashboard";
import ManageMods from "./pages/ManageMods";

//privateRoute
import PrivateRouteAdmin from "./routes/privateRouteAdmin";
import PrivateRouteUser from "./routes/privateRouteUser";

// functions
import { currentUser } from "./functions/auth";

// Redux
import { useDispatch } from "react-redux";

// Store
import { login } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  //เช็คการ Login
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        dispatch(
          login({
            token: idtoken,
            user_id: res.data.user_id,
            level: res.data.user_level,
            email: res.data.email,
            username: res.data.username,
            user_img: res.data.user_img,
            user_description: res.data.user_description,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Header>
                <HomePage />
              </Header>
            }
          />
          <Route
            path="/register"
            element={
              <Header>
                <Register />
              </Header>
            }
          />
          <Route
            path="/homepage"
            element={
              <Header>
                <HomePage />
              </Header>
            }
          />
          <Route
            path="/login"
            element={
              <Header>
                <Login />
              </Header>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Header>
                <Profiles />
              </Header>
            }
          />
          <Route
            path="/download"
            element={
              <Header>
                <Downloadmods />
              </Header>
            }
          />
          <Route
            path="/download/:id"
            element={
              <Header>
                <Downloadmods />
              </Header>
            }
          />
          <Route
            path="/onemod/:id"
            element={
              <Header>
                <OneMod />
              </Header>
            }
          />
          <Route
            path="/news"
            element={
              <Header>
                <News />
              </Header>
            }
          />
          <Route
            path="/news/:id"
            element={
              <Header>
                <OneNews />
              </Header>
            }
          />

          {/* PrivateRoute For User */}
          <Route element={<PrivateRouteUser />}>
            {/* Upload */}
            <Route
              element={
                <Header>
                  <UploadMods />
                </Header>
              }
              path="/uploadmods"
              exact
            />
            {/* EditProfile */}
            <Route
              element={
                <Header>
                  <EditProfile />
                </Header>
              }
              path="/editprofile/:id"
              exact
            />
            {/* ManageMods For User */}
            <Route
              element={
                <Header>
                  <ManageModsUser />
                </Header>
              }
              path="/manage-user-mods/:id"
              exact
            />
            <Route
              element={
                <Header>
                  <EditMods />
                </Header>
              }
              path="/editmods/:id"
              exact
            />
          </Route>

          {/* PrivateRoute For Admin */}
          <Route element={<PrivateRouteAdmin />}>
            <Route element={<Main />} path="/admin" exact />
            <Route element={<AdminHome />} path="/admin/Testdashboard" exact />
            <Route element={<Dashboard />} path="/admin/dashboard" exact />
            <Route element={<Tables />} path="/admin/tables" exact />
            <Route element={<Billing />} path="/admin/billing" exact />
            <Route element={<AdminProfile />} path="/admin/profile" exact />
            <Route element={<ManageUser />} path="/admin/manage-user" exact />
            <Route element={<PostNews />} path="/admin/addnews" exact />
            <Route element={<ManageNews />} path="/admin/manage-news" exact />
            <Route element={<ManageMods />} path="/admin/manage-mods" exact />
            <Route
              element={<EditNews />}
              path="/admin/manage-news/edit-news/:id"
              exact
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
