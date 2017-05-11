var express = require('express');
var cors = require('cors');

var utils = require('./utils');

var app = express();


// your manifest must have appropriate CORS headers, you could also use '*'
app.use(cors({ origin: '*' }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


/* 
    Server Code 
    ------ ----
    
    All of the code above this line is responsible for hosting
    our Power-Up. The code below is used to represent our fake
    service. In a real-world scenario, you will likely want to 
    have these seperated and your server code should probably
    do something a little more exciting then ours does 😁
*/

// Our Fake Auth Endpoint
app.get("/auth", function (request, response) {
  // We'll always pretend like the credentials sent in the reques
  // are valid.
  response.send({
    userId: "784",
    token: utils.fakeUuid(),
  });
});

app.get("/datas", function (request, response) {
  // Check to make sure that we've received a valid access token.
  
  // Also check to make sure there is a valid campaign.

  // Give them back some datas
  response.send({
    uptime: "Find and count some sheep",
    clickRate: "Climb a really tall mountain",
    industryAverage: "Wash the dishes",
  });
});

// Simple in-memory store for now

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
