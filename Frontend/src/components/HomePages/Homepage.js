import React from "react";
import { useState, useEffect } from "react";
import "./homepage.css";
import "../assets/content.css";
import { Button, Col, Row } from "antd";
import ProfileModCard from "../../components/Card/ProfileModCard";
import HomeModCard from "../../components/Card/HomeModCard";
import NewsCard from "../Card/NewsCard";
import { Container } from "react-bootstrap";

import simsheader from "../assets/images/sims_header.png";
import { Link } from "react-router-dom";

//function
import {
  listMods,
  listModsByTopDownload,
  LastData,
  listModsTop,
} from "../../functions/mods";
import { listNews } from "../../functions/news";

const Homepages = () => {
  const [modsData, setModsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [lastData, setLastData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listNews()
      .then((res) => {
        setNewsData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    listModsByTopDownload()
      .then((res) => {
        setModsData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    LastData()
      .then((res) => {
        setLastData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <Container>
        {/* <div className="main_container"> */}
        {/* header */}
        <div className="home_header">
          <div className="home_header_left">
            <img src={simsheader} alt="" />
          </div>
          <div className="home_header_right">
            <div className="wrap_home_header_right">
              <h2>
                มองหารูปแบบที่แตกต่าง
                <br />
                เพื่อประสบการณ์ใหม่ที่ยังไม่เคยลอง
              </h2>
              <span>
                ลองหาสิ่งใหม่ๆที่คุณยังไม่เคยลองหรือมองข้ามไป
                <br />
                เปิดประสบการณ์ใหม่ในการเล่นของคุณ
              </span>
              <Link to="/download">
                <Button className="btn_h_r">ค้นหา</Button>
              </Link>
            </div>
          </div>
        </div>
        {/* mod แนะนำ */}
        <div className="wrap_mods_rec">
          <span>ดาวน์โหลดสูงสุด</span>
          <Row gutter={32}>
            {modsData.map((item) => (
              <Col span={8}>
                <div key={item.m_id} className="col_mods">
                  <HomeModCard key={item.m_title} mod={item} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className="wrap_mods_rec">
          <span>อัปโหลดล่าสุด</span>
          <Row gutter={32}>
            {lastData.map((item) => (
              <Col span={8}>
                <div key={item.m_id} className="col_mods">
                  <HomeModCard key={item.m_title} mod={item} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
        {/* News */}
        <div className="news_header">
          <span>ข่าวอัปเดต</span>
          <Link to="/news">ดูทั้งหมด</Link>
        </div>
        <div className="wrap_news_rec">
          <Row gutter={[32, 16]}>
            {newsData.slice(0, 4).map((item) => (
              <Col span={12}>
                <div key={item.id} className="col_news">
                  <NewsCard news={item} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
        {/* </div> */}
      </Container>
    </>
  );
};

export default Homepages;
