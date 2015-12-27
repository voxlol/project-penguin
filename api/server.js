var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

var test = () => {
  console.log('test');
};

test();
test();

// Load Routes
// app.use(require('./controllers/routes'));

// Start the Dev Server
app.listen(3001, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:2000');
});