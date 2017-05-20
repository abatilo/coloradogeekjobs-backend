const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express();
let dbHandle = null;

// Let Heroku decide the port number to use
const PORT = process.env.PORT || 8080;
app.set('port', PORT);

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/jobs', (req, res) => {
  pool.query('SELECT * FROM jobs', (err, result) => {
    res.send(result);
  });
});

app.listen(app.get('port'), () => {
  // console.log('Listening on ' + app.get('port'));
});

MongoClient.connect(MONGODB_URI, async (err, db) => {
  console.log('Connected successfully to the database');
  dbHandle = db;
});
