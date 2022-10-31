import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userSlice";

function FormLogin() {
  const { userStore } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = localStorage.token;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const levelBaseRedirect = (level) => {
    if (level === 1) {
      navigate("/admin");
    } else {
      navigate("/homepage");
    }
  };

  const handleSubmit = (values) => {
    axios
      .post(process.env.REACT_APP_API + "/login", values)
      .then(function (res) {
        if (res.data.status === "ok") {
          message.success(res.data.message);
          // console.log(res);

          dispatch(
            login({
              token: res.data.token,
              user_id: res.data.payload.user.user_id,
              level: res.data.payload.user.level,
              email: res.data.payload.user.email,
              username: res.data.payload.user.username,
              user_img: res.data.payload.user.user_img,
              user_description: res.data.payload.user.user_description,
            })
          );
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("level", res.data.payload.user.level);
          levelBaseRedirect(res.data.payload.user.level);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <section className="Container">
      <div className="form_login">
        <span className="title_login">LOGIN</span>
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* ฟอร์มชื่อผู้ใช้ */}
          <Form.Item
            style={{ textAlign: "left" }}
            label="Email: "
            name="email"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อผู้ใช้!",
              },
              {
                type: "email",
                message: "กรุณากรอกอีเมลล์ให้ถูกต้อง",
              },
            ]}
          >
            <Input className="CustomInput" placeholder="Email" />
          </Form.Item>

          {/* ฟอร์มรหัสผ่าน */}
          <Form.Item
            style={{ textAlign: "left" }}
            label="Password: "
            name="password"
            rules={[
              {
                required: true,
                message: "กรุณากรอกรหัสผ่าน!",
              },
            ]}
          >
            <Input
              className="CustomInput"
              placeholder="Password"
              type="password"
            />
          </Form.Item>

          {/* ปุ่ม Login */}
          <Form.Item>
            <Button className="CustomButton" htmlType="submit">
              LOGIN
            </Button>
          </Form.Item>

          <span>or</span>
          {/* ปุ่ม Register */}
          <Form.Item>
            <Link to="/register">
              {/* <Button className="CustomButton2">Register</Button> */}
              Register
            </Link>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default FormLogin;
