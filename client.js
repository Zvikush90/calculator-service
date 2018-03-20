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
calculatorState = { calculatorState: null, input: 1 };
xhr.send("HI");
//xhr.send(calculatorState.toString());

function displayCalculatorState(calculatorState) {
    console.log(calculatorState);
    console.log(calculatorState.display);
}