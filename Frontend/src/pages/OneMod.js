import React, { useState, useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { Button } from "antd";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Footer from "../components/Footer/Footer";
import { DownloadOutlined } from "@ant-design/icons";

// function
import { DownloadmodsByID } from "../functions/mods";

const OneMod = () => {
  const param = useParams();

  const [loading, setLoading] = useState(false);

  const [modsData, setModsData] = useState();
  console.log("modData=>", modsData);

  useEffect(() => {
    loadData(param.id);
  }, []);

  const loadData = async (id) => {
    try {
      await axios.get(`http://localhost:5000/api/onemods/` + id).then((res) => {
        setModsData(res.data[0]);
        setLoading(true);
      });
    } catch (error) {
      throw error;
    }
  };

  // const hanledDownload = () => {
  //   DownloadmodsByID(param.id).then((res) => res.data);
  // };

  return (
    <>
      {loading ? (
        <Container>
          <Row>
            <ModsHeader>
              <ModsHeaderLeft>
                <ModsHeaderLeftImg>
                  <UserImg
                    src={`http://localhost:5000/${modsData.user.user_img}`}
                  />
                </ModsHeaderLeftImg>
                <ModsHeaderLeftText>
                  <span style={{ color: "#4E4E4E" }}>สร้างโดย</span>
                  <Link to={`/profile/${modsData.user.user_id}`}>
                    <span>{modsData.user.username}</span>
                  </Link>
                </ModsHeaderLeftText>
              </ModsHeaderLeft>
              <ModsHeaderCenter>
                <h5>{modsData.m_name}</h5>
              </ModsHeaderCenter>
              <ModsHeaderRight>
                <ClockCircleOutlined />
                &nbsp;
                <em>
                  อัปโหลดเมื่อ {moment(modsData.create_at).format("DD/MM/YYYY")}
                </em>
              </ModsHeaderRight>
            </ModsHeader>
          </Row>
          <Row>
            <Col md={6} className="mx-auto">
              <Stack gap={3}>
                <img src={`http://localhost:5000/${modsData.m_img1}`} alt="#" />
                <img src={`http://localhost:5000/${modsData.m_img2}`} alt="#" />
                <img src={`http://localhost:5000/${modsData.m_img3}`} alt="#" />
              </Stack>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row>
            <Col md={6}>
              <ModsDetailTitle>รายละเอียด</ModsDetailTitle>
              <ModsDetail>
                <pre className="detail">{modsData.m_detail}</pre>
              </ModsDetail>
            </Col>
            <Col md={6}>
              <WrapDownloadDetail>
                <AmountDownload>
                  <span className="title">จำนวนการดาวน์โหลด :</span>
                  <span className="download">{modsData.m_download}</span>
                </AmountDownload>
                <a
                  href={
                    process.env.REACT_APP_API + `/mods/download/${param.id}`
                  }
                >
                  <DownloadButton icon={<DownloadOutlined />}>
                    ดาวน์โหลด
                  </DownloadButton>
                </a>
              </WrapDownloadDetail>
            </Col>
          </Row>
        </Container>
      ) : (
        <>loading...</>
      )}
      <Footer />
    </>
  );
};

const ModsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 5rem 0 3rem 0;
  height: 60px;

  padding: 5px;
`;

const ModsHeaderLeft = styled.div`
  border-right: 2px solid #c4c4c4;
  width: 30%;
  display: flex;
  justify-content: space-between;
`;

const ModsHeaderLeftImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
`;

const UserImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ModsHeaderLeftText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  margin-left: 1rem;
`;

const ModsHeaderCenter = styled.div`
  width: 100%;
  padding-left: 1rem;
`;

const ModsHeaderRight = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
`;

const ModsDetailTitle = styled.h5`
  border-bottom: 2px solid #c24f22;
  margin-bottom: 1rem;
`;

const WrapDownloadDetail = styled.div`
  height: auto;
  padding: 2rem;
`;

const AmountDownload = styled.div`
  width: 100%;

  .title {
    font-weight: bold;
    color: #2e3c54;
    margin-right: 1rem;
  }

  .download {
    color: #2e3c54;
    font-size: 24px;
  }
`;

const DownloadButton = styled(Button)`
  margin-top: 2rem;
  width: 300px;
  height: 100px;
  font-size: 30px;
  background: #8dc229;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const ModsDetail = styled.div`
  width: 100%;
  height: auto;
  .detail {
    font-size: 1.1rem;
    overflow: auto;
  }
`;

export default OneMod;
