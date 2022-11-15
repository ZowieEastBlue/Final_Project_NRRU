import axios from "axios";

export const listNews = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/getAllNews", {
    headers: {
      authtoken,
    },
  });
};

export const listOneNews = async (id) => {
  return await axios.get(process.env.REACT_APP_API + "/getOneNews/" + id);
};

export const removeNews = async (id) => {
  return await axios.delete(process.env.REACT_APP_API + "/removeNews/" + id);
};
