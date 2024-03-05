const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectToDB } = require("./connectToDB");
const AuthRoutes = require("./routes/AuthRoutes");
const ListRoutes = require("./routes/ListRoutes");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();
dotenv.config();
connectToDB();
const { initializePassport } = require("./controllers/PassportSetupController");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
initializePassport();

app.use(cors(corsOptions));
app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8001;
app.use("/api/users", AuthRoutes);
app.use("/api/tasks", ListRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
