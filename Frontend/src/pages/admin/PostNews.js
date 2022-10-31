import { Row, Col, Card, Input, message } from "antd";
import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Editor
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import "./admin.css";

//Latout
import Main from "../../components/admin/layout/Main";

const { TextArea } = Input;

const PostNews = () => {
  const navigate = useNavigate();

  //--------------------------------------------------------------------------
  //api upload image for TextEditor
  // function uploadImageCallBack(file) {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open("POST", "https://api.imgur.com/3/");
  //     xhr.setRequestHeader("Authorization", "Client-ID 496e9db441c1090");
  //     const data = new FormData();
  //     data.append("image", file);
  //     xhr.send(data);
  //     xhr.addEventListener("load", () => {
  //       const response = JSON.parse(xhr.responseText);
  //       console.log(response);
  //       resolve(response);
  //     });
  //     xhr.addEventListener("error", () => {
  //       const error = JSON.parse(xhr.responseText);
  //       console.log(error);
  //       reject(error);
  //     });
  //   });
  // }
  //--------------------------------------------------------------------------

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState({});
  const [image, setImage] = useState("");

  // const onChangeValue = (e) => {
  //   setuserInfo({
  //     ...userInfo,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const [isError, setError] = useState(null);
  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();

      const formData = new FormData();
      formData.append("n_title", title);
      formData.append("description", detail.description.value);
      formData.append("n_cover", image);

      axios.post(`http://localhost:5000/api/addnews`, formData).then((res) => {
        if (res.data.success === true) {
          message.success(res.data.message);
          navigate("/admin");
        }
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Main>
        <div className="row h-auto col-md-8">
          <h3 className="myaccount-content"> เพิ่มข่าว </h3>
          <Form
            onSubmit={addDetails}
            className="update__forms"
            encType="multipart/form-data"
            method="POST"
          >
            <Form.Group>
              <Form.Label className="font-weight-bold">หัวเรื่อง :</Form.Label>
              <Form.Control
                // type="text"
                name="n_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="กรุณาใส่หัวข้อ"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="formFile" className="form-label">
                เลือกรูปหน้าปก :
              </Form.Label>
              <Form.Control
                type="file"
                id="n_cover"
                name="n_cover"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="form-group col-md-12 editor">
              <Form.Label className="font-weight-bold">รายละเอียด :</Form.Label>
              <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  // image: {
                  //   uploadCallback: uploadImageCallBack,
                  //   alt: { present: true, mandatory: true },
                  // },
                }}
              />
              <Form.Control
                as="textarea"
                style={{ display: "none" }}
                disabled
                ref={(val) => (detail.description = val)}
                // ref={detail}
                value={draftToHtml(
                  convertToRaw(description.getCurrentContent())
                )}
              />
            </Form.Group>
            {isError !== null && <div className="errors"> {isError} </div>}
            <br />
            <div className="form-group col-sm-12">
              <Button type="submit" className="btn btn__theme">
                บันทึก
              </Button>
            </div>
          </Form>
        </div>
      </Main>
    </>
  );
};

const FormAddNews = styled.div`
  width: 100%;
  height: auto;
  border-radius: 12px;
  background: #fff;
  padding: 20px;
`;

export default PostNews;
