import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./profiledropdown.css";
import "../Herder/Header.css";
import { CaretDownOutlined } from "@ant-design/icons";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Store
import { logout } from "../../store/userSlice";

const Profiledropdown = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userStore } = useSelector((state) => ({ ...state }));
  // console.log("dp=>", userStore);

  const Logout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/homepage");
  };

  const menuToggle = () => {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  };

  return (
    <>
      <div className="action">
        <Link to="/uploadmods">
          <div className="btn_nav_upload">อัปโหลดผลงานของคุณ</div>
        </Link>
        <div className="profile">
          <span onClick={menuToggle}>
            {children} <CaretDownOutlined />
          </span>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to={`/profile/${userStore.value.user_id}`}>
                โปรไฟล์ของฉัน
              </Link>
            </li>
            <li>
              <Link to={`/editprofile/${userStore.value.user_id}`}>
                แก้ไขโปรไฟล์
              </Link>
            </li>
            <li>
              <Link to={`/manage-user-mods/${userStore.value.user_id}`}>
                แก้ไขMOD
              </Link>
            </li>
            <li onClick={Logout}>ออกจากระบบ</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profiledropdown;
