
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var assert = require('assert');


function calculateNextState(calculatorState, input){
    console.log("~IN calculateNextState: ", calculatorState, input);
    if (calculatorState == null){
        console.log("~OUT calculateNextState");
        return { prevCalculatorState: calculatorState, display: input}
    }
    
    console.log("~OUT calculateNextState");
    return calculateNextState(calculatorState.prevCalculatorState, 
        calculatorState.display + input);
}


// POST /calculate
app.post('/calculate', function (req, res) {
    console.log("~IN /calculate body:", req.body);

    var calculatorState = req.body.calculatorState;
    var input = req.body.input;

    console.log("~OUT /calculate");
    res.send(calculateNextState(calculatorState,input));
});

// Listen to port
app.listen(port, function () {
    console.log('listening on port',port);
});

