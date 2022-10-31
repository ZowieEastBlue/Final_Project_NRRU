import React from "react";
import { useState, useEffect } from "react";
import ProfileModCard from "../Card/ProfileModCard";
import "./style.css";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";

//function
import { readUsers } from "../../functions/users";
import { readModsUsers } from "../../functions/mods";

function Profile() {
  const { userStore } = (state) => ({ ...state });
  const [userData, setUserData] = useState([]);
  const [userMods, setUserMods] = useState([]);
  console.log("userMod=>", userMods);
  const param = useParams();
  console.log("userData", userData);
  console.log("Dataleagn=>", userData.length);

  useEffect(() => {
    loadData(param.id);
  }, []);

  const loadData = (id) => {
    readUsers(id)
      .then((res) => {
        setUserData(res.data[0]);
      })
      .catch((err) => {
        console.log(err.response);
      });

    readModsUsers(id)
      .then((res) => {
        setUserMods(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const loadModsData = (id) => {
    readModsUsers(id)
      .then((res) => {
        setUserMods(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const countMods = userMods.length;

  return (
    <>
      <div className="container_profile">
        <header className="wrap_header">
          {/* โปรไฟล์ */}
          <div className="wrap_profile">
            <div className="main_image">
              <div className="wrap_image">
                <img
                  className="user_image"
                  src={`http://localhost:5000/${userData.user_img}`}
                  alt=""
                />
              </div>
            </div>
            <div className="title_profile">
              <h5>{userData.username}</h5>
              <h5>{countMods} ผลงาน</h5>
            </div>
          </div>
          {/* ข้อมูลแนะนำตัว */}
          <div className="wrap_about">
            <h5 className="p-3">เกี่ยวกับฉัน</h5>
            <pre className="description">{userData.user_description}</pre>
          </div>
        </header>
        {/* ผลงาน */}
        <div className="title_working">
          <h5>ผลงาน {countMods}</h5>
        </div>
        <div className="site-card-wrapper">
          <Row gutter={[32, 16]}>
            {userMods.map((item) => (
              <Col span={8}>
                <div key={item.id} className="col-md-4">
                  <ProfileModCard mod={item} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Profile;
