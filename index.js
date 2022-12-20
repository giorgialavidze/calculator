class Calculator {
    constructor(config){
        this.elements = {
            firstNumber : config.firstNumberElement,
            secondNumber : config.secondNumberElement,
        }
        this.operatorElement = config.operatorElement;
        this.summaryElement = config.summaryElement;
        
        this.stage = "firstNumber";
        this.operator = "";
        this.numbers = {
            firstNumber : "",
            secondNumber : "",
        }
        this.operands = ["+","-","*","/","=","AC","DEL"];
        this.answer = "";
    }
    
    PressKey(key){
        if (this.operands.includes(key)) return this.pressOperator(key);
        this.pressNumber(key);
        
    }

    pressNumber(number){
        this.compileNumber(number,this.stage);
        if (this.stage === "secondNumber") {
            this.operatorElement.style.fontSize = "14px"; 
        }
    }

    pressOperator(operator){
        if (this.stage === "firstNumber" && this.numbers.firstNumber != "") {
            this.stage = "secondNumber";
            this.operator = operator;
            this.draw(this.operatorElement,this.operator);
            this.elements.firstNumber.style.fontSize = "14px"; 
            return;
        }
        if (this.stage === "secondNumber" && this.numbers.secondNumber != "" && operator === "=") {
            this.stage = "summary";
            this.calculation(Number(this.numbers.firstNumber),Number(this.numbers.secondNumber),this.operator);
            this.draw(this.summaryElement,this.answer);
            this.elements.secondNumber.style.fontSize = "14px"; 
            return;
        }
       
       

    }
    
    calculation(firstNumber,secondNumber,operator){
        switch (operator) {
            case "+":
                this.answer = firstNumber + secondNumber;
                break;
            case "*":
                this.answer = firstNumber * secondNumber;
                break;
            case "-":
                this.answer = firstNumber - secondNumber;
                break;
            case "/":
                this.answer = firstNumber / secondNumber;
                break;
        
            default:
                break;
        }
    }

    //save input first number by user and show it on the screen
    compileNumber(number,stage){
        // input symbol is operator or not
        

        this.numbers[stage] += number;
        this.draw(this.elements[stage],this.numbers[stage]) ; 
    }
    
    draw(element,number){
        element.innerHTML = number;
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

