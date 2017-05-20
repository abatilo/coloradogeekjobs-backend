const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coloradogeekjobs';
const app = express();
let dbHandle = null;

// Let Heroku decide the port number to use
const PORT = process.env.PORT || 8080;
app.set('port', PORT);

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/jobs', async (req, res) => {
  const collection = dbHandle.collection('jobs');
  const results = await collection.find({}).toArray();

  // used for filtering by time
  // const d = new Date(new Date() - 5000); - only finds things younger than 5 seconds
  // const arr = await collection.find({ date: { $lt: d } }).toArray();
  res.send(results);
});

app.listen(app.get('port'), () => {
  // console.log('Listening on ' + app.get('port'));
});

MongoClient.connect(MONGODB_URI, async (err, db) => {
  console.log('Connected successfully to the database');
  dbHandle = db;
});
