var port = process.env.PORT || 3000;
var url = "http://localhost:"+port+"/calculate";

var request = require('request');

var options = {
  uri: url,
  method: 'POST',
  json: { "calculatorState": null, "input": 1 }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    displayCalculatorState(body) // Print the shortened url.
  }
});


function displayCalculatorState(calculatorState) {
    console.log(calculatorState.display);
}