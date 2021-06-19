class InputHandler {
    constructor(memory) {
        if (typeof memory === "undefined") {
            throw Error("InputHandler needs a memory object");
        }
        this.helper = new OperationHelper();
        this.memory = memory;
        this.calculator = new Calculator(this.memory);
    }

    handle(value) {
        if (this.helper.isOperation(value)) {
            app.saveOperation(value);
            // define isTypingSecondValue
            if (this.memory.firstValue.length > 0) {
                app.nextNumber();
            }
            //Operação simples
            if (
                this.helper.isSimpleOperation(
                    value,
                    this.memory.isTypingSecondValue
                )
            ) {
                this.calculator.execSimpleEqual();
            }

            if (this.helper.isComposedOperation()) {
                this.calculator.execComposedOperation();
            }

            if (this.helper.isComposedOperation(true, value)) {
                this.calculator.setAfterEqualValue(); // adicionado para facilitar o entendimento do código
                this.calculator.execComposedOperation();
            }
            if (this.helper.isChangeValue(value, this.memory.isTypingChange)) {
                this.calculator.changeValue();
            }
            if (value === "ac") {
                this.calculator.cleanMemory();
            }
        } else {
            // app is global
            app.addNumber(value);
        }
    }
}
