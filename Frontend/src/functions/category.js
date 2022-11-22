import axios from "axios";

//Category
export const listCategory = async () => {
  return await axios.get(process.env.REACT_APP_API + "/category");
};

//รองเท้า
export const listShoes = async () => {
  return await axios.get(process.env.REACT_APP_API + "/category/shoes");
};

//บ้าน
export const listHouse = async () => {
  return await axios.get(process.env.REACT_APP_API + "/category/house");
};

//ทรงผม
export const listHairstyle = async () => {
  return await axios.get(process.env.REACT_APP_API + "/category/hairstyle");
};

//เฟอร์นิเจอร์
export const listFurniture = async () => {
  return await axios.get(process.env.REACT_APP_API + "/category/furniture");
};

//เสื้อผ้า
export const listClothes = async () => {
  return await axios.get(process.env.REACT_APP_API + "/category/clothes");
};

// ตัวละคร
export const listCharacter = async () => {
  return await axios.get(process.env.REACT_APP_API + "/category/character");
};

// เครื่องประดับ
export const listAccessories = async () => {
  return await axios.get(process.env.REACT_APP_API + "/category/accessories");
};
