

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var models = require('./api/models/message');

var routes = require('./api/routes/routes');

var port = process.env.PORT || 3001;
var app = express();
var Message = mongoose.model('Message')


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/discussion');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


routes(app);

app.listen(port);

console.log('Server running on port ' + port);
