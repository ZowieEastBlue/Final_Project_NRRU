import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import "./newscard.css";
const { Meta } = Card;

const NewsCard = ({ news }) => {
  // console.log(news)
  const { n_title, n_cover, n_detail, create_at, n_id } = news;
  const date = (create_at) => {
    moment(create_at).format("DD/MM/YYYY");
  };
  return (
    <>
      <Link to={"/news/" + n_id}>
        <Card
          hoverable
          style={{
            width: 638,
          }}
          cover={
            <img
              style={{ height: "250px", objectFit: "cover" }}
              alt="example"
              src={`http://localhost:5000/${n_cover}`}
            />
          }
        >
          <Meta
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
            title={n_title}
            description={moment(create_at).format("DD/MM/YYYY")}
          />
        </Card>
      </Link>
    </>
  );
};

export default NewsCard;
