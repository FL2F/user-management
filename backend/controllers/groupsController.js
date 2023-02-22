const asyncHandler = require("express-async-handler");
const mysql = require("mysql2");
const connectDB = require("../config/usersDb");

const connection = connectDB();

//Description: Get All Groups
//Route: GET /api/groups
const getAllGroups = (req, res) => {
  const getAllQuery = `
  SELECT group_id, role FROM Users.users_table`;

  connection.query(getAllQuery, (error, results) => {
    if (error) {
      console.log("Error selecting from Users database: ", error);
      res.status(500).json({ error: "Error selecting from database" });
      return;
    }
    let groups = [];
    results.forEach((result) => {
      if (!groups.some((group) => group.group_id === result.group_id)) {
        groups.push({ group_id: result.group_id, role: result.role });
      }
    });
    res.status(200).json(groups);
  });
};

//Description: Update entire group role
//Route: PUT /api/groups/:groupID
const updateGroupRole = (req, res) => {
  const updateQuery = `
  UPDATE Users.users_table
  SET role = ?
  WHERE group_id = ?;
  `;
  const memberValues = [req.body.role, req.params.groupID];

  connection.query(updateQuery, memberValues, (error, results) => {
    if (error) {
      console.log("Error inserting into database: ", error);
      res.status(500).json({ error: "Error inserting into database" });
      return;
    }
    res.status(200).json(results);
  });
};

//Description: Delete Specific member
//Route: DELETE /api/groups/:groupID
const deleteGroup = (req, res) => {
  const deleteQuery = `
    DELETE FROM Users.users_table 
    WHERE group_id = ?;  
  `;

  const value = req.params.groupID;

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
  getAllGroups,
  deleteGroup,
  updateGroupRole,
};
