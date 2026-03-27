const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db");
const upload = require("./helpers/multer");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.post("/api/v1/upload", upload.single("image"), (req, res) => {
  const imageUrl = "http://localhost:3000/api/v1/uploads/" + req.file.filename;
  res.json({ url: imageUrl });
});

app.use("/api/v1/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;
connectDB();

app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/blog", require("./routes/article.route"));

app.listen(port, () => {
  console.log(`server is running on port: => http://localhost:${port}`);
});
