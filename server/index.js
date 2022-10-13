const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connectino Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("hii");
});

const server = app.listen(process.env.PORT, () => {
  console.log("server is listening on port:http://localhost:5000");
});
