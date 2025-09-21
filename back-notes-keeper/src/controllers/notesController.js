const Notes = require("../models/notesModel.js");

async function handleGetAllNotes(req, res) {
  try {
    const getNotes = await Notes.find({});

    res.status(200).json(getNotes);
  } catch (err) {
    return res.status(500).json({ message: "Can not fulfill at this time." });
  }
}

async function handleCreateNewNotes(req, res) {
  // console.log(req.body);
  const title = req.body.title;
  const desc = req.body.desc;

  const createdNote = await Notes.create({
    title,
    desc,
  });

  // console.log(createdNote);
  res.status(201).json(createdNote);
}

async function handleUpdateNote(req, res) {
  const { _id } = req.params;
  const { title, desc } = req.body;

  // The `{ new: true }` option returns the modified document rather than the original. Before that old notes was being sent
  const updatedNote = await Notes.findByIdAndUpdate(
    _id,
    {
      title,
      desc,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedNote);
}

async function handleDeleteNote(req, res) {
  const { _id } = req.params;

  await Notes.findByIdAndDelete(_id);

  res.status(204).send("Note Deleted");
}

module.exports = {
  handleGetAllNotes,
  handleCreateNewNotes,
  handleDeleteNote,
  handleUpdateNote,
};
