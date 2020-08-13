module.exports = app => {
  const filenames = require("../controllers/filename.controller.js");

  var router = require("express").Router();

  // Create a new filenames
  router.post("/", filenames.create);

  // Retrieve all filenames
  router.get("/", filenames.findAll);

  app.use('/api/filename', router);
};
