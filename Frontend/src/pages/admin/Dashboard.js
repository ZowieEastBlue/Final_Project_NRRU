import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Table, Radio } from "antd";
import moment from "moment";

// Chart
import ReportChart from "../../components/chart/ReportChart";

//Icon
import {
  DatabaseOutlined,
  UserOutlined,
  ReadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

//Layout
import Main from "../../components/admin/layout/Main";

//function
import {
  listMods,
  getSumDownload,
  getAllModsOrderID,
  getAllModsOrderDate,
  getAllModsOrderDownload,
} from "../../functions/mods";
import { listUsers } from "../../functions/users";
import { listNews } from "../../functions/news";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { Title, Text } = Typography;

  const [allMods, setAllMods] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [countDownload, setCountDowload] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  //รวมการโหลดข้อมูล
  const loadData = async () => {
    getAllModsOrderID()
      .then((res) => {
        setAllMods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    listUsers()
      .then((res) => {
        setAllUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    listNews()
      .then((res) => {
        setAllNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getSumDownload()
      .then((res) => {
        setCountDowload(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(true);
  };

  //Card Top
  const count = [
    {
      today: "จำนวนMODทั้งหมด",
      title: `${allMods.length}`,
      icon: <DatabaseOutlined />,
    },
    {
      today: "จำนวนสมาชิกทั้งหมด",
      title: `${allUser.length}`,
      icon: <UserOutlined />,
    },
    {
      today: "ข่าวสารทั้งหมด",
      title: `${allNews.length}`,
      icon: <ReadOutlined />,
    },
    {
      today: "จำนวนการดาวน์โหลดMODทั้งหมด",
      title: `${countDownload}`,
      icon: <DownloadOutlined />,
    },
  ];

  //สำหรับ Table-------------------------------
  const columns = [
    {
      title: "ID MOD",
      dataIndex: "m_id",
      key: "1",
    },
    {
      title: "ชื่อ MOD",
      dataIndex: "m_name",
      key: "2",
    },
    {
      title: "ผู้อัปโหลด",
      dataIndex: ["user", "username"],
      key: "3",
    },
    {
      title: "วันที่อัปโหลด",
      dataIndex: "create_at",
      key: "4",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "จำนวนการดาวน์โหลด",
      dataIndex: "m_download",
      key: "5",
    },
  ];

  const onChange = (e) => {
    if (e.target.value === "2") {
      getAllModsOrderDate()
        .then((res) => {
          setAllMods(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.value === "3") {
      getAllModsOrderDownload()
        .then((res) => {
          setAllMods(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAllModsOrderID()
        .then((res) => {
          setAllMods(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Main>
        {loading ? (
          <div className="layout-content">
            <Row className="rowgap-vbox" gutter={[24, 0]} key="DataALl">
              {count.map((c, index) => (
                <Col
                  key={index}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={6}
                  xl={6}
                  className="mb-24"
                >
                  <Card bordered={false} className="criclebox ">
                    <div className="number">
                      <Row align="middle" gutter={[24, 0]}>
                        <Col xs={18}>
                          <span>{c.today}</span>
                          <Title level={3}>{c.title}</Title>
                        </Col>
                        <Col xs={6}>
                          <div className="icon-box">{c.icon}</div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* table */}
            <Row gutter={[24, 0]}>
              <Col xs="24" xl={24}>
                <Card
                  bordered={false}
                  className="criclebox tablespace mb-24"
                  title="รายงานMODทั้งหมด"
                  extra={
                    <>
                      <Radio.Group onChange={onChange} defaultValue="1">
                        <Radio.Button value="1">ทั้งหมด</Radio.Button>
                        <Radio.Button value="2">อัปโหลดล่าสุด</Radio.Button>
                        <Radio.Button value="3">ดาวน์โหลดสูงสุด</Radio.Button>
                      </Radio.Group>
                    </>
                  }
                >
                  <div className="table-responsive">
                    <Table
                      columns={columns}
                      dataSource={allMods}
                      className="ant-border-space"
                      pagination={10}
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            {/* chart */}
            <Row gutter={[24, 0]}>
              {/* <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
                <Card bordered={false} className="criclebox h-full">
                  <EChart />
                </Card>
              </Col> */}
              <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
                <Card bordered={false} className="criclebox h-full">
                  <ReportChart />
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <>loading...</>
        )}
      </Main>
    </>
  );
};

export default Dashboard;
