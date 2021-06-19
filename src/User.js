class User {
    inputHandler(value) {
        if (helper.isOperation(value)) {
            saveOperation(value);
            // define isTypingSecondValue
            if (memory.firstValue.length > 0) {
                nextNumber();
            }
            //Operação simples
            if (helper.isSimpleOperation(value, memory.isTypingSecondValue)) {
                calculator.execSimpleEqual();
            }

            if (helper.isComposedOperation()) {
                calculator.execComposedOperation();
            }

            if (helper.isComposedOperation(true, value)) {
                calculator.setAfterEqualValue(); // adicionado para facilitar o entendimento do código
                calculator.execComposedOperation();
            }
            if (helper.isChangeValue(value, memory.isTypingChange)) {
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
