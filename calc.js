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
                // poping =
                operator1 = operatorArr.pop();
                operator = "";
                if (operator1=="="){
                    operator = operatorArr.pop();
                }else{
                    operator = operatorArr.pop();
                    // repush operator2
                    operatorArr.push(operator1);
                }

                if (operator=="+"){
                    input = numberArr.pop() + Number(input);
                }else if (operator=="-"){
                    input = numberArr.pop() - Number(input);
                }else if (operator=="*"){
                    input = numberArr.pop() * Number(input);
                }

                if (operatorArr.length==1){
                    numberArr.push(input)
                }

                justFinishedSeq = true;                
                
            }
            var rv = JSON.stringify({ "prevCalculatorState": calculatorState, "display": Number(input), "numberArr":numberArr, "operatorArr":operatorArr, "startNextNumber":startNextNumber , "justFinishedSeq":justFinishedSeq });
            console.log("~OUT rv:",rv);
            return rv;
        }

        calculatorState = JSON.parse(calculatorState);
        console.log("Parsed calculatorState:",calculatorState);
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
            console.log("Continuing previous number");
        }
            

        if (input=="="){
            operatorArr.push(input);
            suffix="";            
        }
        else if (input=="+"||input=="-"||input=="*"){
            operatorArr.push(input);

            // two operations in a row without evaluation =
            if (numberArr.length==1 && operatorArr.length==1){
                // implicit evaluation
                console.log("Performing implicit operation");
                operator = operatorArr.pop();
                numberToPush = 0
                if (operator=="+"){
                    numberToPush = numberArr.pop() + Number(calculatorState.display);
                }else if (operator=="-"){
                    numberToPush = numberArr.pop() - Number(calculatorState.display);
                }else if (operator=="*"){
                    numberToPush = numberArr.pop() * Number(calculatorState.displayut);
                }
                calculatorState.display = "";
                numberArr.push(numberToPush);
            }else{
                
                suffix="";
            }
            
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