const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  isSelectedForEdit: {
    type: Boolean,
    default: false,
  },
});

const Notes = mongoose.model("notes", noteSchema);

module.exports = Notes;
