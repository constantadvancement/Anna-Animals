const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.set("port", process.env.PORT || 3000);

// Connecting to SQL database
const db = mysql.createConnection({
  host: "localhost",
  database: "sys",
  user: "root",
  password: "Softball4ever2021!",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL workbench");
  }
});

// Get all animals
app.get("/animals", (req, res) => {
  let qrr = `SELECT * FROM animals`;
  db.query(qrr, (err, results) => {
    if (err) {
      console.log("Error fetching animals:", err);
    }
    if (results.length > 0) {
      res.send({
        message: "All animal data",
        data: results,
      });
    } else {
      res.send({
        message: "No animals found",
      });
    }
  });
});

// Get single animal by ID
app.get("/animals/:id", (req, res) => {
  let qrId = req.params.id;
  let qr = `SELECT * FROM animals WHERE id = ${qrId}`;
  db.query(qr, (err, results) => {
    if (err) {
      console.log("Error fetching animal by ID:", err);
    }
    if (results.length > 0) {
      res.send({
        message: "Animal data found",
        data: results,
      });
    } else {
      res.send({
        message: "Animal not found",
      });
    }
  });
});

// Create an animal
app.post('/create', (req, res) => {
  let name = req.body.name;
  let id = req.body.id;
  let description = req.body.description;
  let created_At = new Date().toISOString().slice(0, 19).replace('T', ' ');
  let updated_At = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let qr = `INSERT INTO animals(id, name, description, created_At, updated_At)
            VALUES ('${id}', '${name}', '${description}', '${created_At}', '${updated_At}')`;

  db.query(qr, (err, results) => {
    if (err) {
      console.log("Error creating animal:", err);
      res.status(500).send({
        message: "Error creating animal",
        error: err
      });
    } else {
      res.send({
        message: "Animal created successfully",
        data: results
      });
    }
  });
});

// Update an animal
app.put('/create/:id', (req, res) => {
  let id = req.params.id;
  let animal = req.body.name;
  let description = req.body.description;
  let updated_At = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let qr = `UPDATE animals SET name = '${animal}', description = '${description}', updated_At = '${updated_At}'
            WHERE id = '${id}'`;

  db.query(qr, (err, results) => {
    if (err) {
      console.log("Error updating animal:", err);
      res.status(500).send({
        message: "Error updating animal",
        error: err
      });
    } else {
      res.send({
        message: "Animal updated successfully",
        data: results
      });
    }
  });
});

// Delete an animal
app.delete('/animals/delete/:id', (req, res) => {
  let uId = req.params.id;
  let qr = `DELETE FROM animals WHERE id = ${uId}`;

  db.query(qr, (err, results) => {
    if (err) {
      console.log("Error deleting animal:", err);
      res.status(500).send({
        message: "Error deleting animal",
        error: err
      });
    } else {
      res.send({
        message: "Animal deleted successfully",
        data: results
      });
    }
  });
});

// Get single description by ID
app.get("/animals/descriptions/:id", (req, res) => {
  let qrId = req.params.id;
  let qr = `SELECT description FROM animals WHERE id = ${qrId}`;
  db.query(qr, (err, results) => {
    if (err) {
      console.log("Error fetching animal by ID:", err);
    }
    if (results.length > 0) {
      res.send({
        message: "Animal description found",
        data: results,
      });
    } else {
      res.send({
        message: "Animal description not found",
      });
    }
  });
});

app.listen(app.get("port"), () => {
  console.log(`Server is running at http://localhost:${app.get("port")}`);
});
