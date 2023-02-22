const express = require("express");
const router = express.Router();

const {
  getAllGroups,
  deleteGroup,
  updateGroupRole,
} = require("../controllers/groupsController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllGroups);
router
  .route("/:groupID")
  .delete(protect, deleteGroup)
  .put(protect, updateGroupRole);

module.exports = router;
