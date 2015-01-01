
var express = require('express');
var http    = require('http');
var app     = express();

app.set('port', process.env.PORT || 3005);
app.use('/src', express.static(__dirname + '/src'));

app.get('/page-not-found', function (req, res) {
  res.sendFile('error.html', { root: __dirname + '/examples'});
});

app.get('/src', function (req, res) {
  res.redirect('/page-not-found');
});

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname + '/examples' });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express running on http://localhost:' + app.get('port'));
});
