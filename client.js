var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();
var port = process.env.PORT || 3000;
var url = "http://localhost:"+port+"/calculate";

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var calculatorState = JSON.parse(this.responseText);
        displayCalculatorState(calculatorState);
    }
};
xhr.open("POST", url, true);
var calculatorState = { calculatorState: null, input: 1 };
var message = JSON.stringify(calculatorState);
console.log("Sending : ",message);
xhr.send(message);

function displayCalculatorState(calculatorState) {
    console.log(calculatorState);
    console.log(calculatorState.display);
}