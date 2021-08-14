const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const path = require('path');
// const db = require('../database/database.js');
const cors = require('cors');
const axios = require('axios');
const redis = require('redis');
require('newrelic');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const ec2eul = 'http://admin:password@ec2-54-215-193-90.us-west-1.compute.amazonaws.com:5984/sidebar/'
// const url = 'http://admin:password@localhost:5984/sidebar/';
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

function cache(req, res, next) {
  const id = req.query.courseId;

  client.get(id, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
}

app.get('/price', cache, (req, res) => {
  // console.log("GET request received at /price.");
  axios.get(ec2eul + req.query.courseId)
  .then((results) => {
    client.setnx(results.data.courseId.toString(), JSON.stringify(results.data), function(err, reply) {
      if (err) {
        console.log(err)
      } else {
        console.log(reply)
      }
    });
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

app.get('/previewVideo', cache, (req, res) => {
  // console.log("GET request received at /previewVideo.");
  axios.get(ec2eul + req.query.courseId)
  .then((results) => {
    client.setnx(results.data.courseId.toString(), JSON.stringify(results.data), function(err, reply) {
      if (err) {
        console.log(err)
      } else {
        console.log(reply)
      }
    });
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

app.get('/sidebar', cache, (req, res) => {
  // console.log("GET request received at /sidebar.");
  axios.get(ec2eul + req.query.courseId)
  .then((results) => {
    client.setnx(results.data.courseId.toString(), JSON.stringify(results.data), function(err, reply) {
      if (err) {
        console.log(err)
      } else {
        console.log(reply)
      }
    });
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

// app.get('/loaderio-dfd4de73482460e7d1de704392555bc9.txt', (req, res) => {
//   res.sendFile('/Users/michaelgallien/HackReactor/SDC/Sidebar/loaderio-dfd4de73482460e7d1de704392555bc9.txt');
// })

app.use('/course', (req, res) => {
  res.sendFile('index.html', {root: 'client'});
});

module.exports = app;