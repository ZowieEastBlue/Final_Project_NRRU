import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

const DownloadCard = ({ mod }) => {
  // console.log(mod)
  const { m_name, m_img1, m_id } = mod;
  // console.log("m_id=>", m_id);
  return (
    <>
      <Link to={"/onemod/" + m_id}>
        <Card
          hoverable
          style={{
            width: 320,
            alignItems: "center",
            marginLeft: "5px",
          }}
          cover={
            <img
              className="img_card"
              style={{ height: "250px", objectFit: "cover" }}
              alt="example"
              src={`http://localhost:5000/${m_img1}`}
            />
          }
        >
          <Meta style={{ justifyContent: "center" }} title={m_name} />
        </Card>
      </Link>
    </>
  );
};

export default DownloadCard;
