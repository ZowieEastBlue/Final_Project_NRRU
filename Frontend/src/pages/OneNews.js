import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Interweave } from "interweave";
import Footer from "../components/Footer/Footer";

import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const OneNews = () => {
  const param = useParams();

  const [newsData, setNewsData] = useState([]);
  const [newscontent, setNewsContent] = useState();
  console.log(newsData);

  useEffect(() => {
    loadData(param.id);
  }, []);

  const loadData = async (id) => {
    try {
      await axios
        .get(`http://localhost:5000/api/getOneNews/` + id)
        .then((res) => {
          setNewsData(res.data.listId[0]);
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Container className="h-auto">
        <Row>
          <Col md={8} className="p-4">
            <NewsHeader>
              <TitleNews>{newsData.n_title}</TitleNews>
              <DateNews>
                {moment(newsData.create_at).format("DD/MM/YYYY")}
              </DateNews>
            </NewsHeader>
            <CoverNews>
              <img src={`http://localhost:5000/${newsData.n_cover}`} alt="#" />
            </CoverNews>
            <MainContent>
              <Interweave content={newsData.n_detail} />
            </MainContent>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

const NewsHeader = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
  background: #fff;
`;

const TitleNews = styled.h1`
  color: #212121;
`;

const DateNews = styled.div`
  color: #a0a0a0;
`;

const CoverNews = styled.div`
  width: 100%;
  max-height: 425px;
  overflow: hidden;
  border-radius: 10px;s
  margin-bottom: 2rem;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100vh
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-overflow: ellipsis;
  overflow: auto;
`;

export default OneNews;
