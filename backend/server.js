const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectToDB } = require("./connectToDB");
const AuthRoutes = require("./routes/AuthRoutes");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
connectToDB();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8001;
app.use("/api/users", AuthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
