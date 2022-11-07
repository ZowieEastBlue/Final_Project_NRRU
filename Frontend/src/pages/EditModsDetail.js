import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Select, Button, message, Upload, Cascader } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const EditModsDetail = (props) => {
  console.log("prop=>", props);

  const { editModsID } = props;
  const { m_name, m_detail, theme_id } = props.ModsList[0];

  const [loading, setLoading] = useState(false);

  // ตัวเลือก ธีม และ หมวดหมู่
  const [selecttheme, setSelectTheme] = useState([]);
  const [selectcategory, setSelectCategory] = useState([]);
  const [optionShoes, setOptionShoes] = useState([]);
  const [optionHouse, setOptionHouse] = useState([]);
  const [optionHairstyle, setOptionHairstyle] = useState([]);
  const [optionFurniture, setOptionFurniture] = useState([]);
  const [optionClothes, setOptionClothes] = useState([]);
  const [optionCharacter, setOptionCharacter] = useState([]);
  const [optionAccessories, setOptionAccessories] = useState([]);

  const [modFileList, setModFileList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [img1FileList, setImg1FileList] = useState([]);
  const [img2FileList, setImg2FileList] = useState([]);
  const [img3FileList, setImg3FileList] = useState([]);

  // โหลดข้อมูล
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // const getDataMods = async () => {
    //   await axios
    //     .get(process.env.REACT_APP_API + `/ReadModsToEdit/` + param.id)
    //     .then((res) => {
    //       setModsData(res.data[0]);
    //       setLoading(true);
    //     });
    // };

    const getTheme = () => {
      axios.get(process.env.REACT_APP_API + "/theme").then((res) => {
        setSelectTheme(res.data);
      });
    };
    const getCategory = () => {
      axios.get(process.env.REACT_APP_API + "/category").then((res) => {
        setSelectCategory(res.data);
      });
    };
    const getShoes = () => {
      axios.get(process.env.REACT_APP_API + "/category/shoes").then((res) => {
        setOptionShoes(res.data);
      });
    };
    const getHouse = () => {
      axios.get(process.env.REACT_APP_API + "/category/house").then((res) => {
        setOptionHouse(res.data);
      });
    };
    const getHairstyle = () => {
      axios
        .get(process.env.REACT_APP_API + "/category/hairstyle")
        .then((res) => {
          setOptionHairstyle(res.data);
        });
    };
    const getFurniture = () => {
      axios
        .get(process.env.REACT_APP_API + "/category/furniture")
        .then((res) => {
          setOptionFurniture(res.data);
        });
    };
    const getClothes = () => {
      axios.get(process.env.REACT_APP_API + "/category/clothes").then((res) => {
        setOptionClothes(res.data);
      });
    };
    const getCharacter = () => {
      axios
        .get(process.env.REACT_APP_API + "/category/character")
        .then((res) => {
          setOptionCharacter(res.data);
        });
    };
    const getAccessories = () => {
      axios
        .get(process.env.REACT_APP_API + "/category/accessories")
        .then((res) => {
          setOptionAccessories(res.data);
        });
    };

    getTheme();
    getCategory();
    getShoes();
    getHouse();
    getHairstyle();
    getFurniture();
    getClothes();
    getCharacter();
    getAccessories();
    // getDataMods();
    setLoading(true);
  };

  const options = [
    {
      label: "บ้าน",
      value: 1,
      children: optionHouse.map((item) => ({
        label: item.house_type,
        value: item.house_id,
      })),
    },
    {
      label: "ตัวละคร",
      value: 2,
      children: optionCharacter.map((item) => ({
        label: item.char_type,
        value: item.char_id,
      })),
    },
    {
      label: "เสื้อผ้า",
      value: 3,
      children: optionClothes.map((item) => ({
        label: item.clot_type,
        value: item.clot_id,
      })),
    },
    {
      label: "รองเท้า",
      value: 4,
      children: optionShoes.map((item) => ({
        label: item.shoe_type,
        value: item.shoe_id,
      })),
    },
    {
      label: "เฟอร์นิเจอร์",
      value: 5,
      children: optionFurniture.map((item) => ({
        label: item.furn_type,
        value: item.furn_id,
      })),
    },
    {
      label: "เครื่องประดับ",
      value: 6,
      children: optionAccessories.map((item) => ({
        label: item.acc_type,
        value: item.acc_id,
      })),
    },
    {
      label: "ทรงผม",
      value: 7,
      children: optionHairstyle.map((item) => ({
        label: item.hair_type,
        value: item.hair_id,
      })),
    },
  ];

  // ตัวแก้ปัญหา Form
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleSubmit = (value) => {
    console.log(value);
  };

  return (
    <>
      {loading ? (
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <FormEdit>
                <Form layout="horizontal" onFinish={handleSubmit}>
                  {/* Form ชื่อMOD */}
                  <Form.Item
                    style={{ textAlign: "left" }}
                    label="ชื่อ: "
                    name="m_name"
                    initialValue={m_name}
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกชื่อ!",
                      },
                    ]}
                  >
                    <Input placeholder="ชื่อ" />
                  </Form.Item>
                  {/* Form รายละเอียด */}
                  <Form.Item
                    style={{ textAlign: "left" }}
                    label="รายละเอียด: "
                    name="m_detail"
                    initialValue={m_detail}
                  >
                    <Input.TextArea placeholder="รายละเอียด" />
                  </Form.Item>
                  {/* Form select theme */}
                  <Form.Item
                    label="เลือกธีม"
                    name="themeID"
                    initialValue={theme_id}
                    style={{ textAlign: "left" }}
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกธีม!",
                      },
                    ]}
                  >
                    <Select placeholder="กรุณาเลือกธีม">
                      {selecttheme.map((val, index) => {
                        return (
                          <Select.Option key={index} value={val.theme_id}>
                            {val.theme_name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  {/* Form select category */}
                  <Form.Item
                    label="เลือกหมวดหมู่"
                    name="categoryID"
                    style={{ textAlign: "left" }}
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกหมวดหมู่!",
                      },
                    ]}
                  >
                    <Cascader
                      style={{
                        width: "100%",
                      }}
                      options={options}
                      // onChange={onChange}
                      maxTagCount={1}
                      placeholder="กรุณาเลือกหมวดหมู่"
                    />
                  </Form.Item>
                  {/* upload file MOD */}
                  <Form.Item
                    label="เลือกไฟล์MOD"
                    name="m_file"
                    style={{ textAlign: "left" }}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกเลือกไฟล์!",
                      },
                    ]}
                  >
                    <Upload
                      beforeUpload={(file) => {
                        setModFileList(file);
                        return false;
                      }}
                      style={{ textAlign: "left" }}
                      name="m_file"
                    >
                      <Button icon={<UploadOutlined />} className="btn_upload">
                        อัปโหลดไฟล์
                      </Button>
                    </Upload>
                  </Form.Item>
                  {/* upload image 1 */}
                  <Form.Item
                    label="เลือกไฟล์รูป 1"
                    name="m_img1"
                    style={{ textAlign: "left" }}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกเลือกไฟล์!",
                      },
                    ]}
                  >
                    <Upload
                      beforeUpload={(file) => {
                        setImg1FileList(file);
                        return false;
                      }}
                      style={{ textAlign: "left" }}
                      maxCount={1}
                      name="m_img1"
                    >
                      <Button icon={<UploadOutlined />} className="btn_upload">
                        อัปโหลดรูป 1
                      </Button>
                    </Upload>
                  </Form.Item>
                  {/* upload image 2 */}
                  <Form.Item
                    label="เลือกไฟล์รูป 2"
                    name="m_img2"
                    style={{ textAlign: "left" }}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกเลือกไฟล์!",
                      },
                    ]}
                  >
                    <Upload
                      beforeUpload={(file) => {
                        setImg2FileList(file);
                        return false;
                      }}
                      style={{ textAlign: "left" }}
                    >
                      <Button icon={<UploadOutlined />} className="btn_upload">
                        อัปโหลดรูป 2
                      </Button>
                    </Upload>
                  </Form.Item>
                  {/* upload image 3 */}
                  <Form.Item
                    label="เลือกไฟล์รูป 3"
                    name="m_img3"
                    style={{ textAlign: "left" }}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกเลือกไฟล์!",
                      },
                    ]}
                  >
                    <Upload
                      beforeUpload={(file) => {
                        setImg3FileList(file);
                        return false;
                      }}
                      style={{ textAlign: "left" }}
                    >
                      <Button icon={<UploadOutlined />} className="btn_upload">
                        อัปโหลดรูป 3
                      </Button>
                    </Upload>
                  </Form.Item>

                  <br />
                  {/* ปุ่ม submit */}
                  <Form.Item>
                    <Button htmlType="submit" className="btn_upload">
                      แก้ไข
                    </Button>
                  </Form.Item>
                </Form>
              </FormEdit>
            </Col>
          </Row>
        </Container>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

const FormEdit = styled.section`
  width: 600px;
  height: auto;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 20px 70px;
  margin: 2rem auto;
`;

export default EditModsDetail;
