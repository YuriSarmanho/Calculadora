// criei um arquivo
// importar no html

// isso é um objeto ou instância da classe Helper

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

const helper = new OperationHelper();
const calculator = new Calculator(memory);
const inputHandler = new InputHandler(memory);

// escopo global
document.addEventListener("keydown", function (event) {
    // qual foi a tecla clicada?
    const value = event.key;
    // se ela for um número ou operação
    // todo: como identificar isso aqui???
    inputHandler.handle(value);
});

function updateVisor(value, reset) {
    // elemento DOM
    const display = document.getElementById("visor");
    if (reset) {
        display.value = value;
    } else {
        display.value += value;
    }
}

function saveOperation(value) {
    memory.operations.push(value);
}

function nextNumber() {
    memory.isTypingSecondValue = true;
    memory.isTypingChange = true;
}

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

function typeComposedOperation(isAfterEqualOperation, value) {
    if (isAfterEqualOperation) {
        return value != "=" && memory.nextOperation;
    }
    // todo: explicar coerção de tipo em memory.secodValue
    return memory.operations[1] != "=" && memory.secondValue > 0; //antes do igual
}
