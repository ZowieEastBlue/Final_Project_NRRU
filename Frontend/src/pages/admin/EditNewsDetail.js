import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

// Editor
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import "./admin.css";

//Latout
import Main from "../../components/admin/layout/Main";

//function
import { listOneNews } from "../../functions/news";

const EditNewsDetail = (props) => {
  console.log("prop=>", props);
  const navigate = useNavigate();

  const { n_title, n_detail, n_cover } = props.newsList[0];
  const { editNewsID } = props;

  const [title, setTitle] = useState(n_title);
  const [detail, setDetail] = useState({});
  const [image, setImage] = useState("");

  console.log("de", detail);

  let editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(convertFromHTML(n_detail))
  );
  const [description, setDescription] = useState(editorState);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const [isError, setError] = useState(null);

  const EditDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();

      const formData = new FormData();
      formData.append("n_title", title);
      formData.append("description", detail.description.value);
      // formData.append("n_cover", image);
      // { image.length===0 ? formData.append("n_cover", n_cover): formData.append("n_cover", image) }
      if (image.length === 0) {
        formData.append("n_cover", n_cover);
      } else {
        formData.append("n_cover", image);
      }

      await axios
        .put(process.env.REACT_APP_API + `/editnews/` + editNewsID, formData)
        .then((res) => {
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
      <div className="row h-auto col-md-8">
        <h3 className="myaccount-content"> เพิ่มข่าว </h3>
        <Form
          onSubmit={EditDetails}
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
              value={draftToHtml(convertToRaw(description.getCurrentContent()))}
            />
          </Form.Group>
          {isError !== null && <div className="errors"> {isError} </div>}
          <br />
          <div className="form-group col-sm-12">
            <Button type="submit" className="btn btn__theme">
              แก้ไข
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditNewsDetail;
