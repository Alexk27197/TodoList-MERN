const express = require("express");
const dotenv = require("dotenv");
const { connectToDB } = require("./connectToDB");
const app = express();
dotenv.config();
connectToDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
