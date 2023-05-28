function utc2unix(string) {
  return Date.parse(string);
}

function unix2utc(timestamp) {
  return new Date(new Number(timestamp)).toUTCString();
}

function isUnixTimestamp(timestamp) {
  const regex = /^\d{1,13}$/;

  return regex.test(timestamp);
}

function isUTCString(string) {
  const regex = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/;  // RegEx copied from here: https://stackoverflow.com/a/37563868/2012805

  return regex.test(string);
}

// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
  const date = new Date();

  res.json({ unix: utc2unix(date.toUTCString()), utc: date.toUTCString() });
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/*
  FIXME:

   - [ ] Your project can handle dates that can be successfully parsed by new Date(date_string)
*/
app.get("/api/:date", function (req, res) {
  const _date = req.params.date;

  const is_unix_timestamp = isUnixTimestamp(_date);
  const is_utc_string = isUTCString(_date);

  let date = { error: "Invalid Date" };

  if (is_unix_timestamp)
    date = { unix: new Number(_date), utc: unix2utc(_date) };

  if (is_utc_string)
    date = { unix: utc2unix(_date), utc: unix2utc(utc2unix(_date)) };

  res.json(date);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
