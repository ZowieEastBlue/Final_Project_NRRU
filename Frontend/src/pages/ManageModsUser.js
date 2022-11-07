import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Table,
  Space,
  Modal,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";

//function
import { listModsForEdit, removeMods } from "../functions/mods";

const ManageModsUser = () => {
  const { userStore } = useSelector((state) => ({ ...state }));
  const param = useParams();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData(param.id);
  }, []);

  const loadData = async (id) => {
    await listModsForEdit(id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const columns = [
    {
      title: "ชื่อMOD",
      dataIndex: "m_name",
      key: "1",
    },
    {
      title: "รูป1",
      dataIndex: "m_img1",
      key: "2",
      render: (data) => {
        return (
          <div>
            <img
              src={`http://localhost:5000/${data}`}
              width="100"
              height="80"
            />
          </div>
        );
      },
    },
    {
      title: "รูป2",
      dataIndex: "m_img2",
      key: "3",
      render: (data) => {
        return (
          <div>
            <img
              src={`http://localhost:5000/${data}`}
              width="100"
              height="80"
            />
          </div>
        );
      },
    },
    {
      title: "รูป3",
      dataIndex: "m_img3",
      key: "4",
      render: (data) => {
        return (
          <div>
            <img
              src={`http://localhost:5000/${data}`}
              width="100"
              height="80"
            />
          </div>
        );
      },
    },
    {
      title: "จัดการ",
      dataIndex: "action",
      key: "7",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/editmods/${record.m_id}`}>
            <EditOutlined
              style={{ color: "orange" }}
              // onClick={() => showModal(record.user_i)}
            />
          </Link>
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => handleRemove(record.m_id)}
          />
        </Space>
      ),
    },
  ];

  //ลบข้อมูล
  const handleRemove = (record) => {
    Modal.confirm({
      title: "คุณต้องการจะลบMODนี้หรือไม่ ?",
      onOk: () => {
        removeMods(userStore.value.token, record)
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

  return (
    <>
      <Container>
        <Title>จัดการMODs</Title>
        <Table columns={columns} dataSource={data}></Table>
      </Container>
    </>
  );
};

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: bold;
`;

export default ManageModsUser;
