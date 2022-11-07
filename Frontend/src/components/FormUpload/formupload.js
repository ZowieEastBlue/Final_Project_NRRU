import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select, Button, message, Upload, Cascader } from "antd";

//fucntion
import { UploadMods } from "../../functions/mods";

// Redux
import { useSelector } from "react-redux";

function Formupload() {
  const { userStore } = useSelector((state) => ({ ...state }));
  const idtoken = localStorage.token;

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
  console.log("ModFile=>", modFileList);
  console.log("Img1=>", img1FileList);
  // console.log("Img2=>", img2FileList);
  // console.log("Img3=>", img3FileList);

  // โหลดข้อมูล
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
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
  };

  // Option Category
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

  // เช็คค่า Option Category
  // const onChange = (value) => {
  //   console.log(value);
  // };

  // ตัวแก้ปัญหา Form
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Upload Mods
  const handleSubmit = async (values) => {
    console.log("values>>", values);
    const formData = new FormData();

    formData.append("m_file", modFileList);
    formData.append("m_img1", img1FileList);
    formData.append("m_img2", img2FileList);
    formData.append("m_img3", img3FileList);
    formData.append("m_name", values.m_name);
    formData.append("theme_id", values.themeID);
    formData.append("cat_id", values.categoryID);
    formData.append("m_detail", values.m_detail);
    formData.append("user_id", userStore.value.user_id);

    await UploadMods(formData)
      .then((res) => {
        message.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response);
      });
  };

  return (
    <>
      <div className="Container">
        <div className="form_upload">
          <span className="title_upload">อัปโหลด</span>
          <Form layout="horizontal" onFinish={handleSubmit}>
            {/* Form ชื่อMOD */}
            <Form.Item
              style={{ textAlign: "left" }}
              label="ชื่อ: "
              name="m_name"
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
            >
              <Input.TextArea placeholder="รายละเอียด" />
            </Form.Item>
            {/* Form select theme */}
            <Form.Item
              label="เลือกธีม"
              name="themeID"
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
                อัปโหลด
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Formupload;
