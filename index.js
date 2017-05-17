const express = require('express');
const path = require('path');
const pg = require('pg');
const url = require('url');

const app = express();

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};
const pool = new pg.Pool(config);

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
  console.log("Listening on " + app.get('port'));
});
