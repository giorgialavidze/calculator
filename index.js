class Calculator {
    constructor(config){
        this.elements = {
            0 : config.firstNumberElement,
            1 : config.operatorElement,
            2 : config.secondNumberElement,
            3 : config.summaryElement,
        }
        this.state = 0;
        this.operator = "";
        this.numbers = {
            0 : "",
            2 : "",
        }
        this.operands = ["+","-","*","/","AC"];
        this.answer = "";
    }
    
    pressEqual(){
        if (this.isNotNumberPrepared(this.numbers[2])) return;
        this.calculation(Number(this.numbers[0]),Number(this.numbers[2]),this.operator);
        this.draw(this.elements[3],this.answer);
        this.state = 4;
    }

    
    backSpaceNumber(){
        if (this.numbers[this.state].length < 1) return;
        this.numbers[this.state] = this.numbers[this.state].substr(0,this.numbers[this.state].length - 1);
        this.draw(this.elements[this.state],this.numbers[this.state]);

    }

    PressKey(key){
        if (this.state === 4) return;
        if (key === "=")  {return this.pressEqual(),this.addVisualEffects();}
        if (key === "DEL")  {return this.backSpaceNumber()}
        if (this.operands.includes(key)) {return this.pressOperator(key),this.addVisualEffects();}

        this.pressNumber(key); 
        this.addVisualEffects();
    }

    pressNumber(number){
        this.compileNumber(number,this.state);
    }

    changeTextSize(element,size){
        element.style.fontSize = size + "px"; 
    }

    isNotNumberPrepared(number){
        return number === "" ? true : false;
    }

    addVisualEffects(){
        const smallSize = 14;
        const bigSize = 25;
        
      

       for (let i = 0; i < Object.keys(this.elements).length - 1; i++) {   
        if (this.elements[i + 1].innerHTML != "") {
            this.changeTextSize(this.elements[i],smallSize);
        }        
       }
    }

    pressOperator(operator){
       if (this.isNotNumberPrepared(this.numbers[this.state]))  return;
       this.operator = operator;
       this.draw(this.elements[1],operator);
       this.state = 2; 
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

    compileNumber(number,state){
        this.numbers[state] += number;
        this.draw(this.elements[state],this.numbers[state]) ; 
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


