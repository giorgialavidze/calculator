class Calculator {
    constructor(config){
        this.firstNumberElement = config.firstNumberElement;
        this.operatorElement = config.operatorElement;
        this.secondNumberElement = config.secondNumberElement;
        this.summaryElement = config.summaryElement;
        
        this.firstNumber = "";
        this.operands = ["+","-","*","/","=","AC","DEL"];
    }

    saveFirstNumber(number){
        if (this.operands.includes(number)) return;
        this.firstNumber += number;
        this.drawNumber(this.firstNumberElement,this.firstNumber) ; 
    }
    
    drawNumber(element,number){
        element.innerHTML = number;

    }
    drawOperand(){

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
        calculator.saveFirstNumber(value);
        
    });
});

const calculator = new Calculator(config);

