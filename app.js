const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

const apps = require("./playstore-data.js");

app.get("/apps", (req, res) => {
  const { genres = "", sort } = req.query;

  if (sort) {
    if (!["app", "rating"].includes(sort)) {
      return res.status(400).send("Sort must be one of the app or rating");
    }
  }

  let results = apps.filter(app =>
    app.genres.toLowerCase().includes(genres.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(results);
});

module.exports = app;
