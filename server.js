
var calc = require('./calc');

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var assert = require('assert');

// POST /calculate
app.post('/calculate', function (req, res) {
    console.log("~IN /calculate");
    var calculatorState = req.body.calculatorState;
    var input = req.body.input;

    res.send(calc.calculateNextState(calculatorState,input));
});

// Listen to port
var server = app.listen(port, function () {
    console.log('listening on port',port);
});

module.exports.app = app;
module.exports.server = server;