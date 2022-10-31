import React from "react";
import { Button, Form, Input, message } from "antd";
import "./style.css";
import axios from "axios";

function index() {
  const handleSubmit = async (values) => {
    console.log(values);
    axios
      .post("http://localhost:5000/api/register", values)
      .then(function (res) {
        if (res.data.status === "ok") {
          message.success({ content: "Register Success" });
          window.location = "./";
          console.log(res);
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
      <div className="form_register">
        <span className="title_register">REGISTER</span>
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* ฟอร์มอีเมลล์ */}
          <Form.Item
            style={{ textAlign: "left" }}
            label="Email: "
            name="email"
            rules={[
              {
                required: true,
                message: "กรุณากรอกอีเมลล์",
              },
              {
                type: "email",
                message: "อีเมลล์ไม่ถูกต้อง",
              },
            ]}
          >
            <Input className="CustomInput" placeholder="Email" />
          </Form.Item>
          {/* ฟอร์มผู้ใช้ */}
          <Form.Item
            style={{ textAlign: "left" }}
            label="Username: "
            name="username"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อผู้ใช้!",
              },
            ]}
          >
            <Input className="CustomInput" placeholder="Username" />
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
          {/* ฟอร์มยืนยันรหัสผ่าน */}
          {/* <Form.Item
                style={{textAlign: 'left'}} 
                label='Re-Password: ' 
                name='re_password' 
                rules={[{
                  required: true,
                  message: 'กรุณากรอกรหัสผ่านอีกครั้ง!'}
                ]}>
                <Input className='CustomInput' placeholder='Re-Password' type='password'/>
              </Form.Item> */}
          {/* ปุ่ม สมัคร */}
          <Form.Item>
            <Button className="CustomButton" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default index;
