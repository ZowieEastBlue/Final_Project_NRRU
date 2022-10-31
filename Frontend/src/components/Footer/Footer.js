import React from "react";
import { Layout, Row, Col } from "antd";

const Footer = () => {
  const { Footer: FooterSims } = Layout;
  return (
    // <FooterSims style={{ background: "#fafafa" }}>
    //   <Row className="just">
    //     <Col xs={24} md={12} lg={12}>
    //       <div className="copyright">© 2022, made with</div>
    //     </Col>
    //   </Row>
    // </FooterSims>
    <div
      className="text-center p-4 mt-5"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <p className="text-reset fw-bold">© 2022 Copyright:Thanphisit</p>
    </div>
  );
};

export default Footer;
