function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}
module.exports = {
    calculateNextState: 
    function calculateNextState(calculatorState, input, numberArr=[], operatorArr=[], startNextNumber = false, justFinishedSeq = false, depth = 0){
    
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
                justFinishedSeq = true;
            }

            return JSON.stringify({ "prevCalculatorState": calculatorState, "display": Number(input), "numberArr":numberArr, "operatorArr":operatorArr, "startNextNumber":startNextNumber , "justFinishedSeq":justFinishedSeq });
        }

        calculatorState = JSON.parse(calculatorState);
        console.log("~PARSED calculatorState:",calculatorState);
        var suffix = input;
            
        if (depth==0){
            numberArr = calculatorState.numberArr;
            operatorArr = calculatorState.operatorArr;
            startNextNumber = calculatorState.startNextNumber;
            justFinishedSeq = calculatorState.justFinishedSeq;
        }

        depth = depth + 1;

        if (justFinishedSeq){
            justFinishedSeq = false;
            if (isNormalInteger(input)){
                console.log("Starting new sequence");
                return calculateNextState(null, input, numberArr, operatorArr, false, justFinishedSeq, depth);
            }
            else if (input=="+"||input=="-"||input=="*"){
                console.log("Continueing previous sequence");
            } else if (input == "="){
                console.log("Redisplay");
            }
        }

        if (startNextNumber){
            console.log("Starting next number checking number comes after operator");
            if (isNormalInteger(input)){
                return calculateNextState(null, input, numberArr, operatorArr, false, justFinishedSeq, depth);
            }
            else{
                throw "Expecting a digit after operation";
            }
        } else{
            console.log("Continueing previous number concatenation");
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
                calculatorState.display + suffix, numberArr, operatorArr, startNextNumber, justFinishedSeq, depth);
        }
        else{
            return calculateNextState(null, calculatorState.display + suffix, numberArr, operatorArr, startNextNumber, justFinishedSeq,depth);
        }
    }

}