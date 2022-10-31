import React, { useState, useEffect } from "react";
import { Table, Space, Modal, message, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";

//Redux
import { useSelector } from "react-redux";

//functions
import { listUsers, removeUsers } from "../../functions/users";

//Layout
import Main from "../../components/admin/layout/Main";

const ManageUser = () => {
  const { userStore } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id) => {
    setIsModalVisible(true);
    console.log(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // โหลดข้อมูล
  const loadData = () => {
    listUsers()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        //err
        console.log(err.response.data);
      });
  };

  //ลบข้อมูล
  const handleRemove = (record) => {
    Modal.confirm({
      title: "คุณต้องการจะลบผู้ใช้นี้หรือไม่ ?",
      onOk: () => {
        removeUsers(userStore.value.token, record)
          .then((res) => {
            message.success(res.data.message);
            loadData();
          })
          .catch((err) => {
            //err
            console.log(err.response.data);
          });
      },
    });
  };

  // columns ข้อมูลตาราง
  const columns = [
    {
      title: "ID ผู้ใช้",
      dataIndex: "user_id",
      key: "1",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "2",
    },
    {
      title: "ชื่อผู้ใช้",
      dataIndex: "username",
      key: "3",
    },
    {
      title: "รูปภาพ",
      dataIndex: "user_img",
      key: "4",
      render: (data) => {
        return (
          <div>
            <img src={`http://localhost:5000/${data}`} width="50" height="50" />
          </div>
        );
      },
    },
    // {
    //   title: "รายละเอียด",
    //   dataIndex: "user_description",
    //   key: "5",
    // },
    {
      title: "วันที่สมัคร",
      dataIndex: "create_at",
      key: "6",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "จัดการ",
      dataIndex: "action",
      key: "7",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "orange" }}
            onClick={() => showModal(record.user_id)}
          />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => handleRemove(record.user_id)}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Main>
        <h2>จัดการผู้ใช้</h2>
        <Table columns={columns} dataSource={data}></Table>
        <Modal
          title="แก้ไขข้อมูลผู้ใช้"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Main>
    </>
  );
};

export default ManageUser;
