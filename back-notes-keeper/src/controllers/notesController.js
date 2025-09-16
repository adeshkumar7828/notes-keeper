const Notes = require("../models/notesModel.js");

async function handleGetAllNotes(req, res) {
  const getNotes = await Notes.find({});

  res.status(200).json(getNotes);
}

async function handleCreateNewNotes(req, res) {
  // console.log(req.body);
  const title = req.body.title;
  const desc = req.body.desc;

  const createdNote = await Notes.create({
    title,
    desc,
  });

  console.log(createdNote);
  res.status(201).json(createdNote);
}

async function handleDeleteNote(req, res) {
  const { _id } = req.params;

  await Notes.findByIdAndDelete(_id);

  res.status(204).send("Note Deleted");
}

module.exports = { handleGetAllNotes, handleCreateNewNotes, handleDeleteNote };
