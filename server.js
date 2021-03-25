const express = require("express");
const app = express();
const expresslayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layouts");
app.use(expresslayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
// require("dotenv");

const dotenv = require("dotenv");
dotenv.config();

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
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app;
app.listen(process.env.PORT || 3000);
