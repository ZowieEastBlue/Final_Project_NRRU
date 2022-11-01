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
import { listMods, listModsByTopDownload } from "../../functions/mods";
import { listNews } from "../../functions/news";

const Homepages = () => {
  const [modsData, setModsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  console.log(modsData);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // listMods()
    //   .then((res) => {
    //     setModsData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });

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
  };

  const [mod, setMod] = useState([
    {
      m_id: 1,
      m_name: "mod test 1",
      m_img1:
        "https://www.thigame.com/wp-content/uploads/2021/01/The-Sims4-1.jpg",
    },
    {
      m_id: 2,
      m_name: "mod test 2",
      m_img1:
        "https://i.pinimg.com/564x/6a/a1/96/6aa19625adee58217872cc12bf44f254.jpg",
    },
    {
      m_id: 3,
      m_name: "mod test 3",
      m_img1:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-sims-4/4/48/Sims-4-freckles-eyebrows-mod.jpg",
    },
  ]);

  const [news, setNews] = useState([
    {
      id: 10,
      title: "News test 1",
      image: "https://pbs.twimg.com/media/BruqBV8CQAAa6pH.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "02-04-2022",
    },
    {
      id: 11,
      title: "News test 2",
      image:
        "https://media.contentapi.ea.com/content/dam/eacom/SIMS/common/ts4-april-6-blog-image.png.adapt.crop191x100.628p.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "10-10-2022",
    },
    {
      id: 12,
      title: "News test 3",
      image:
        "https://m.thaiware.com/upload_misc/news/2019_08/728x409/16996_19082211251164.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "22-12-2022",
    },
  ]);

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
          <span>แนะนำ</span>
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
