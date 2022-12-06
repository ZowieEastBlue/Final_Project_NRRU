import axios from "axios";

export const UploadMods = async (values) => {
  // console.log("DataToUpload", values);
  return await axios.post(process.env.REACT_APP_API + "/mods", values, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const EditMods = async (id, FormData, Category) => {
  // console.log("DataToUpload", values);
  return await axios.put(
    process.env.REACT_APP_API + "/mods/" + id,
    FormData,
    Category,
    {
      headers: { "content-type": "multipart/form-data" },
    }
  );
};

export const readModsUsers = async (id) => {
  return await axios.get(process.env.REACT_APP_API + "/mods/users/" + id, {});
};

export const listMods = async () => {
  return await axios.get(process.env.REACT_APP_API + "/mods");
};

export const listModsTop = async () => {
  return await axios.get(process.env.REACT_APP_API + "/mods/top");
};

export const LastData = async () => {
  return await axios.get(process.env.REACT_APP_API + "/mods/last");
};

export const listModsByTopDownload = async () => {
  return await axios.get(process.env.REACT_APP_API + "/mods/listByTopdownload");
};

export const listModsForEdit = async (id) => {
  console.log("id=>", id);
  return await axios.get(process.env.REACT_APP_API + "/listmodsForEdit/" + id);
};

export const removeMods = async (id) => {
  console.log("D id=>", id);
  return await axios.delete(
    process.env.REACT_APP_API + "/mods/removemods/" + id
  );
};

export const searchFilters = async (arg) =>
  await axios.post(process.env.REACT_APP_API + "/search/filters", arg);

export const GetFilters = async (arg1, arg2, arg3) => {
  console.log("ar=>", arg1, arg2);
  await axios.post(process.env.REACT_APP_API + "/search/getFilters", {
    category: arg1,
    theme: arg2,
  });
};

export const DownloadmodsByID = async (id) => {
  return await axios.get(process.env.REACT_APP_API + "/mods/download/" + id);
};

// สำหรับ DashBoard---------------------------------------------
export const getModsGroupByMonth = async () => {
  return await axios.get(
    process.env.REACT_APP_API + "/mods/getModGroupBy/Month"
  );
};

export const getSumDownload = async () => {
  return await axios.get(process.env.REACT_APP_API + "/mods/getSumDownload");
};

export const getAllModsOrderID = async () => {
  return await axios.get(process.env.REACT_APP_API + "/mods/getAllModsOrderID");
};

export const getAllModsOrderDate = async () => {
  return await axios.get(
    process.env.REACT_APP_API + "/mods/getAllModsOrderDate"
  );
};

export const getAllModsOrderDownload = async () => {
  return await axios.get(
    process.env.REACT_APP_API + "/mods/getAllModsOrderDownload"
  );
};
