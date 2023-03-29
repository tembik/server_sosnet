const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
// const FileUpload = require("express-fileupload");

const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const komenRoute = require("./routes/komenRoute");

app.use(express.json());
// app.use(FileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/images", express.static("./images"));
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/komen", komenRoute);

app.get("/", (req, res) => {
  res.send("index page");
});

app.listen(port, () => console.log("server berjalan di port 4000"));
