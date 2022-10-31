import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, Upload, message } from "antd";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";

import { UploadOutlined } from "@ant-design/icons";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { update } from "../store/userSlice";

//function
import { updateUsers, readUsers, uploadImageUsers } from "../functions/users";

const { TextArea } = Input;

//------------------------------------------------------------------------------------------------------------------------------
const EditProfile = () => {
  const { userStore } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const idtoken = localStorage.token;

  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState({});

  // โหลดข้อมูล
  useEffect(() => {
    loadData(userStore.value.user_id);
  }, []);

  const loadData = (id) => {
    readUsers(id)
      .then((res) => {
        setUserData(res.data[0]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //อัพเดทข้อมูลโปรไฟล์
  const handdleProfile = async (values) => {
    console.log(values);
    updateUsers(idtoken, userStore.value.user_id, values)
      .then((res) => {
        message.success(res.data.message);
        console.log(res);
        dispatch(
          update({
            token: idtoken,
            user_id: res.data.user[0].user_id,
            level: res.data.user[0].user_level,
            email: res.data.user[0].email,
            username: res.data.user[0].username,
            user_img: res.data.user[0].user_img,
            user_description: res.data.user[0].user_description,
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
        message.error(err.response);
      });
  };

  const onFill = () => {
    form.setFieldsValue({
      username: userStore.value.username,
      description: userStore.value.user_description,
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  // อัปโหลดรูปโปรไฟล์
  const handleUpload = () => {
    // console.log(fileList[0]);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("user_img", file);
    });
    setUploading(true);
    uploadImageUsers(idtoken, userStore.value.user_id, formData)
      .then((res) => {
        message.success(res.data.message);
        console.log(res);
        dispatch(
          update({
            token: idtoken,
            user_id: res.data.user[0].user_id,
            level: res.data.user[0].user_level,
            email: res.data.user[0].email,
            username: res.data.user[0].username,
            user_img: res.data.user[0].user_img,
            user_description: res.data.user[0].user_description,
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
        message.error(err.response);
      })
      .finally(() => {
        setUploading(false);
      });
    // ------------------------------------------------------------------
    // const formData = new FormData();
    // fileList.forEach((file) => {
    // formData.append('files[]', file);
    // });
    // setUploading(true); // You can use any AJAX library you like
    // fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    // method: 'POST',
    // body: formData,
    // })
    // .then((res) => res.json())
    // .then(() => {
    //     setFileList([]);
    //     message.success('upload successfully.');
    // })
    // .catch(() => {
    //     message.error('upload failed.');
    // })
    // .finally(() => {
    //     setUploading(false);
    // });
  };

  // รับไฟล์
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <Container>
        <FormEdit>
          <Title>แก้ไขโปรไฟล์</Title>
          <Form layout="vertical" onFinish={handdleProfile} form={form}>
            <Form.Item
              style={{ textAlign: "left" }}
              label="ชื่อ: "
              name="username"
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ textAlign: "left" }}
              label="ข้อความแนะนำตัว: "
              name="description"
            >
              <TextArea rows={10} />
            </Form.Item>

            <Form.Item style={{ textAlign: "left" }}>
              <Button htmlType="submit">อัปเดตโปรไฟล์</Button>
              <Button type="link" htmlType="button" onClick={onFill}>
                ดึงข้อมูล
              </Button>
              <Button htmlType="button" onClick={onReset}>
                คืนค่า
              </Button>
            </Form.Item>
          </Form>

          <Form layout="vertical">
            <Form.Item
              style={{ textAlign: "left" }}
              label="รูปโปรไฟล์: "
              name="user_img"
            >
              <Upload
                {...props}
                style={{ textAlign: "left" }}
                maxCount={1}
                listType="picture"
                name="user_img"
              >
                <Button icon={<UploadOutlined />}>เลือกรูป</Button>
              </Upload>
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{
                  marginTop: 16,
                }}
              >
                {uploading ? "กำลังอัปโหลด" : "อัปโหลดรูป"}
              </Button>
            </Form.Item>
          </Form>
          {/* <form action="/profile" method="post" enctype="multipart/form-data">
            <input type="file" name="avatar" />
            <button type="submit">อัปโหลด</button>
          </form> */}
        </FormEdit>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const FormEdit = styled.div`
  width: 600px;
  height: 790px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 20px 70px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 25px;
  color: #383737;
  margin-bottom: 2rem;
`;

export default EditProfile;
