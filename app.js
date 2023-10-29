const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/index");

const connectDb = require("./src/db/index");

const config = require("dotenv").config();

connectDb();

app.use(express.json());
app.use(cors());

app.use("/chatspace/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in starting Server");
  }
  console.log(`Server is running on ${PORT}`);
});
