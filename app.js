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
    countOperations: 0,
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
    memory.countOperations = 0;
    memory.isTypingChange = false;
    memory.nextOperation = false;
    memory.isTypingSecondValue = false;
}

function nextNumber() { //adicionado
    memory.countOperations++;
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
function execComposedOperation(teste){//adicionado 
    if(teste){
        const result = executeOperation();
        memory.operations = [memory.operations[2]];
        memory.firstValue = [result];
        memory.secondValue = [];
    }else{
        const result = executeOperation();
        memory.firstValue = result;
        memory.secondValue = [];
        memory.operations[0] = memory.operations[1];
        memory.operations.pop([1]);
        memory.nextOperation = false;
    }
}
function isComposedOperation(teste,value){
    if(teste){
        return memory.countOperations > 1 && value != "=" && memory.nextOperation
    }else{
        return memory.countOperations > 0 && memory.operations[1] != "=" && memory.secondValue > 0
    }
}
function execEqual(){
    memory.result = executeOperation();
    updateVisor(memory.result, true);
    memory.countOperations++;
    memory.nextOperation = true;
}


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
            execComposedOperation(true);
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
