import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import "./listtheme.css";

const Listtheme = () => {
  const [selecttheme, setSelectTheme] = useState([]);
  console.log(selecttheme);

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = () => {
    axios.get("http://localhost:5000/api/theme").then((res) => {
      setSelectTheme(res.data);
    });
  };

  return (
    <>
      <WrapListTheme>
        <ul>
          {selecttheme.map((index, val) => {
            return (
              <li key={index} id={val.theme_id}>
                {val.theme_name}
              </li>
            );
          })}
        </ul>
      </WrapListTheme>
    </>
  );
};

const WrapListTheme = styled.div`
  width: 100%;
  height: 300px;
  border: 2px solid;
  overflow: auto;
  margin: 0;
  padding: 0;
`;

export default Listtheme;
