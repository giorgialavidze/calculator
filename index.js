class Calculator {
    constructor(config){
        this.firstNumberElement = config.firstNumberElement;
        this.operatorElement = config.operatorElement;
        this.secondNumberElement = config.secondNumberElement;
        this.summaryElement = config.summaryElement;
        
        this.stage = "getFirstNumber";
        this.operator = "";
        this.firstNumber = "";
        this.operands = ["+","-","*","/","=","AC","DEL"];
    }
    
    PressKey(key){
        if (this.operands.includes(key)) return this.pressOperator(key);
        this.pressNumber(key);
        
    }

    pressNumber(number){
        if (this.stage === "getFirstNumber") {
            this.compileFirstNumber(number);
        }
        console.log(number);
    }

    pressOperator(operator){
        if (this.stage === "getFirstNumber") {
            this.stage = "getSecondNumber";
            this.operator = operator;
            this.drawOperand(this.operatorElement,this.operator);
        }
        console.log(operator);

    }

    //save input first number by user and show it on the screen
    compileFirstNumber(number){
        // input symbol is operator or not
        

        this.firstNumber += number;
        this.drawNumber(this.firstNumberElement,this.firstNumber) ; 
    }
    
    drawNumber(element,number){
        element.innerHTML = number;
    }
    drawOperand(element,operator){
        element.innerHTML = operator;
    }
}

const config = {
    firstNumberElement : document.getElementById("screen_number_first"),
    operatorElement : document.getElementById("screen_operator"),
    secondNumberElement : document.getElementById("screen_number_second"),
    summaryElement : document.getElementById("screen_summary"),
}

const keyboard = document.querySelectorAll(".key");
//add events for all keys
keyboard.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.innerHTML;
        calculator.PressKey(value);     
    });
});

const calculator = new Calculator(config);

