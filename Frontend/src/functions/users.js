import axios from "axios";

export const listUsers = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/users", {
    headers: {
      authtoken,
    },
  });
};

export const readUsers = async (id) => {
  return await axios.get(process.env.REACT_APP_API + "/users/" + id, {});
};

export const removeUsers = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/users/" + id, {
    headers: {
      authtoken,
    },
  });
};
//process.env.REACT_APP_API + "/auth/"
//"http://localhost:5000/api/auth/"
export const updateUsers = async (authtoken, id, values) => {
  return await axios.put(process.env.REACT_APP_API + "/auth/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const uploadImageUsers = async (authtoken, id, values) => {
  return await axios.put(
    process.env.REACT_APP_API + "/users/uploadavatar/" + id,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};
