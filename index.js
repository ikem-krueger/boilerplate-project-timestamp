function date2unix(date) {
  return date.getTime();
}

function date2utc(date) {
  return date.toUTCString();
}

// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public/'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
  const date = new Date();

  res.json({ unix: date2unix(date), utc: date2utc(date) });
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", function (req, res) {
  let date;

  const dateFromString = new Date(req.params.date);
  const dateFromTimestamp = new Date(new Number(req.params.date));

  if (dateFromString != "Invalid Date")
    date = dateFromString;

  if (dateFromTimestamp != "Invalid Date")
    date = dateFromTimestamp;

  if (date) {
    res.json({ unix: date2unix(date), utc: date2utc(date) });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

require('dotenv').config();

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
