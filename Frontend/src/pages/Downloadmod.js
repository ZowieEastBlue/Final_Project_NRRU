import React from "react";
import styled from "styled-components";
import DownloadCard from "../components/Card/DownloadCard";
import { Col, Row, Pagination, Checkbox, Button } from "antd";
import { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";

//function
import { listMods, searchFilters, GetFilters } from "../functions/mods";
import {
  listCategory,
  listShoes,
  listHouse,
  listHairstyle,
  listFurniture,
  listClothes,
  listCharacter,
  listAccessories,
} from "../functions/category";
import { listTheme } from "../functions/theme";

const Downloadmods = () => {
  const params = useParams();
  console.log("pa", params);
  const [loading, setLoading] = useState(false);
  const [modsData, setModsData] = useState([]);

  //Category Data
  const [category, setCategory] = useState([]);

  //Theme Data
  const [theme, setTheme] = useState([]);
  const [themeSelect, setThemeSelect] = useState([]);
  // console.log("themeSelect=>", themeSelect);

  //ตัวเลือกเพิ่มเติม
  const [shoesData, setShoesData] = useState([]);
  const [houseData, setHouseData] = useState([]);
  const [hairstyleData, setHairstyleData] = useState([]);
  const [furnitureData, setFurnitureData] = useState([]);
  const [clothesData, setClothesData] = useState([]);
  const [characterData, setCharacterData] = useState([]);
  const [accessoriesData, setAccessoriesData] = useState([]);
  console.log("h", houseData);

  const [optionSelect, setOptionSelect] = useState([]);
  console.log("option", optionSelect);

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
    // listMods()
    //   .then((res) => {
    //     setModsData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
    listShoes()
      .then((res) => {
        setShoesData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    listHouse()
      .then((res) => {
        setHouseData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    listHairstyle()
      .then((res) => {
        setHairstyleData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    listFurniture()
      .then((res) => {
        setFurnitureData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    listClothes()
      .then((res) => {
        setClothesData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    listCharacter()
      .then((res) => {
        setCharacterData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    listAccessories()
      .then((res) => {
        setAccessoriesData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // 2. โหลดข้อมูลการค้นหาตามข้อความ
  useEffect(() => {
    fetchDataFilter({ query: text });
  }, [text]);

  // 3. โหลดข้อมูลตาม ID หมวดหมู่
  useEffect(() => {
    loadDataฺByCategory(params.id);
  }, [params.id]);

  const loadDataฺByCategory = async (id) => {
    try {
      await axios
        .get(`http://localhost:5000/api/listmodsByCategory/` + id)
        .then((res) => {
          setModsData(res.data);
        });
    } catch (error) {
      throw error;
    }
  };

  // Filter
  const fetchDataFilter = (arg) => {
    searchFilters(arg).then((res) => {
      setModsData(res.data);
    });
  };

  const ApplyFilter = async () => {
    try {
      if (params.id === "1") {
        await axios
          .post(process.env.REACT_APP_API + `/filter/mods/`, {
            category: params.id,
            theme: themeSelect,
            house: optionSelect,
          })
          .then((res) => {
            // console.log(res.data);
            setModsData(res.data);
          });
      } else if (params.id === "2") {
        await axios
          .post(process.env.REACT_APP_API + `/filter/mods/`, {
            category: params.id,
            theme: themeSelect,
            character: optionSelect,
          })
          .then((res) => {
            // console.log(res.data);
            setModsData(res.data);
          });
      } else if (params.id === "3") {
        await axios
          .post(process.env.REACT_APP_API + `/filter/mods/`, {
            category: params.id,
            theme: themeSelect,
            clothes: optionSelect,
          })
          .then((res) => {
            // console.log(res.data);
            setModsData(res.data);
          });
      } else if (params.id === "4") {
        await axios
          .post(process.env.REACT_APP_API + `/filter/mods/`, {
            category: params.id,
            theme: themeSelect,
            shoes: optionSelect,
          })
          .then((res) => {
            // console.log(res.data);
            setModsData(res.data);
          });
      } else if (params.id === "5") {
        await axios
          .post(process.env.REACT_APP_API + `/filter/mods/`, {
            category: params.id,
            theme: themeSelect,
            furniture: optionSelect,
          })
          .then((res) => {
            // console.log(res.data);
            setModsData(res.data);
          });
      } else if (params.id === "6") {
        await axios
          .post(process.env.REACT_APP_API + `/filter/mods/`, {
            category: params.id,
            theme: themeSelect,
            accessories: optionSelect,
          })
          .then((res) => {
            // console.log(res.data);
            setModsData(res.data);
          });
      } else if (params.id === "7") {
        await axios
          .post(process.env.REACT_APP_API + `/filter/mods/`, {
            category: params.id,
            theme: themeSelect,
            hairstyle: optionSelect,
          })
          .then((res) => {
            // console.log(res.data);
            setModsData(res.data);
          });
      }
    } catch (error) {
      throw error;
    }
  };

  // ทดลอง Fitler--------------------------------------------------

  //ตัวเลือก Option
  const handleCheckOption = (e) => {
    //ค่าปัจจุบันที่ check
    let inCheck = e.target.value;
    console.log("e=> ", e.target.value);

    //ค่าเดิมของ check
    let inState = [...optionSelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setOptionSelect(inState);
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
  };

  const ResetFilter = (e) => {
    window.location.reload();
  };

  return (
    <>
      <Container>
        <PanelListWrap>
          <PanelWrap>
            <h3 className="title">ตัวเลือก</h3>
            <hr />
            <h5 className="title">หมวดหมู่</h5>
            <div className="categoryList">
              {category.map((item, index) => (
                <Link to={`/download/${item.cat_id}`}>
                  <CustomLi value={item.cat_id}>{item.cat_name}</CustomLi>
                </Link>
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
            <div className="categoryList">
              <h5 className="title">ตัวเลือกเพิ่มเติม</h5>
              {params.id === "1" ? (
                <>
                  {houseData.map((item, index) => (
                    <Checkbox
                      onChange={handleCheckOption}
                      value={item.house_id}
                      key={index}
                    >
                      {item.house_type}
                    </Checkbox>
                  ))}
                </>
              ) : params.id === "2" ? (
                <>
                  {characterData.map((item, index) => (
                    <Checkbox
                      onChange={handleCheckOption}
                      key={index}
                      value={item.char_id}
                    >
                      {item.char_type}
                    </Checkbox>
                  ))}
                </>
              ) : params.id === "3" ? (
                <>
                  {clothesData.map((item, index) => (
                    <Checkbox
                      onChange={handleCheckOption}
                      value={item.clot_id}
                      key={index}
                    >
                      {item.clot_type}
                    </Checkbox>
                  ))}
                </>
              ) : params.id === "4" ? (
                <>
                  {shoesData.map((item, index) => (
                    <Checkbox
                      onChange={handleCheckOption}
                      key={index}
                      value={item.shoe_id}
                    >
                      {item.shoe_type}
                    </Checkbox>
                  ))}
                </>
              ) : params.id === "5" ? (
                <>
                  {furnitureData.map((item, index) => (
                    <Checkbox
                      onChange={handleCheckOption}
                      value={item.furn_id}
                      key={index}
                    >
                      {item.furn_type}
                    </Checkbox>
                  ))}
                </>
              ) : params.id === "6" ? (
                <>
                  {accessoriesData.map((item, index) => (
                    <Checkbox
                      onChange={handleCheckOption}
                      value={item.acc_id}
                      key={index}
                    >
                      {item.acc_type}
                    </Checkbox>
                  ))}
                </>
              ) : params.id === "7" ? (
                <>
                  {hairstyleData.map((item, index) => (
                    <Checkbox
                      onChange={handleCheckOption}
                      value={item.hair_id}
                      key={index}
                    >
                      {item.hair_type}
                    </Checkbox>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="wrap_button_filter">
              <Button onClick={ApplyFilter}>ยืนยันตัวเลือก</Button>
              <Button onClick={ResetFilter}>ล้างตัวเลือก</Button>
            </div>
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
              {/* <Pagination onChange={onChange} defaultCurrent={1} total={6} /> */}
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
  border-right: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  margin: 0;

  .title {
    font-size: 1.15rem;
    font-weight: bold;
  }

  .categoryList {
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }

  .wrap_button_filter {
    margin-top: 0.5rem;
    display: flex;
  }
`;

const CustomLi = styled.li`
  list-style-type: none;
  cursor: pointer;
  color: #333;
  :hover {
    color: #c24f22;
  }
`;

const ListWrap = styled.div`
  flex: 1;
  padding: 1rem;
`;

export default Downloadmods;
