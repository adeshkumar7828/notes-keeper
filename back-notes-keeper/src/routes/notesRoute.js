const express = require("express");
const {
  handleGetAllNotes,
  handleCreateNewNotes,
  handleDeleteNote,
  handleUpdateNote,
} = require("../controllers/notesController");

const router = express.Router();

router.get("/", handleGetAllNotes);
router.post("/", handleCreateNewNotes);
router.patch("/:_id", handleUpdateNote);
router.delete("/:_id", handleDeleteNote);

module.exports = router;
