const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const notesRoute = require("./src/routes/notesRoute.js");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// cross-origin
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use("/api/notes", notesRoute);

app.listen(PORT, () => {
  console.log(`Server started as PORT: ${PORT}`);
});
