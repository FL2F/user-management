import axios from "axios";

// const API_URL = "http://localhost:8080/api/members/";
const API_URL =
  "https://user-management-backend-3yvuhaorjq-uc.a.run.app/api/members/";

// GET all Members for a specific group
const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(API_URL, config);
  return data;
};

// GET all Members for a specific group
const getMembers = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(API_URL + id, config);
  return data;
};

// GET pass
const getPass = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`${API_URL}pass/${id}`, config);
  return data;
};

const createMember = async (memberData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(API_URL, memberData, config);

  return data;
};

//Edit Member
const editMember = async (memberID, memberData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(API_URL + memberID, memberData, config);
  return data;
};

//Update Roles
const updateRole = async (groupID, updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(
    `${API_URL}role/${groupID}`,
    updateData,
    config
  );
  return data;
};

//Update Facilitator
const updateFacilitator = async (groupID, updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(
    `${API_URL}facilitator/${groupID}`,
    updateData,
    config
  );
  return data;
};

//Update Password
const updatePass = async (id, updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(`${API_URL}pass/${id}`, updateData, config);
  return data;
};

//Delete Member
const deleteMember = async (memberID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(API_URL + memberID, config);
  return data;
};

const memberService = {
  getAll,
  getMembers,
  createMember,
  editMember,
  updateRole,
  updateFacilitator,
  updatePass,
  deleteMember,
  getPass,
};

export default memberService;
