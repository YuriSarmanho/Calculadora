class InputHandler {
    constructor(memory) {
        if (typeof memory === "undefined") {
            throw Error("InputHandler needs a memory object");
        }
        this.memory = memory;
    }

    handle(value) {
        if (helper.isOperation(value)) {
            saveOperation(value);
            // define isTypingSecondValue
            if (this.memory.firstValue.length > 0) {
                nextNumber();
            }
            //Operação simples
            if (
                helper.isSimpleOperation(value, this.memory.isTypingSecondValue)
            ) {
                calculator.execSimpleEqual();
            }

            if (helper.isComposedOperation()) {
                calculator.execComposedOperation();
            }

            if (helper.isComposedOperation(true, value)) {
                calculator.setAfterEqualValue(); // adicionado para facilitar o entendimento do código
                calculator.execComposedOperation();
            }
            if (helper.isChangeValue(value, this.memory.isTypingChange)) {
                calculator.changeValue();
            }
            if (value === "ac") {
                calculator.cleanMemory();
            }
        } else {
            addNumber(value);
        }
    }
}
