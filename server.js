const express = require("express");
const app = express();
const expresslayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layouts");
app.use(expresslayouts);
app.use(express.static("public"));

require("dotenv").config({ path: ".env" });

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("connected to database");
});
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
