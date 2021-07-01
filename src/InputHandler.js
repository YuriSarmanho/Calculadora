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
        // valor valido
        if (!this.isValid(value)) {
            return;
        }
        if (value === 'Enter') {
            value = '=';
        }

        if (this.helper.isOperation(value)) {
            // app.visorNotify();
            app.saveOperation(value);
            if (this.memory.firstValue.length > 0) {
                app.nextNumber();
            }

            if (this.helper.isSimpleOperation(value, this.memory.isTypingSecondValue)) {
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
            if (this.helper.isCleanMemory(value)) {
                this.calculator.cleanMemory();
            }
            app.visorNotify();
        } else {
            // app is global
            app.addNumber(value);
        }
    }

    isValid(value) {
        return this.helper.isNumber(value) || value === '.' || value === 'Enter' || this.helper.isOperation(value);
    }
}
