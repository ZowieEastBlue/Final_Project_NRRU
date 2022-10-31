import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditNewsDetail from "./EditNewsDetail";
//Latout
import Main from "../../components/admin/layout/Main";

import { listOneNews } from "../../functions/news";

const EditNews = () => {
  const param = useParams();
  useEffect(() => {
    viewNewsId(param.id);
  }, []);

  const [newsId, setNewsId] = useState([]);
  console.log("news=>", newsId);
  const viewNewsId = async (id) => {
    try {
      await listOneNews(id).then((res) => {
        setNewsId(res.data.listId);
      });
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <Main>
        {newsId.length > 0 ? (
          <>
            <EditNewsDetail newsList={newsId} editNewsID={param.id} />
          </>
        ) : null}
      </Main>
    </>
  );
};

export default EditNews;
