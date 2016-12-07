var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var trip = require('./routes/trip');
var privateData = require('./routes/private-data');
var mongoConnection = require('./modules/mongo-connection');

// Middleware on ALL requests
app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});
app.use(bodyParser.json());

mongoConnection.connect();

// Decodes the token in the request header and attaches the decoded token to the request.
app.use(decoder.token);

// Below here authenticated
// Route for privateData. The request gets here after it has been authenticated.
app.use("/privateData", privateData);

// Routing modules
// app.use("/trip", trip);

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('Now listening on http://localhost:' + port);
});
