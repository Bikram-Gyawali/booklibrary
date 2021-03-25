const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//All aurthors route
router.get("/", (req, res) => {
  res.render("authors/index");
});

//New Aurthor Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//Create Aurthor Route
router.post("/", (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  author.save((err, newAuthor) => {
    if (err) {
      res.render("authors/new", {
        author: author,
        errorMessage: "Error creating author",
      });
    } else {
      res.redirect("authors");
    }
  });
});

module.exports = router;
