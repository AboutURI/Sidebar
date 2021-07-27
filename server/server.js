const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const path = require('path');
const db = require('../database/database.js');
const cors = require('cors');
const axios = require('axios');
require('newrelic');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const url = 'http://admin:password@localhost:5984/sidebar/';

app.get('/price', (req, res) => {
  // console.log("GET request received at /price.");
  // console.log(req.headers);
  // console.log(req.query.courseId)
  axios.get(url + req.query.courseId)
  .then((results) => {
    // console.log(results.data)
    res.send(results.data)
  })
  // db.getPrice(req.query, (err, docs) => {
  //   if (err) {
  //     res.send(err);
  //   } else if (docs[0] === undefined) {
  //     res.status(404).send("Database does not contain requested record.");
  //   } else {
  //     res.send(docs[0]);
  //   }
  // });
});

app.get('/previewVideo', (req, res) => {
  // console.log("GET request received at /previewVideo.");
  axios.get(url + req.query.courseId)
  .then((results) => {
    res.send(results.data)
  })
  // db.getPreviewVideo(req.query, (err, docs) => {
  //   if (err) {
  //     res.send(err);
  //   } else if (docs[0] === undefined) {
  //     res.status(404).send("Database does not contain requested record.");
  //   } else {
  //     res.send(docs[0]);
  //   }
  // });
});

app.get('/sidebar', (req, res) => {
  // console.log("GET request received at /sidebar.");
  axios.get(url + req.query.courseId)
  .then((results) => {
    res.send(results.data)
  })
  // db.getSidebar(req.query, (err, docs) => {
  //   if (err) {
  //     res.send(err);
  //   } else if (docs[0] === undefined) {
  //     res.status(404).send("Database does not contain requested record.");
  //   } else {
  //     res.send(docs[0]);
  //   }
  // });
});

app.get('/loaderio-dfd4de73482460e7d1de704392555bc9.txt', (req, res) => {
  res.sendFile('/Users/michaelgallien/HackReactor/SDC/Sidebar/loaderio-dfd4de73482460e7d1de704392555bc9.txt');
})

app.use('/course', (req, res) => {
  res.sendFile('index.html', {root: 'client'});
});

module.exports = app;