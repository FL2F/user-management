import axios from "axios";

// const API_URL = "http://localhost:8080/api/groups/";
const API_URL =
  "https://user-management-backend-3yvuhaorjq-uc.a.run.app/api/groups/";

// GET all groups
const getAllGroups = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(API_URL, config);
  return data;
};

// GET all alumni groups
const getAllAlumniGroups = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(API_URL + "alumni", config);
  return data;
};

//Edit GroupRole
const editGroupRole = async (groupID, role, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(API_URL + groupID, role, config);
  return data;
};

//Delete Entire group
const deleteGroup = async (groupID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(API_URL + groupID, config);
  return data;
};

const memberService = {
  getAllGroups,
  getAllAlumniGroups,
  editGroupRole,
  deleteGroup,
};

export default memberService;
