function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

function calculateNextState(calculatorState, input, numberArr=[], operatorArr=[], startNextNumber = false, depth = 0){
    
    console.log("~IN calculateNextState:", calculatorState, "input:", input, "depth:", depth);
    
    if (calculatorState == null){
        if (numberArr.length==0 && operatorArr.length==1){
            numberArr.push(Number(input))
            startNextNumber = true;
        }
        else if (numberArr.length==1 && operatorArr.length==2){
            input = Number(input) + numberArr.pop();
            numberArr=[];
            operatorArr=[];
        }

        return JSON.stringify({ "prevCalculatorState": calculatorState, "display": input, "numberArr":numberArr, "operatorArr":operatorArr, "startNextNumber":startNextNumber });
    }

    calculatorState = JSON.parse(calculatorState);
    console.log("~PARSED calculatorState:",calculatorState);
    var suffix = input;
        
    if (depth==0){
        numberArr = calculatorState.numberArr;
        operatorArr = calculatorState.operatorArr;
        startNextNumber = calculatorState.startNextNumber;
    }

    depth = depth + 1;

    if (startNextNumber){
        console.log("Starting next number checking number comes after operator");
        if (isNormalInteger(input)){
            return JSON.stringify({ "prevCalculatorState": null, "display": input, "numberArr":numberArr, "operatorArr":operatorArr, "startNextNumber":false });
        }
        else{
            throw "Expectin digit after operation";
        }
    } else{
        console.log("Continueing preveous number");
    }
        

    if (input=="="){
        if (numberArr.length==1 && operatorArr.length==1){
            operatorArr.push(input);
            suffix="";
        }
        else{
            throw "Invalid operation sequence";
        }
    }
    else if (input=="+"||input=="-"||input=="*"){
        operatorArr.push(input);
        suffix="";
    }

    // next call
    if (calculatorState.prevCalculatorState!=null){
        return calculateNextState(JSON.stringify(calculatorState.prevCalculatorState), 
            calculatorState.display + suffix, numberArr, operatorArr, startNextNumber, depth);
    }
    else{
        return calculateNextState(null, calculatorState.display + suffix, numberArr, operatorArr, startNextNumber, depth);
    }
}

let s = null
s = calculateNextState(s, "1")
console.log("\n~OUT s:",s,"\n");
console.log(JSON.parse(s).display) // 1
s = calculateNextState(s, "2")
console.log("\n~OUT s:",s,"\n");
console.log(JSON.parse(s).display) // 12
s = calculateNextState(s, "+")
console.log("\n~OUT s:",s,"\n");
console.log(JSON.parse(s).display) // 12
s = calculateNextState(s, "4")
console.log("\n~OUT s:",s,"\n");
console.log(JSON.parse(s).display) // 4
s = calculateNextState(s, "3")
console.log("\n~OUT s:",s,"\n");
console.log(JSON.parse(s).display) // 43
s = calculateNextState(s, "=")
console.log(JSON.parse(s).display) // 55
// s = calculateNextState(s, "+")
// console.log(JSON.parse(s).display) // 55
// s = calculateNextState(s, "1")
// console.log(JSON.parse(s).display) // 1
// s = calculateNextState(s, "=")
// console.log(JSON.parse(s).display) // 56
// s = calculateNextState(s, "5")
// console.log(JSON.parse(s).display) // 5
