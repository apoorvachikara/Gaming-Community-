
var express = require('express');
var app = express();  

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));

app.route('/api')
 .get(function(req, res) {
   res.send('Got a GET request for /api');
 })
 .post(function(req, res) {
   res.send('Got a POST request for /api');
 })
 .put(function(req, res) {
   res.send('Got a PUTrequest for /api');
 });

app.listen(8080); // start server

console.log('Listening on port 8080');
