const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coloradogeekjobs';
const app = express();
let dbHandle = null;

// Let Heroku decide the port number to use
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/jobs', async (req, res) => {
  const collection = dbHandle.collection('jobs');
  const results = await collection.find({}).toArray();

  // used for filtering by time
  // const d = new Date(new Date() - 5000); - only finds things younger than 5 seconds
  // const arr = await collection.find({ date: { $lt: d } }).toArray();
  res.send(results);
});

app.post('/post-job', async (req, res) => {
  const json = req.body;
  const requiredKeys = [ 
    'city'        ,
    'company'     ,
    'description' ,
    'email'       ,
    'how'         ,
    'remote'      ,
    'title'       ,
    'url'         ,
  ];

  if (!hasRequiredKeys(json, requiredKeys)) {
    let error = {
      error: 'Missing keys'
    };
    res.status(500).json(error);
    return;
  }
  const collection = dbHandle.collection('jobs');
  res.send(req.body);
});

app.listen(PORT);

MongoClient.connect(MONGODB_URI, async (err, db) => {
  console.log('Connected successfully to the database');
  dbHandle = db;
});

const hasRequiredKeys = (obj, requiredKeys) => {
  return requiredKeys.every(key => key in obj);
}
