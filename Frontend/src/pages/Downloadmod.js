import React from "react";
import styled from "styled-components";
import DownloadCard from "../components/Card/DownloadCard";
import { Col, Row, Pagination, Checkbox } from "antd";
import { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import { Container } from "react-bootstrap";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";

//function
import { listMods, searchFilters } from "../functions/mods";
import { listCategory } from "../functions/category";
import { listTheme } from "../functions/theme";

const Downloadmods = () => {
  const [modsData, setModsData] = useState([]);

  //Category Data
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  //Theme Data
  const [theme, setTheme] = useState([]);
  const [themeSelect, setThemeSelect] = useState([]);

  const [newFilter, setNewFilter] = useState([{ category: [] }, { theme: [] }]);

  console.log("Filter", newFilter);

  const { searchStore } = useSelector((state) => ({ ...state }));
  // text
  const { text } = searchStore.value;

  // 1. โหลดข้อมูลทั้งหมด
  useEffect(() => {
    loadData();
    listCategory().then((res) => setCategory(res.data));
    listTheme().then((res) => setTheme(res.data));
  }, []);

  const loadData = () => {
    listMods()
      .then((res) => {
        setModsData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // 2. โหลดข้อมูลการค้นหาตามข้อความ
  useEffect(() => {
    fetchDataFilter({ query: text });
  }, [text]);

  // Filter
  const fetchDataFilter = (arg) => {
    searchFilters(arg).then((res) => {
      setModsData(res.data);
    });
  };

  const [current, setCurrent] = useState();

  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  // เลือกตัวเลือก หมวดหมู่
  const handleCheckCategory = (e) => {
    //ค่าปัจจุบันที่ check
    let inCheck = e.target.value;

    //ค่าเดิมของ check
    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState);
    fetchDataFilter({ category: inState });
    if (inState.length < 1) {
      loadData();
    }
  };

  // เลือกตัวเลือก ธีม
  const handleCheckTheme = (e) => {
    //ค่าปัจจุบันที่ check
    let inCheck = e.target.value;
    console.log("e=> ", e.target.value);

    //ค่าเดิมของ check
    let inState = [...themeSelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setThemeSelect(inState);
    fetchDataFilter({ theme: inState });
    if (inState.length < 1) {
      loadData();
    }
  };

  // ทดลอง Fitler--------------------------------------------------
  // เลือกตัวเลือก หมวดหมู่
  // const handleCheckFilter = (e) => {
  //   //ค่าปัจจุบันที่ check
  //   let inCheck = e.target.value;

  //   //ค่าเดิมของ check
  //   let inState = [...themeSelect];

  //   let findCheck = inState.indexOf(inCheck);

  //   if (findCheck === -1) {
  //     inState.push(inCheck);
  //   } else {
  //     inState.splice(findCheck, 1);
  //   }
  //   setNewFilter({ category: inState });
  //   console.log(inState);
  //   setThemeSelect({ category: inState });
  //   if (inState.length < 1) {
  //     loadData();
  //   }
  // };

  // // เลือกตัวเลือก ธีม
  // const handleCheckTheme = (e) => {
  //   //ค่าปัจจุบันที่ check
  //   let inCheck = e.target.value;
  //   console.log("e=> ", e.target.value);

  //   //ค่าเดิมของ check
  //   let inState = [...newFilter[1]];

  //   let findCheck = inState.indexOf(inCheck);

  //   if (findCheck === -1) {
  //     inState.push(inCheck);
  //   } else {
  //     inState.splice(findCheck, 1);
  //   }
  //   setNewFilter({ theme: inState });
  //   // fetchDataFilter({ theme: inState });
  //   if (inState.length < 1) {
  //     loadData();
  //   }
  // };

  return (
    <>
      <Container>
        <PanelListWrap>
          <PanelWrap>
            <h5 className="title">ตัวเลือก</h5>
            <hr />
            <h5 className="title">หมวดหมู่</h5>
            <div className="categoryList">
              {category.map((item, index) => (
                <Checkbox onChange={handleCheckCategory} value={item.cat_id}>
                  {item.cat_name}
                </Checkbox>
              ))}
            </div>
            <hr />
            <div className="categoryList">
              <h5 className="title">ธีม</h5>
              {theme.map((item, index) => (
                <Checkbox onChange={handleCheckTheme} value={item.theme_id}>
                  {item.theme_name}
                </Checkbox>
              ))}
            </div>
            <hr />
            <h5 className="title">ตัวเลือกเพิ่มเติม</h5>
          </PanelWrap>
          <ListWrap>
            <Row gutter={[16, 16]}>
              {modsData.map((item) => (
                <Col span={8}>
                  <div key={item.id}>
                    <DownloadCard mod={item} />
                  </div>
                </Col>
              ))}
              <Pagination onChange={onChange} defaultCurrent={1} total={6} />
            </Row>
          </ListWrap>
        </PanelListWrap>
      </Container>
      <Footer />
    </>
  );
};

const PanelListWrap = styled.div`
  display: flex;
  flex: 1;
`;

const PanelWrap = styled.div`
  flex-basis: 280px;
  padding: 1rem;
  overflow-y: auto;
  // background-color: #777;
  border-right: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  margin: 0;

  .title {
    font-size: 1rem;
  }

  .categoryList {
    display: flex;
    flex-direction: column;
  }
`;

const ListWrap = styled.div`
  flex: 1;
  padding: 1rem;
  // background-color: #111;
`;

export default Downloadmods;
