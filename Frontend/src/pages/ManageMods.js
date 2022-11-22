import React, { useState, useEffect } from "react";
import { Table, Space, Modal, message, Divider, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";

//function
import { listMods, removeMods } from "../functions/mods";

//Layout
import Main from "../components/admin/layout/Main";

const ManageMods = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("data", data);

  useEffect(() => {
    loadData();
  }, []);

  // โหลดข้อมูล
  const loadData = () => {
    listMods()
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
        removeMods(record)
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

  const columns = [
    {
      title: "ชื้อผู้ใช้",
      dataIndex: ["user", "username"],
      key: "1",
    },
    {
      title: "ชื่อMOD",
      dataIndex: "m_name",
      key: "2",
    },
    {
      title: "รูป1",
      dataIndex: "m_img1",
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
    {
      title: "รูป2",
      dataIndex: "m_img2",
      key: "4",
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
    {
      title: "รูป3",
      dataIndex: "m_img3",
      key: "5",
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
    {
      title: "วันที่อัปโหลด",
      dataIndex: "create_at",
      key: "6",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "จำนวนการดาวน์โหลด",
      dataIndex: "m_download",
      key: "10",
    },
    {
      title: "จัดการ",
      dataIndex: "action",
      key: "7",
      render: (_, record) => (
        <Space size="middle">
          <Link to={"/onemod/" + record.m_id}>
            <EyeOutlined style={{ color: "orange" }} />
          </Link>
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => handleRemove(record.m_id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Main>
        <h2>จัดการMOD</h2>
        <Table columns={columns} dataSource={data}></Table>
      </Main>
    </>
  );
};

export default ManageMods;
