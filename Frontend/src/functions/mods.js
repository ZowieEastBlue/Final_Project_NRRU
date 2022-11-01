import axios from "axios";

export const UploadMods = async (values) => {
  // console.log("DataToUpload", values);
  return await axios.post(process.env.REACT_APP_API + "/mods", values, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const readModsUsers = async (id) => {
  return await axios.get(process.env.REACT_APP_API + "/mods/users/" + id, {});
};

export const listMods = async () => {
  return await axios.get(process.env.REACT_APP_API + "/mods");
};

export const listModsByTopDownload = async () => {
  return await axios.get(process.env.REACT_APP_API + "/mods/listByTopdownload");
};

export const listModsForEdit = async (id) => {
  console.log("id=>", id);
  return await axios.get(process.env.REACT_APP_API + "/listmodsForEdit/" + id);
};

export const removeMods = async (authtoken, id) => {
  console.log("D id=>", id);
  return await axios.delete(
    process.env.REACT_APP_API + "/mods/removemods/" + id,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const searchFilters = async (arg) =>
  await axios.post(process.env.REACT_APP_API + "/search/filters", arg);
