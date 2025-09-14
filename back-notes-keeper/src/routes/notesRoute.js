const express = require("express");
const {
  handleGetAllNotes,
  handleCreateNewNotes,
} = require("../controllers/notesController");

const router = express.Router();

router.get("/", handleGetAllNotes);
router.post("/", handleCreateNewNotes);

module.exports = router;
