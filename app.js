// indentificar outros casos de refatoração pra função

let clickedValeus = [];

const operationStrings = ["+", "-", "X", "/", "ac", "+-", "%", "="];

//State
const memory = {
    result: 0,
    firstValue: [],
    secondValue: [],
    operations: [],
    isTypingSecondValue: false,
    isTypingChange: false,
    nextOperation: false,
};

// Regra de negócio
// funcionalidades
// soma, subtração, guardar um historico das operações

// responsabilidade
// função tem que ter uma única responsabilidade -> (ideal)

// um código já escrito -> melhorar = refatoração(refactor)

// refatora -> testa -> salva (commit)

//  ÚNICA RESPONSABILIDADE
function updateVisor(value, reset) {
    const display = document.getElementById("visor");
    if (reset) {
        display.value = value;
    } else {
        display.value += value;
    }
}

// retorna true or false
function isOperation(value) {
    return operationStrings.includes(value);
}

function isExecutingEqual(value) {
    return memory.isTypingSecondValue && value === "=";
}

function saveOperation(value) {
    memory.operations.push(value);
}

function cleanMemory() {
    memory.firstValue = [];
    memory.secondValue = [];
    memory.operations = [];
    //memory.countOperations = false;
    memory.isTypingChange = false;
    memory.nextOperation = false; 
    memory.isTypingSecondValue = false;
}

function nextNumber() { //adicionado
    //memory.countOperations = true;
    memory.isTypingSecondValue = true;
    memory.isTypingChange = true;
}
function changeValue(){//adicionado
    memory.result *= -1; //memory.result = memory.result * -1
    memory.nextOperation = false;
    memory.secondValue = [];
    memory.operations = [];
    memory.firstValue = memory.result;
}

function execComposedOperation(){
    const result = executeOperation();
    memory.firstValue = result;
    memory.secondValue = [];
    memory.nextOperation = false;
    memory.operations = [memory.operations[1]];  
}

function isComposedOperation(teste,value){
    if(teste){
        return value != "=" && memory.nextOperation//dps do igual true
    }else{//problema
        return memory.operations[1] != "=" && memory.secondValue > 0//antes do igual false
    }
}
function execEqual(){
    memory.result = executeOperation();
    updateVisor(memory.result, true);
    memory.nextOperation = true;
}
//n ta entrado na operação composta quando aperta um outro valor 

function inputHandler(value) {
    if (isOperation(value)) {
        saveOperation(value);
        // define isTypingSecondValue
        if (memory.firstValue.length > 0) {
            nextNumber();
        }
        //Operação simples
        if (isExecutingEqual(value)) {
           execEqual();
        }
        //Realizar operação composta
        if (isComposedOperation()) {
            execComposedOperation();  
        }
        //Operação composta apertando igual
         if (isComposedOperation(true,value)) {
            memory.operations[1] = memory.operations[2];
            execComposedOperation();
        }
        
        if (memory.isTypingChange && value === "+-") {
            changeValue();
            updateVisor(memory.result, true);
        }
        if (value === "ac") {
            updateVisor(null, true);
            cleanMemory();
        }
    } else {
        updateVisor(value);
        if (memory.isTypingSecondValue) {
            if (memory.secondValue.length === 0) {
                updateVisor(value, true);
            }
            memory.secondValue += value;
        } else {
            memory.firstValue += value;
        }
    }
}

function executeOperation() {
    const firstOperation = memory.operations[0];
    switch (firstOperation) {
        case "+":
            return Number(memory.firstValue) + Number(memory.secondValue);
        case "-":
            return Number(memory.firstValue) - Number(memory.secondValue);
        case "X":
            return Number(memory.firstValue) * Number(memory.secondValue);
        case "/":
            return Number(memory.firstValue) / Number(memory.secondValue);
        case "%":
            return (
                (Number(memory.firstValue) / 100) * Number(memory.secondValue)
            );
    }
}
