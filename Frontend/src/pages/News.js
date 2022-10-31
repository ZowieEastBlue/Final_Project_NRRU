import React from "react";
import { Row, Col } from "antd";
import NewsCard from "../components/Card/NewsCard";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { Container } from "react-bootstrap";

const News = () => {
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

  const [testnews, setTestnews] = useState([]);
  console.log("news", testnews);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    const getAllNews = () => {
      axios.get("http://localhost:5000/api/getAllNews").then((res) => {
        setTestnews(res.data);
      });
    };

    getAllNews();
  };

  return (
    <>
      <Container>
        <NewsHeader>ข่าวอัปเดต</NewsHeader>
        <Row gutter={[16, 16]}>
          {testnews.map((item) => (
            <Col span={12}>
              <div key={item.id} className="col_news">
                <NewsCard news={item} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

const NewsHeader = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin: 2rem auto;
`;

export default News;
