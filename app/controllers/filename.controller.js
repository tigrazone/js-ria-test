const db = require("../models");
const Filename = db.filenames;
const Op = db.Sequelize.Op;

// Create and Save a new Filename
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fn) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Filename
  const filename = {
    fn: req.body.fn
  };

  // Save Filename in the database
  Filename.create(filename)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Filename."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  Filename.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving filenames."
      });
    });
};
