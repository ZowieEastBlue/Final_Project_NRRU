import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditModsDetail from "./EditModsDetail";
import axios from "axios";

const EditMods = () => {
  const param = useParams();

  const [modsId, setModsId] = useState([]);

  useEffect(() => {
    viewModsId(param.id);
  }, []);

  const viewModsId = async (id) => {
    try {
      await axios
        .get(process.env.REACT_APP_API + "/ReadModsToEdit/" + id)
        .then((res) => {
          setModsId(res.data);
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {modsId.length > 0 ? (
        <>
          <EditModsDetail ModsList={modsId} editModsID={param.id} />
        </>
      ) : null}
    </>
  );
};

export default EditMods;
