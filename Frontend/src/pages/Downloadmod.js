import React from "react";
import styled from "styled-components";
import HomeModCard from "../components/Card/HomeModCard";
import DownloadCard from "../components/Card/DownloadCard";
import ProfileModCard from "../components/Card/ProfileModCard";
import { Col, Row, Pagination, Checkbox } from "antd";
import { useState, useEffect } from "react";
import Listtheme from "../components/ListTheme/Listtheme";
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

  const { searchStore } = useSelector((state) => ({ ...state }));
  // text
  const { text } = searchStore.value;

  console.log("Theme=>", theme);

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

  const [mod, setMod] = useState([
    {
      id: 1,
      title: "mod test 1",
      image:
        "https://www.thigame.com/wp-content/uploads/2021/01/The-Sims4-1.jpg",
    },
    {
      id: 2,
      title: "mod test 2",
      image:
        "https://i.pinimg.com/564x/6a/a1/96/6aa19625adee58217872cc12bf44f254.jpg",
    },
    {
      id: 3,
      title: "mod test 3",
      image:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-sims-4/4/48/Sims-4-freckles-eyebrows-mod.jpg",
    },
    {
      id: 4,
      title: "mod test 4",
      image:
        "https://i.pinimg.com/550x/01/c7/bc/01c7bc5f25f2f512d12a4f1c3a4f8ed0.jpg",
    },
    {
      id: 5,
      title: "mod test 5",
      image:
        "https://gamelikethesea.com/wp-content/uploads/2020/12/Brookheights-cover.jpg",
    },
    {
      id: 6,
      title: "mod test 6",
      image:
        "https://static.fandomspot.com/images/02/11904/00-featured-kpop-group-girls-in-sims4.jpg",
    },
    {
      id: 7,
      title: "mod test 7",
      image:
        "https://static.fandomspot.com/images/02/11904/17-anna-sims-4-cc-screenshot.jpg",
    },
    {
      id: 8,
      title: "mod test 8",
      image:
        "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Screenshot-(37)-Cropped.png",
    },
    {
      id: 9,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
    {
      id: 10,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
    {
      id: 11,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
    {
      id: 12,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
    {
      id: 13,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
    {
      id: 14,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
    {
      id: 15,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
    {
      id: 16,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
    {
      id: 17,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
    {
      id: 18,
      title: "mod test 9",
      image:
        "https://9to5fortnite.com/wp-content/uploads/2022/03/1647443229_875_Best-Sims-4-mods-2022-How-to-download-CC-Gameplay.jpg",
    },
  ]);

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

// styled component
// const Container = styled.section`
//   width: 1320px;
//   height: 100vh;
//   // background-color: #333;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
// `;

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
