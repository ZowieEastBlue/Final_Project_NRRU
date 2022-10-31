import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Profiledropdown from "../ProfileDropdown/Profiledropdown";
import { Input, Space } from "antd";

// Redux
import { useSelector, useDispatch } from "react-redux";

//Store
import { searchQue } from "../../store/searchSlice";

const { Search } = Input;

function Topnav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userStore } = useSelector((state) => ({ ...state }));
  const { searchStore } = useSelector((state) => ({ ...state }));
  const user = localStorage.token;
  const { text } = searchStore.value;
  // console.log(text)

  const SearchChange = (e) => {
    // console.log(e.target.value)
    dispatch(
      searchQue({
        text: e.target.value,
      })
    );
  };

  const SearchSubmit = (value) => {
    // e.preventDefault()
    // console.log(value)
    dispatch(
      searchQue({
        text: value,
      })
    );

    navigate("/download?" + value);
  };

  return (
    <>
      <div className="wrap_all_nav">
        <nav className="header">
          {/* logo */}
          <Link to="/">
            <img
              className="header__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Service_mark.svg/540px-Service_mark.svg.png"
              alt=""
            />
          </Link>

          {/* Search box */}
          <div className="header__search">
            <Search
              placeholder="ค้นหาสิ่งที่ต้องการ"
              onSearch={SearchSubmit}
              enterButton="ค้นหา"
              size="middle"
            />
            {/* <input type="text" className="header__searchInput" onChange={SearchChange} />
            <SearchOutlined className="header__searchIcon" /> */}
          </div>

          {/* button Nav */}
          {!user && (
            <>
              <div className="btn_nav">
                <Link to="/uploadmods">
                  <div className="btn_nav_upload">อัปโหลดผลงานของคุณ</div>
                </Link>
                <Link to="/Login">
                  <div className="btn_nav_login">เข้าสู่ระบบ</div>
                </Link>
                <Link to="/Register">
                  <div className="btn_nav_register">สมัครสมาชิก</div>
                </Link>
              </div>
            </>
          )}

          {user && (
            <>
              <div className="btn_nav">
                <Profiledropdown>{userStore.value.username}</Profiledropdown>
              </div>
            </>
          )}
        </nav>
        <div className="navlink">
          <ul className="nav_wrapper">
            <li>
              <Link to="/">หน้าแรก</Link>
            </li>
            <li>
              <Link to="/news">ข่าวอัปเดต</Link>
            </li>
            <li>
              <Link to="/download">ดาวน์โหลด</Link>
            </li>
            {/* <li>
            <Link to='/'>ช่วยเหลือ</Link>
          </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Topnav;
