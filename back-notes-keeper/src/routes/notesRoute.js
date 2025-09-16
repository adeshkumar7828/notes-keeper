const express = require("express");
const {
  handleGetAllNotes,
  handleCreateNewNotes,
  handleDeleteNote,
} = require("../controllers/notesController");

const router = express.Router();

router.get("/", handleGetAllNotes);
router.post("/", handleCreateNewNotes);
router.delete("/:_id", handleDeleteNote);

module.exports = router;
