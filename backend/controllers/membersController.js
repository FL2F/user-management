const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/usersDb");

const connection = connectDB();

//Description: Get All Memebers
//Route: GET /api/members
const getAll = (req, res) => {
  const getAllQuery = `
  SELECT id, username, title, role, group_id, email, linkedin, phonenumber, facilitator FROM Users.users_table`;

  connection.query(getAllQuery, (error, results) => {
    if (error) {
      console.log("Error selection from database: ", error);
      res.status(500).json({ error: "Error selection from database" });
      return;
    }
    res.status(200).json(results);
  });
};

//Description: Get All Memebers for specific group
//Route: GET /api/members/:id
const getMembers = (req, res) => {
  const getAllQuery = `
  SELECT id, username, title, role, group_id, email, linkedin, phonenumber, facilitator FROM Users.users_table WHERE group_id = ?`;
  const value = req.params.id;

  connection.query(getAllQuery, value, (error, results) => {
    if (error) {
      console.log("Error selection from database: ", error);
      res.status(500).json({ error: "Error selection from database" });
      return;
    }
    res.status(200).json(results);
  });
};

//Get Pass for specific user
//Route: GET /api/members/pass/:id
const getPass = (req, res) => {
  const getPassQuery = `
  SELECT password FROM Users.users_table WHERE id = ?`;
  const value = req.params.id;

  connection.query(getPassQuery, value, (error, results) => {
    if (error) {
      console.log("Error selection from database: ", error);
      res.status(500).json({ error: "Error selection from database" });
      return;
    }
    res.status(200).json(results);
  });
};

//Description: Create member
//Route: POST /api/members
const createMember = asyncHandler(async (req, res) => {
  const {
    id,
    username,
    password,
    title,
    group_id,
    role,
    email,
    funds,
    facilitator,
  } = req.body;

  if (
    !id ||
    !username ||
    !email ||
    !password ||
    !title ||
    !group_id ||
    !role ||
    !funds ||
    !facilitator
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const query = `SELECT username FROM Users.users_table WHERE username = ?`;
  const usernameValue = [username];
  connection.query(query, usernameValue, (err, results) => {
    if (err) {
      throw new Error(err);
    }
    if (results.length > 0) {
      res.status(400);
      throw new Error("User already exists");
    }
  });

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const insertQuery = `INSERT INTO Users.users_table (id, username, password, title, group_id, role, email, funds) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    id,
    username,
    hashedPassword,
    title,
    group_id,
    role,
    email,
    funds,
    facilitator,
  ];
  connection.query(insertQuery, values, (err, results) => {
    if (results.affectedRows > 0) {
      res.status(201).json("User Successfully Created");
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  });
});

//Description: Update Specific member
//Route: PUT /api/members/:id
const updateMember = asyncHandler(async (req, res) => {
  const updateQuery = `
  UPDATE Users.users_table
  SET username = ?, role = ?, title = ?, group_id = ?, email = ?, phonenumber = ?, linkedin = ?, facilitator = ?
  WHERE id = ?;
  `;

  const memberValues = [
    req.body.username,
    req.body.role,
    req.body.title,
    req.body.group_id,
    req.body.email,
    req.body.phonenumber,
    req.body.linkedin,
    req.body.facilitator,
    req.body.id,
  ];

  connection.query(updateQuery, memberValues, (error, results) => {
    if (error) {
      console.log("Error inserting into database: ", error);
      res.status(500).json({ error: "Error inserting into database" });
      return;
    }
    res.status(200).json(results);
  });
});

//Description: Update Specific member
//Route: PUT /api/members/pass/:id
const updatePass = asyncHandler(async (req, res) => {
  const updateQuery = `
  UPDATE Users.users_table
  SET password = ?
  WHERE id = ?;
  `;

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const memberValues = [hashedPassword, req.params.id];

  connection.query(updateQuery, memberValues, (error, results) => {
    if (error) {
      console.log("Error inserting into database: ", error);
      res.status(500).json({ error: "Error inserting into database" });
      return;
    }
    res.status(200).json(results);
  });
});

//Description: Update Specific member
//Route: PUT /api/members/role/:groupID
const updateRole = asyncHandler(async (req, res) => {
  const updateQuery = `
  UPDATE Users.users_table
  SET role = ?
  WHERE group_id = ?;
  `;

  console.log("role", req.body.role);
  console.log("groupID", req.params.id);

  const memberValues = [req.body.role, req.params.id];

  connection.query(updateQuery, memberValues, (error, results) => {
    if (error) {
      console.log("Error inserting into database: ", error);
      res.status(500).json({ error: "Error inserting into database" });
      return;
    }
    res.status(200).json(results);
  });
});

//Description: Update Facilitator For Group
//Route: PUT /api/members/facilitator/:groupID
const updateFacilitator = asyncHandler(async (req, res) => {
  const updateQuery = `
  UPDATE Users.users_table
  SET facilitator = ?
  WHERE group_id = ?;
  `;

  console.log("facilitator", req.body.facilitator);
  console.log("groupID", req.params.id);

  const memberValues = [req.body.facilitator, req.params.id];

  connection.query(updateQuery, memberValues, (error, results) => {
    if (error) {
      console.log("Error inserting into database: ", error);
      res.status(500).json({ error: "Error inserting into database" });
      return;
    }
    res.status(200).json(results);
  });
});

//Description: Delete Specific member
//Route: DELETE /api/members/:id
const deleteMember = (req, res) => {
  const deleteQuery = `
    DELETE FROM Users.users_table 
    WHERE id = ?`;

  const value = req.params.id;

  connection.query(deleteQuery, value, (error, results) => {
    if (error) {
      console.log("Error deleting from database: ", error);
      res.status(500).json({ error: "Error deleting from database" });
      return;
    }
    res.status(200).json(results);
  });
};

module.exports = {
  getAll,
  getMembers,
  createMember,
  updateMember,
  updateRole,
  updateFacilitator,
  updatePass,
  deleteMember,
  getPass,
};
