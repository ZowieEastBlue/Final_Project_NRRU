import axios from "axios";

export const listCategory = async () => {
  return await axios.get(process.env.REACT_APP_API + "/category");
};
