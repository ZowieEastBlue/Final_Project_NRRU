import React, { useState, useEffect } from "react";
import { Table, Space, Modal, message, Divider, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";

//functions
// import { listUsers, removeUsers } from "../../functions/users";
import { listNews, removeNews } from "../../functions/news";

//Layout
import Main from "../../components/admin/layout/Main";

const ManageNews = () => {
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
    listNews()
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
      title: "คุณต้องการจะลบข่าวนี้หรือไม่ ?",
      onOk: () => {
        removeNews(record)
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
    // {
    //   title: "ID ข่าว",
    //   dataIndex: "n_id",
    //   key: "1",
    // },
    {
      title: "หัวข้อข่าว",
      dataIndex: "n_title",
      key: "2",
    },
    {
      title: "รูปปกข่าว",
      dataIndex: "n_cover",
      key: "3",
      render: (data) => {
        return (
          <div>
            <img
              src={`http://localhost:5000/${data}`}
              width="200"
              height="150"
            />
          </div>
        );
      },
    },
    // {
    //   title: "รายละเอียด",
    //   dataIndex: "n_detail",
    //   key: "4",
    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   render: (n_detail) => (
    //     <Tooltip placement="topLeft" title={n_detail}>
    //       {n_detail}
    //     </Tooltip>
    //   ),
    // },
    // {
    //   title: "รายละเอียด",
    //   dataIndex: "user_description",
    //   key: "5",
    // },
    {
      title: "วันที่โพส",
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
          <Link to={"/admin/manage-news/edit-news/" + record.n_id}>
            <EditOutlined
              style={{ color: "orange" }}
              // onClick={() => {
              //   <Link to={"/admin/"} />;
              // }}
            />
          </Link>
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => handleRemove(record.n_id)}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Main>
        <h2>จัดการข่าว</h2>
        <Table columns={columns} dataSource={data}></Table>
        <Modal
          title="แก้ไขข้อมูลข่าว"
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

export default ManageNews;
