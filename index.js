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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req,res) {
  console.log("empty")
  var unix = Math.floor(new Date().getTime())
  console.log(unix)
  var initialDate = new Date()
  var utc = initialDate.toUTCString()
  console.log(utc)
  var data = {
    unix: unix,
    utc: utc
  }
  res.json(data)
})

//project features start here
app.get("/api/:date", function(req,res) {
  const inputDate = req.params.date
  // if input is empty
  if (inputDate == "" || inputDate == NaN) {
    console.log(empty)

  } else {
    const isValidDate = new Date(inputDate)
    const isValidTimeStamp = /^[0-9]+$/.test(inputDate)
    // console.log("isValidDate?", isValidDate)
    // console.log("isValidTimeStamp?", isValidTimeStamp)

    // Input is invalid
    if (isValidDate == "Invalid Date" && !isValidTimeStamp) {
      res.send({error: "Invalid Date"})
    }

    // If input is a valid date
    if (isValidDate != "Invalid Date" && !isValidTimeStamp) {
      // console.log("input is a valid date")
      var unix = Math.floor(new Date(inputDate).getTime())
      console.log(unix)
      var initialDate = new Date(inputDate)
      var utc = initialDate.toUTCString()
      console.log(utc)
      var data = {
        unix: unix,
        utc: utc
      }
      res.json(data)
    }

    // If input is a valid timestamp
    if (isValidDate == "Invalid Date" && isValidTimeStamp) {
      // console.log("Input is timestamp")
      var unix = parseInt(inputDate)
      var initialDate = new Date(unix)
      var utc = initialDate.toUTCString()
      console.log(utc)
      var data = {
        unix: unix,
        utc: utc
      }
      res.json(data)
    }
  }
  



})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
