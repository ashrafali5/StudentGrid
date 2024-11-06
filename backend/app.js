const mongoose = require("mongoose");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const userRout = require("./routes/user");
const courseRout = require("./routes/course");
const studentRout = require("./routes/student");
const feeRoute = require("./routes/fee");
mongoose
  .connect(
    "mongodb+srv://ashrafali83517:ashrafali555@cluster0.0u1e0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected with database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir: "/tmp/",
  })
);
app.use(cors());

app.use("/user", userRout);
app.use("/course", courseRout);
app.use("/student", studentRout);
app.use("/fee", feeRoute);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "bad request",
  });
});

module.exports = app;
