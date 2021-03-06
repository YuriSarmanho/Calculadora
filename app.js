// criei um arquivo
// importar no html

// isso é um objeto ou instância da classe Helper

class App {
    constructor() {
        //State
        this.memory = {
            result: 0,
            firstValue: [],
            secondValue: [],
            operations: [],
            isTypingSecondValue: false,
            isTypingChange: false,
            nextOperation: false,
        };
        this.inputHandler = new InputHandler(this.memory);
        this.helper = new OperationHelper();
    }

    updateVisor(value, reset) {
        // elemento DOM
        const display = document.getElementById("visor");
        if (reset) {
            display.value = value;
        } else {
            display.value += value;
        }
    }

    saveOperation(value) {
        this.memory.operations.push(value);
    }

    nextNumber() {
        this.memory.isTypingSecondValue = true;
        this.memory.isTypingChange = true;
    }

    addNumber(value) {
        this.updateVisor(value);
        if (this.memory.isTypingSecondValue) {
            if (this.memory.secondValue.length === 0) {
                this.updateVisor(value, true);
            }
            this.memory.secondValue += value;
        } else {
            this.memory.firstValue += value;
        }
    }

    typeComposedOperation(isAfterEqualOperation, value) {
        if (isAfterEqualOperation) {
            return value != '=' && this.memory.nextOperation;
        }
        return (
            this.memory.operations[1] !== '=' &&
            this.memory.secondValue.length > 0
        ); 
    }
    visorNotify() {
        this.updateVisor('', true);
        setTimeout(() => {
            if (this.memory.operations[1] != "=") {
                return app.updateVisor(this.memory.firstValue);
            }
                return app.updateVisor(this.memory.result)
        }, 100);
    }

    initKeyboardListener() {
        // event listener -> escuta eventos de teclado
        // reutização do código
        document.addEventListener(
            "keydown",
            function (event) {
                const value = event.key;
                this.inputHandler.handle(value);
            }.bind(this)
        );
    }
}
const app = new App();
app.initKeyboardListener();
