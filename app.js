// criei um arquivo
// importar no html

// isso é um objeto ou instância da classe Helper
const helper = new OperationHelper();
const calculator = new Calculator();

// analisando classes e as responsabilidades de cada uma

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

// pertence a calculadora
function updateVisor(value, reset) {
    const display = document.getElementById("visor");
    if (reset) {
        display.value = value;
    } else {
        display.value += value;
    }
}

// pertence a calculadora
function saveOperation(value) {
    memory.operations.push(value);
}

// pertence a calculadora
function cleanMemory() {
    memory.firstValue = [];
    memory.secondValue = [];
    memory.operations = [];
    memory.isTypingChange = false;
    memory.nextOperation = false;
    memory.isTypingSecondValue = false;
}
// pertence a calculadora
function nextNumber() {
    memory.isTypingSecondValue = true;
    memory.isTypingChange = true;
}

// pertence a calculadora
function changeValue() {
    memory.result *= -1; //memory.result = memory.result * -1
    memory.nextOperation = false;
    memory.secondValue = [];
    memory.operations = [];
    memory.firstValue = memory.result;
    updateVisor(memory.result, true);
}

// pertence a calculadora
function addNumber(value) {
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

// pertence a calculadora
function isComposedOperation(typeComposed, value) {
    if (typeComposed) {
        return typeComposedOperation(true, value);
    }
    return typeComposedOperation();
}

// percente a calcudora
function typeComposedOperation(isAfterEqualOperation, value) {
    if (isAfterEqualOperation) {
        return value != "=" && memory.nextOperation;
    }
    // todo: explicar coerção de tipo em memory.secodValue
    return memory.operations[1] != "=" && memory.secondValue > 0; //antes do igual
}

function execComposedOperation() {
    const result = executeOperation();
    memory.firstValue = result;
    memory.secondValue = [];
    memory.nextOperation = false;
    memory.operations = [memory.operations[1]];
}

function execSimpleEqual() {
    memory.result = executeOperation();
    updateVisor(memory.result, true);
    memory.nextOperation = true;
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
