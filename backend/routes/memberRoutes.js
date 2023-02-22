const express = require("express");
const router = express.Router();

const {
  getAll,
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  getPass,
  updateRole,
  updateFacilitator,
  updatePass,
} = require("../controllers/membersController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createMember).get(protect, getAll);
router.route("/role/:id").put(protect, updateRole);
router.route("/facilitator/:id").put(protect, updateFacilitator);
router.route("/pass/:id").put(protect, updatePass);
router
  .route("/:id")
  .get(protect, getMembers)
  .put(protect, updateMember)
  .delete(protect, deleteMember);

router.route("/pass/:id").get(protect, getPass);

module.exports = router;
