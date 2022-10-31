import axios from "axios";

export const listTheme = async () => {
  return await axios.get(process.env.REACT_APP_API + "/theme");
};
